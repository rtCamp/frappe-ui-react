import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle:
      '<h1 id="fur-title">frappe-ui-react</h1> <span id="fur-version">(v1.0.0-beta.3)</span>', // update version as per package.json
    brandUrl: undefined, // disables link on the title
    brandImage: undefined,

      // Sidebar/Toolbar active state color
    barSelectedColor: 'rgb(153, 153, 153)', 
                                          
    // Primary accent color for buttons, links, focus states
    colorPrimary: 'rgb(153, 153, 153)',   
    colorSecondary: 'rgb(153, 153, 153)',
    fontBase: '"Inter", sans-serif',
  }),
  panelPosition: 'right', // Options: 'bottom' (default), 'right'
});
