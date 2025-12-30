import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { type NodeViewProps } from "@tiptap/react";
import { useMemo } from "react";
import "./code-block.css";

interface Language {
  label: string;
  value: string;
}

export function CodeBlockComponent(props: NodeViewProps) {
  const selectedLanguage = props.node.attrs.language;

  const languages = useMemo(() => {
    const supportedLanguages = props.extension.options.lowlight.listLanguages();
    return supportedLanguages
      .map((language: string) => ({
        label: language,
        value: language,
      }))
      .concat([{ label: "html", value: "xml" }])
      .sort((a: Language, b: Language) => a.label.localeCompare(b.label));
  }, [props.extension.options.lowlight]);

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const language = e.target.value === "null" ? null : e.target.value;
    props.updateAttributes({ language });
  }

  return (
    <NodeViewWrapper>
      <div className="code-block-container">
        <select
          className="language-selector h-7 rounded-[8px] border border-surface-gray-2 bg-surface-gray-2 py-1.5 pl-2 pr-2 text-base font-[420] leading-[1.15] tracking-[0.02em] text-ink-gray-8 transition-colors hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:border-outline-gray-4 focus:bg-surface-white focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3"
          contentEditable="false"
          value={selectedLanguage || "null"}
          onChange={handleLanguageChange}
        >
          <option value="null">auto</option>
          <option disabled>—</option>
          {languages.map((language: Language) => (
            <option key={language.value} value={language.value}>
              {language.label}
            </option>
          ))}
        </select>
        <pre>
          <code>
            <NodeViewContent />
          </code>
        </pre>
      </div>
    </NodeViewWrapper>
  );
}
