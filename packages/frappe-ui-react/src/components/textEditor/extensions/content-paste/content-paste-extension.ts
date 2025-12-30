/**
 * External dependencies.
 */
import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { DOMParser } from '@tiptap/pm/model'
import { EditorView } from '@tiptap/pm/view'

/**
 * Internal dependencies.
 */
import { detectMarkdown, markdownToHTML } from '../../../../utils/markdown'
import { processMultipleImages } from '../image'
import { UploadedFile } from '../../types'

export interface ContentPasteOptions {
  enabled: boolean
  uploadFunction: ((file: File) => Promise<UploadedFile>) | null
  [key: string]: unknown
}

export const ContentPasteExtension = Extension.create<ContentPasteOptions>({
  name: 'contentPaste',

  addOptions() {
    return {
      enabled: true,
      uploadFunction: null,
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('contentPaste'),
        props: {
          handleDOMEvents: {
            copy: (view, event) => {
              const selection = window.getSelection()
              if (!selection) return false

              const container = document.createElement('div')
              for (let i = 0; i < selection.rangeCount; i++) container.appendChild(selection.getRangeAt(i).cloneContents())

              // Update relative image srcs
              const images = container.querySelectorAll('img')
              images.forEach((img) => {
                const src = img.getAttribute('src')
                if (src && src.startsWith('/')) {
                  img.setAttribute('src', `${window.location.origin}${src}`)
                }
              })

              // Override clipboard HTML
              event.clipboardData?.setData('text/html', container.innerHTML)
              event.clipboardData?.setData('text/plain', selection.toString())
              event.preventDefault()
              return true
            },
          },
          handlePaste: (
            view: EditorView,
            event: ClipboardEvent,
          ) => {
            if (!this.options.enabled) return false

            // handle image pasting
            const files: File[] | [] = Array.from(
              event.clipboardData?.files || [],
            )
            const images = Array.from(files).filter((file) =>
              file.type.startsWith('image/'),
            )
            if (images.length > 0) {
              processMultipleImages(images, view, null, this.options)
              return true
            }

            // handle html with media
            const htmlData = event.clipboardData?.getData('text/html')
            if (htmlData) {
              processHTMLImages(htmlData, view, this.options)
              return true
            }

            // handle markdown pasting
            const text = event.clipboardData?.getData('text/plain')
            if (!text) return false

            if (!detectMarkdown(text)) return false

            const htmlContent = markdownToHTML(text)
            const tempDiv = document.createElement('div')
            tempDiv.innerHTML = htmlContent

            const parser = DOMParser.fromSchema(view.state.schema)
            const parsedSlice = parser.parseSlice(tempDiv, {
              preserveWhitespace: true,
            })

            const tr = view.state.tr.replaceSelection(parsedSlice)
            view.dispatch(tr)

            return true
          },
        },
      }),
    ]
  },
})

async function processHTMLImages(
  html: string,
  view: EditorView,
  extensionOptions: ContentPasteOptions,
): Promise<undefined> {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  const images = tempDiv.querySelectorAll('img')

  const parser = DOMParser.fromSchema(view.state.schema)
  const parsedSlice = parser.parseSlice(tempDiv, {
    preserveWhitespace: true,
  })
  const tr = view.state.tr.replaceSelection(parsedSlice)
  view.dispatch(tr)

  const imageInfo: Array<{ src: string; pos: number }> = []
  view.state.doc.descendants((node, pos) => {
    for (const img of images) {
      const src = img.getAttribute('src')
      if (node.type.name === 'image' && node.attrs['src'] === src) {
        imageInfo.push({ src: src || '', pos })
      }
    }
  })

  // Process each image
  const imagePromises = imageInfo.map(async ({ src, pos }) => {
    if (
      src.startsWith('data:') ||
      src.startsWith('blob:') 
    ) {
      try {
        const response = await fetch(src)
        const blob = await response.blob()
        const file = new File([blob], 'pasted-data-image.png', {
          type: blob.type,
        })
        processMultipleImages([file], view, pos, extensionOptions)
      } catch (error) {
        console.error('Failed to process image:', error)
      }
    }
  })

  await Promise.all(imagePromises)
}
