const fs = require("fs-extra");
const path = require("path");

const sourceDirs = ["assets", "node_modules/@expo-google-fonts"];

const targetDir = "dist";

async function copyAssets() {
  try {
    // Create assets directory in dist if it doesn't exist
    await fs.ensureDir(path.join(targetDir, "assets"));

    // Copy each source directory
    for (const sourceDir of sourceDirs) {
      const sourcePath = path.join(process.cwd(), sourceDir);
      const targetPath = path.join(targetDir, "assets", sourceDir);

      if (fs.existsSync(sourcePath)) {
        await fs.copy(sourcePath, targetPath);
        console.log(`Copied ${sourceDir} to dist/assets`);
      }
    }

    console.log("Assets copied successfully!");
  } catch (err) {
    console.error("Error copying assets:", err);
    process.exit(1);
  }
}

copyAssets();
