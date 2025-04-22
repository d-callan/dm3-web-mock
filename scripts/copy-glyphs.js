import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyGlyphs() {
  try {
    const sourceDir = path.join(__dirname, '../node_modules/hyphy-eye/dist/glyphs');
    const targetDir = path.join(__dirname, '../static/glyphs');

    // Create target directory if it doesn't exist
    await fs.mkdir(targetDir, { recursive: true });

    // Get all files in source directory
    const files = await fs.readdir(sourceDir);

    // Copy each file
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      // Only copy files (skip directories)
      const stats = await fs.stat(sourcePath);
      if (stats.isFile()) {
        await fs.copyFile(sourcePath, targetPath);
        console.log(`Copied ${file}`);
      }
    }

    console.log('Glyph files copied successfully!');
  } catch (error) {
    console.error('Error copying glyph files:', error);
    process.exit(1);
  }
}

await copyGlyphs();
