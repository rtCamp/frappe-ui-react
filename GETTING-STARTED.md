Frappe UI React is a modern component library designed for building frontend applications in React, specifically tailored for the [Frappe Framework](https://frappe.io/framework). It is inspired by the original [frappe-ui](https://github.com/frappe/frappe-ui), which is created in Vue, offering a similar components and aesthetic in React. However, we are not limited to a one-to-one port and also provide a growing collection of custom-built components to give developers more power and flexibility.

## Prerequisites

- Node.js v20
- TailwindCSS v4

## Usage

You can quickly setup frappe-ui-react using [frappe-ui-react-starter](https://github.com/rtCamp/frappe-ui-react-starter). If you already have a Frappe app for which you want to build a frontend you can start with Step 2.

## Step 0: Create frappe app.

```bash
bench new-app frappe-app
```

### Step 1: Installation

Install the package using npm.

```bash
cd apps/frappe-app

# Sets up a React project with frappe-ui-react in the frontend directory.
npx degit rtCamp/frappe-ui-react-starter frontend
```

### Step 2: Start dev server

```bash
cd frontend
nvm use # To insure you have correct node version.
pnpm install
pnpm dev
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