import { useEffect } from "react";
import { useDarkMode } from "storybook-dark-mode";

const ModeDecorator = (Story) => {
  const mode = useDarkMode() ? "dark" : "light";

  useEffect(() => {
    document.body.className = `${mode} bg-surface-white min-h-screen`;
    const docsStory = document.querySelector(".docs-story");

    if (docsStory) {
      docsStory.className = `${mode} bg-surface-white`;
    }
  }, [mode]);

  return <Story />;
};

export default ModeDecorator;
