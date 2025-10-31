const fs = require('fs');
const path = require('path');

function copyAssets() {
  const srcDir = 'src';
  const distDir = 'dist';

  function copyFile(src, dest) {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${src} -> ${dest}`);
  }

  function walkDir(dir) {
    if (!fs.existsSync(dir)) {
      console.log(`Source directory ${dir} does not exist`);
      return;
    }
    
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.css') || file.endsWith('.svg')) {
        const relativePath = path.relative(srcDir, filePath);
        const destPath = path.join(distDir, relativePath);
        copyFile(filePath, destPath);
      }
    });
  }

  console.log('Copying CSS and SVG assets...');
  walkDir(srcDir);
  console.log('Asset copying complete!');
}

copyAssets();