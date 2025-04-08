const fs = require('fs');
const path = require('path');

// Directory path for Android resources
const resDir = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

// List of mipmap directories
const mipmapDirs = [
  'mipmap-hdpi',
  'mipmap-mdpi',
  'mipmap-xhdpi',
  'mipmap-xxhdpi',
  'mipmap-xxxhdpi'
];

mipmapDirs.forEach((dir) => {
  const dirPath = path.join(resDir, dir);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      if (file.endsWith('.webp') && fs.existsSync(path.join(dirPath, file.replace('.webp', '.png')))) {
        console.log(`Removing duplicate resource: ${path.join(dirPath, file)}`);
        fs.unlinkSync(path.join(dirPath, file));
      }
    });
  }
});
