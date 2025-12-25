import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { type Editor } from "@tiptap/react";
import { Dialog } from "../../../dialog";
import { Button } from "../../../button";
import { Textarea } from "../../../textarea";
import {
  validateURL,
  processURL,
  detectPlatform,
  calculateAspectRatio,
  getOptimalDimensions,
  ALLOWED_DOMAINS,
} from "./utils";

interface InsertIframeProps {
  editor: Editor;
  children: (props: { onClick: () => void }) => React.ReactNode;
}

export function InsertIframe({ editor, children }: InsertIframeProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [embedUrl, setEmbedUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [title, setTitle] = useState("");
  const [alignment, setAlignment] = useState<"left" | "center" | "right">(
    "center"
  );
  const [customWidth, setCustomWidth] = useState<number>(640);
  const [customHeight, setCustomHeight] = useState<number>(360);

  const urlInputRef = useRef<HTMLTextAreaElement>(null);

  const isValidUrl = useMemo(() => {
    if (!embedUrl) return false;

    try {
      // Handle iframe embed code
      if (embedUrl.trim().startsWith("<iframe")) {
        const srcMatch = embedUrl.match(/src=["']([^"']+)["']/);
        if (srcMatch?.[1]) {
          return validateURL(srcMatch[1], {
            allowedDomains: ALLOWED_DOMAINS,
            HTMLAttributes: {},
          });
        }
        return false;
      }

      // Handle direct URLs
      return validateURL(embedUrl, {
        allowedDomains: ALLOWED_DOMAINS,
        HTMLAttributes: {},
      });
    } catch {
      return false;
    }
  }, [embedUrl]);

  const processedUrl = useMemo(() => {
    if (!embedUrl) return "";

    // Extract URL from iframe code if needed
    if (embedUrl.trim().startsWith("<iframe")) {
      const srcMatch = embedUrl.match(/src=["']([^"']+)["']/);
      if (srcMatch?.[1]) {
        return processURL(srcMatch[1]);
      }
      return embedUrl;
    }

    return processURL(embedUrl);
  }, [embedUrl]);

  const platformInfo = useMemo(() => {
    if (!embedUrl || !isValidUrl)
      return { platform: "Generic", aspectRatio: 9 / 16 };

    const platform = detectPlatform(processedUrl);
    const aspectInfo = calculateAspectRatio(processedUrl);

    return {
      platform: platform?.name || "Generic",
      aspectRatio: aspectInfo.ratio,
    };
  }, [embedUrl, isValidUrl, processedUrl]);

  const optimalDimensions = useMemo(() => {
    if (!embedUrl || !isValidUrl) return { width: 640, height: 360 };

    return getOptimalDimensions(processedUrl, 800); // Assume 800px editor width
  }, [embedUrl, isValidUrl, processedUrl]);

  // Update custom dimensions when URL changes
  useEffect(() => {
    if (embedUrl && isValidUrl) {
      const dimensions = optimalDimensions;
      setCustomWidth(dimensions.width);
      setCustomHeight(dimensions.height);
    }
  }, [embedUrl, isValidUrl, optimalDimensions]);

  const validateUrl = () => {
    setUrlError("");

    if (!embedUrl) return;

    if (!isValidUrl) {
      setUrlError("Please enter a supported URL or iframe embed code");
    }
  };

  const openIframeDialog = () => {
    setShowDialog(true);
    setEmbedUrl("");
    setUrlError("");
    setTitle("");
    setAlignment("center");

    // Set initial dimensions
    setCustomWidth(640);
    setCustomHeight(360);

    setTimeout(() => {
      urlInputRef.current?.focus();
    }, 100);
  };

  const insertIframe = () => {
    if (!embedUrl || !isValidUrl) return;

    const success = editor.commands.setIframe({
      src: processedUrl,
      width: customWidth,
      height: customHeight,
      title: title,
      align: alignment,
    });

    if (success) {
      setShowDialog(false);
      editor.commands.focus();
    } else {
      setUrlError(
        "Failed to insert embed. Please check the URL and try again."
      );
    }
  };

  const handleSlashCommandInsert = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.editor === editor) {
        openIframeDialog();
      }
    },
    [editor]
  );

  useEffect(() => {
    const editorDom = editor.view.dom;
    editorDom.addEventListener("iframe:open-dialog", handleSlashCommandInsert);

    return () => {
      editorDom.removeEventListener(
        "iframe:open-dialog",
        handleSlashCommandInsert
      );
    };
  }, [editor, handleSlashCommandInsert]);

  return (
    <>
      {children({ onClick: openIframeDialog })}

      {/* Iframe URL Input Dialog */}
      <Dialog
        open={showDialog}
        onOpenChange={setShowDialog}
        options={{ title: "Insert Embed", size: "md" }}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-gray-7 mb-2">
              URL or Embed Code
            </label>
            <Textarea
              ref={urlInputRef}
              value={embedUrl}
              onChange={(e) => {
                setEmbedUrl(e.target.value);
                validateUrl();
              }}
              placeholder="https://youtube.com/watch?v=... or <iframe src=...>"
            />
            {urlError && (
              <p className="text-red-500 text-sm mt-1">{urlError}</p>
            )}
            {!urlError && embedUrl && isValidUrl && (
              <p className="text-ink-green-3 text-sm mt-1">
                ✓ Valid {platformInfo.platform} URL
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="subtle" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="solid"
            disabled={!embedUrl || !isValidUrl}
            onClick={insertIframe}
          >
            Insert Embed
          </Button>
        </div>
      </Dialog>
    </>
  );
}
