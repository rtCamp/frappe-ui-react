Frappe UI React is a component library designed for building modern frontend applications in React for [Frappe Framework](https://frappe.io/framework). It is inspired by the original [frappe-ui](https://github.com/frappe/frappe-ui), which is created in Vue, offering a similar components and aesthetic in React. However, we are not limited to a one-to-one port and also provide a growing collection of custom-built components to give developers more power and flexibility.

## Prerequisites

- Node.js v20
- TailwindCSS v4

## Usage

You can setup frappe-ui-react in the following simple steps.

### Step 1:

Install the package.

```bash
npm install @rtcamp/frappe-ui-react
```

### Step 2:

<strong>Option-1 (recommended)</strong> If you already have tailwind configuration, you should import the tailwind configuration from `frappe-ui-react` and either use it as presets or extend the configuration.

```js
// tailwind.config.js in your project.
module.exports = {
  presets: [
    require('@rtcamp/frappe-ui-react/tailwind/preset')
  ],
  ...
}
```

<strong>Option-2:</strong> Import the theme css in your project. For example `index.css`

```js
@import @rtcamp/frappe-ui-react/theme.css
```

### Step 3:

You can now import components and use them in your project.

```js
import './index.css';
import { Button } from "@rtcamp/frappe-ui-react";


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

## Under the Hood

- [TailwindCSS](https://github.com/tailwindlabs/tailwindcss): Utility first CSS Framework to build design system based UI.
- [Headless UI](https://github.com/tailwindlabs/headlessui): Unstyled and accessible UI components.
- [Radix UI](https://github.com/radix-ui/themes): Unstyled and accessible UI components.
- [TipTap](https://github.com/ueberdosis/tiptap): ProseMirror based rich-text editor with a Vue API.
- [dayjs](https://github.com/iamkun/dayjs): Minimal javascript library for working with dates.

## Inspiration & Credit

This project, **Frappe UI React**, is heavily inspired by the original **[Frappe UI](https://github.com/frappe/frappe-ui)** project. Frappe UI is a fantastic Vue.js component library and our goal with Frappe UI React is to bring a similar aesthetic and component experience to the React ecosystem.