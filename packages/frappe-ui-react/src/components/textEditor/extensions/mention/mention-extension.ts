/**
 * External dependencies.
 */
import { ComponentType } from 'react'
import { Extension, Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { PluginKey } from '@tiptap/pm/state'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'

/**
 *  Internal dependencies.
 */
import {
  createSuggestionExtension,
  BaseSuggestionItem,
} from '../suggestion/createSuggestionExtension'
import { SuggestionList } from '../suggestion/suggestionList'
import './style.css'

export interface MentionSuggestionItem extends BaseSuggestionItem {
  id: string
  label: string
  value?: string
  email?: string
  full_name?: string
}

interface MentionAttributes {
  id: string | null;
  label: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createMentionNode(component?: ComponentType<any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config: any = {
    name: 'mention',
    group: 'inline',
    inline: true,
    selectable: true,
    atom: true,
    addOptions() {
      return {
        component: undefined,
      }
    },

    addAttributes() {
      return {
        id: {
          default: null,
          parseHTML: (element: HTMLElement) => element.getAttribute('data-id'),
          renderHTML: (attributes: MentionAttributes) => {
            if (!attributes.id) {
              return {}
            }
            return { 'data-id': attributes.id }
          },
        },
        label: {
          default: null,
          parseHTML: (element: HTMLElement) =>
            element.getAttribute('data-label'),
          renderHTML: (attributes: MentionAttributes) => {
            if (!attributes.label) {
              return {}
            }
            return { 'data-label': attributes.label }
          },
        },
      }
    },

    parseHTML() {
      return [
        {
          tag: 'span.mention[data-type="mention"]',
          getAttrs: (dom: HTMLElement | string) => {
            const element = dom as HTMLElement
            return {
              id: element.getAttribute('data-id'),
              label: element.getAttribute('data-label'),
            }
          },
        },
      ]
    },

    renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, unknown> }) {
      return [
        'span',
        mergeAttributes(HTMLAttributes, {
          class: 'mention',
          'data-type': 'mention',
        }),
        `@${HTMLAttributes['data-label'] || HTMLAttributes.id || ''}`,
      ]
    },
    renderText({ node }: { node: ProseMirrorNode }) {
      return `@${node.attrs.label || node.attrs.id || ''}`
    },
  }

  if (component) {
    config.addNodeView = () => {
      return ReactNodeViewRenderer(component)
    }
  }

  return Node.create(config)
}

const MentionSuggestionExtension =
  createSuggestionExtension<MentionSuggestionItem>({
    name: 'mentionSuggestion',
    char: '@',
    pluginKey: new PluginKey('mentionSuggestion'),
    component: SuggestionList,

    addOptions() {
      return {
        mentions: [],
      }
    },

    items: ({ query, editor }) => {
      const { mentions: _mentions } = editor.extensionManager.extensions.find(
        (ext) => ext.name === 'mentionSuggestion',
      )!.options
      const mentions = _mentions

      const filtered = mentions
        .filter((mention: MentionSuggestionItem) =>
          mention.label.toLowerCase().startsWith(query.toLowerCase()),
        )
        .slice(0, 10)
        .map((mention: MentionSuggestionItem) => ({
          ...mention,
          display: mention.label,
        }))

      return filtered
    },

    command: ({ editor, range, props }) => {
      const attributes = {
        id: props.id || props.value,
        label: props.label,
      }

      editor
        .chain()
        .focus()
        .insertContentAt(range, [
          {
            type: 'mention',
            attrs: attributes,
          },
        ])
        .run()
    },

    tippyOptions: {
      placement: 'bottom-start',
      offset: [0, 8],
    },
    allowSpaces: false,
    decorationTag: 'span',
    decorationClass: 'mention-suggestion-active',
  })

export const MentionExtension = Extension.create<{
  mentions: MentionSuggestionItem[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: ComponentType<any>
}>({
  name: 'mentionExtension',

  addOptions() {
    return {
      mentions: [],
      component: undefined,
    }
  },

  addExtensions() {
    return [
      createMentionNode(this.options.component),
      MentionSuggestionExtension.configure({
        mentions: this.options.mentions,
      }),
    ]
  },
})
