const fs = require("fs");
const path = require("path");
const { transform } = require("@svgr/core");
const jsx = require("@svgr/plugin-jsx");

async function generateIcons() {
  const iconsDir = "src/icons";

  for (const folder of fs.readdirSync(iconsDir)) {
    const folderPath = path.join(iconsDir, folder);

    if (!fs.statSync(folderPath).isDirectory()) {
      continue;
    }

    const generatedDir = path.join(folderPath, "generated");
    fs.rmSync(generatedDir, { recursive: true, force: true });
    fs.mkdirSync(generatedDir);

    for (const file of fs.readdirSync(folderPath)) {
      if (!file.endsWith(".svg")) {
        continue;
      }

      const filePath = path.join(folderPath, file);
      const svg = fs.readFileSync(filePath, "utf8");
      const code = await transform(
        svg,
        { plugins: [jsx], typescript: true, jsxRuntime: "automatic" },
        { filePath }
      );

      fs.writeFileSync(
        path.join(generatedDir, file.replace(/\.svg$/, ".tsx")),
        code
      );
    }
  }

  console.log("Icon components generated!");
}

generateIcons();
