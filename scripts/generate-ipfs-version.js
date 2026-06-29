const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const { MANIFEST_PATH, createIpfsVersionManifest, serializeManifest } = require('./ipfs-version-manifest');

fs.writeFileSync(
  path.join(ROOT_DIR, MANIFEST_PATH),
  serializeManifest(createIpfsVersionManifest(ROOT_DIR))
);

console.log(`Wrote ${MANIFEST_PATH}`);
