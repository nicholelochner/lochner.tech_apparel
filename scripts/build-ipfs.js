const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT_DIR, 'dist-ipfs');
const COPYRIGHT_YEAR = new Date().getFullYear();
const { MANIFEST_PATH, createIpfsVersionManifest, serializeManifest } = require('./ipfs-version-manifest');
const { createSharedFooterTemplate } = require('./ipfs-verification-footer');

const HTML_FILES = ['index.html', 'alfmir.ai.html', 'lochner-apparel.html', '50x.html'];
const STATIC_DIRS = ['assets', 'images'];
const STATIC_FILES = ['alfe_favicon_64x64.ico'];

const SHARED_HEADER_TEMPLATE = `
  <header class="site-header">
    <h1><a class="site-title-link" href="index.html">Lochner Technology</a></h1>
    <p>Lochner Technology builds developer software and AI-assisted workflow tools.</p>
    <div class="cta-buttons">
      <a class="cta-button" href="https://www.linkedin.com/in/nicholelochner/" target="_blank" rel="noopener" title="Open LinkedIn profile">
        LinkedIn
      </a>
      <a class="cta-button" href="https://github.com/nicholelochner" target="_blank" rel="noopener" title="Open GitHub profile">
        GitHub
        <span class="cta-button-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" focusable="false">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.49 7.49 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"></path>
          </svg>
        </span>
      </a>
      <a class="cta-button" href="https://bsky.app/profile/alfmir-ai.bsky.social" target="_blank" rel="noopener" title="Open Bluesky profile">
        Bluesky
      </a>
      <a class="cta-button" href="https://www.npmjs.com/~lochner-lw" target="_blank" rel="noopener" title="Open npm profile">
        NPM
      </a>
    </div>
  </header>
`;

const SHARED_FOOTER_TEMPLATE = createSharedFooterTemplate(COPYRIGHT_YEAR);

function main() {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const dir of STATIC_DIRS) {
    copyPath(path.join(ROOT_DIR, dir), path.join(OUTPUT_DIR, dir));
  }

  for (const file of STATIC_FILES) {
    copyPath(path.join(ROOT_DIR, file), path.join(OUTPUT_DIR, file));
  }

  const rootManifestPath = path.join(ROOT_DIR, MANIFEST_PATH);
  if (fs.existsSync(rootManifestPath)) {
    fs.copyFileSync(rootManifestPath, path.join(OUTPUT_DIR, MANIFEST_PATH));
  } else {
    fs.writeFileSync(
      path.join(OUTPUT_DIR, MANIFEST_PATH),
      serializeManifest(createIpfsVersionManifest(ROOT_DIR))
    );
  }

  for (const file of HTML_FILES) {
    const source = path.join(ROOT_DIR, file);
    const destination = path.join(OUTPUT_DIR, file);
    const html = fs.readFileSync(source, 'utf8');
    fs.writeFileSync(destination, prepareHtmlForIpfs(html));
  }

  fs.mkdirSync(path.join(OUTPUT_DIR, 'lochner-apparel'), { recursive: true });
  fs.copyFileSync(
    path.join(OUTPUT_DIR, 'lochner-apparel.html'),
    path.join(OUTPUT_DIR, 'lochner-apparel', 'index.html')
  );

  console.log(`IPFS-ready static site written to ${path.relative(ROOT_DIR, OUTPUT_DIR)}`);
}

function copyPath(source, destination) {
  fs.cpSync(source, destination, { recursive: true });
}

function prepareHtmlForIpfs(html) {
  return html
    .replace('<!-- SHARED_HEADER -->', SHARED_HEADER_TEMPLATE)
    .replace('<!-- SHARED_FOOTER -->', SHARED_FOOTER_TEMPLATE)
    .replaceAll('href="/alfe_favicon_64x64.ico"', 'href="alfe_favicon_64x64.ico"')
    .replaceAll('url("/assets/', 'url("assets/')
    .replaceAll("url('/assets/", "url('assets/")
    .replaceAll('url(/assets/', 'url(assets/');
}

main();
