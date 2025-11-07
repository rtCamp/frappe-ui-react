Frappe UI React is a modern component library designed for building frontend applications in React, specifically tailored for the [Frappe Framework](https://frappe.io/framework). It is inspired by the original [frappe-ui](https://github.com/frappe/frappe-ui), which is created in Vue, offering a similar components and aesthetic in React. However, we are not limited to a one-to-one port and also provide a growing collection of custom-built components to give developers more power and flexibility.

## Prerequisites

- Node.js v20
- TailwindCSS v4

## Usage

You can set up frappe-ui-react in the following simple steps.

### Step 1: Installation

Install the package using npm.

```bash
npm install @rtcamp/frappe-ui-react
```

### Step 2: Configuration

**Option 1 (Tailwind v3 usage):** If you already have a Tailwind v3 configuration, import `theme-v3` css in your `index.css`, then use the `index.css` in your `index.tsx` then import the tailwind configuration from `frappe-ui-react` and use it as a preset or extend your existing configuration.

```css
/* index.css */
@import '@rtcamp/frappe-ui-react/theme-v3';
```

```js
// tailwind.config.js in your project
module.exports = {
  presets: [
    require('@rtcamp/frappe-ui-react/tailwind/preset')
  ],
  content: [
    path.resolve(__dirname, "../../node_modules/@rtcamp/frappe-ui-react/dist")
  ]
  // Additional configuration...
}
```

**Option 2 (Tailwind v4):** Import the theme CSS directly into your project (e.g., in `index.css`) and provide the source of the frappe-ui-react package so that it picks the styles automatically.

```css
@import '@rtcamp/frappe-ui-react/theme';
@source "../../node_modules/@rtcamp/frappe-ui-react/dist";
```

### Step 3: Import and Use Components

You can now import components and use them in your project.

```jsx
import './index.css';
import { Button } from "@rtcamp/frappe-ui-react";

function App() {
  return (
    <div className="app-container">
      <Button 
        label="Default Button"
        theme="gray"
        size="md"
        variant="subtle" 
      />
    </div>
  );
}

export default App;
```

## Under the Hood

This library is built on top of several excellent open-source projects:

- **[TailwindCSS](https://github.com/tailwindlabs/tailwindcss)**: Utility-first CSS framework for building design system-based UIs.
- **[Headless UI](https://github.com/tailwindlabs/headlessui)**: Unstyled and accessible UI components.
- **[Radix UI](https://github.com/radix-ui/themes)**: Low-level, unstyled, and accessible UI primitives.
- **[React Quill](https://github.com/zenoamaro/react-quill)**: Rich text editor component for React.
- **[dayjs](https://github.com/iamkun/dayjs)**: Lightweight JavaScript library for working with dates.

## Inspiration & Credits

This project, **Frappe UI React**, is heavily inspired by the original **[Frappe UI](https://github.com/frappe/frappe-ui)** project. Frappe UI is a fantastic Vue.js component library, and our goal with Frappe UI React is to bring a similar aesthetic and component experience to the React ecosystem.