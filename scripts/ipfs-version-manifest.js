const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const MANIFEST_PATH = 'ipfs-version.json';
const GITHUB_REPOSITORY_URL = 'https://github.com/nicholelochner/lochner.tech_apparel';
const CONTENT_PATHS = [
  'index.html',
  'alfmir.ai.html',
  'lochner-apparel.html',
  '50x.html',
  'package.json',
  'server.js',
  'README.md',
  'scripts/build-ipfs.js',
  'scripts/generate-ipfs-version.js',
  'scripts/ipfs-version-manifest.js',
  'scripts/ipfs-verification-footer.js',
  'assets/fonts/LochnerBrandSans-Bold.ttf',
  'assets/fonts/LochnerBrandSans-Regular.ttf',
  'alfe_favicon_64x64.ico',
  'images/lochner/1.jpg',
  'images/lochner/2.webp',
  'images/alfmir/1.png',
  'images/alfmir/2.png',
  'images/alfmir/3.png',
  'images/alfmir/4.png',
  'images/alfmir/5.png',
  'images/alfmir/6.png',
];

function createIpfsVersionManifest(rootDir) {
  const gitRevision = resolveGitRevision(rootDir);
  const gitRevisionDirty = resolveGitRevisionDirty(rootDir);
  const files = CONTENT_PATHS.map((relativePath) => {
    const absolutePath = path.join(rootDir, relativePath);
    const data = fs.readFileSync(absolutePath);

    return {
      path: relativePath,
      bytes: data.length,
      sha256: crypto.createHash('sha256').update(data).digest('hex'),
    };
  });

  const contentHash = crypto.createHash('sha256');
  for (const file of files) {
    contentHash.update(`${file.path}\0${file.bytes}\0${file.sha256}\n`);
  }

  return {
    schemaVersion: 1,
    project: 'lochner.tech',
    verificationTarget: 'alfmir.ai frontend IPFS publication flow',
    source: 'https://lochner.tech',
    manifestPath: MANIFEST_PATH,
    gitRevision,
    gitRevisionDirty,
    gitRepositoryUrl: GITHUB_REPOSITORY_URL,
    gitCommitUrl: gitRevision ? `${GITHUB_REPOSITORY_URL}/commit/${gitRevision}` : null,
    gitTreeUrl: gitRevision ? `${GITHUB_REPOSITORY_URL}/tree/${gitRevision}` : null,
    contentSha256: contentHash.digest('hex'),
    files,
  };
}

function resolveGitRevision(rootDir) {
  if (process.env.LOCHNER_GIT_REVISION) {
    return process.env.LOCHNER_GIT_REVISION.trim();
  }

  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return null;
  }
}

function resolveGitRevisionDirty(rootDir) {
  if (process.env.LOCHNER_GIT_REVISION_DIRTY) {
    return process.env.LOCHNER_GIT_REVISION_DIRTY.trim() === 'true';
  }

  try {
    const status = execFileSync('git', ['status', '--short'], {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return status.length > 0;
  } catch {
    return null;
  }
}

function serializeManifest(manifest) {
  return `${JSON.stringify(manifest, null, 2)}\n`;
}

module.exports = {
  CONTENT_PATHS,
  GITHUB_REPOSITORY_URL,
  MANIFEST_PATH,
  createIpfsVersionManifest,
  serializeManifest,
};
