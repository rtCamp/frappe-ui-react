# Frappe UI React

Frappe UI React is a component library designed for rapid UI development using React 19 and Tailwind 4. It is inspired by the original [frappe-ui](https://github.com/frappe/frappe-ui), offering a similar aesthetic for a consistent user experience. However, we are not limited to a one-to-one port and also provide a growing collection of custom-built components to give developers more power and flexibility.

## Under the Hood

- [TailwindCSS](https://github.com/tailwindlabs/tailwindcss): Utility first CSS Framework to build design system based UI.
- [Headless UI](https://github.com/tailwindlabs/headlessui): Unstyled and accessible UI components.
- [Radix UI](https://github.com/radix-ui/themes): Unstyled and accessible UI components.
- [TipTap](https://github.com/ueberdosis/tiptap): ProseMirror based rich-text editor with a Vue API.
- [dayjs](https://github.com/iamkun/dayjs): Minimal javascript library for working with dates.

## Links

- [Documentation](https://frappeui.com)
- [Community](https://github.com/rtCamp/frappe-ui-react/discussions)

## Prerequisites

- Node.js v20
- TailwindCSS v4

## Usage

```sh
npm install @frappe-components/frappe-ui-react
# or
yarn add @frappe-components/frappe-ui-react
```

Now, import the required components in your React app:

```js
import { Button } from "@frappe-components/frappe-ui-react";

function App() {
  return (
    <div className="app-container">
      <Button 
        label="Default Button"
        theme= "gray"
        size= "md"
        variant= "subtle" />
    </div>
  );
}

export default App;
```
