const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const MANIFEST_PATH = 'ipfs-version.json';
const GITHUB_REPOSITORY_URL = 'https://github.com/nicholelochner/lochner.tech_apparel';
const DOMAIN_NAME = 'lochner.tech';
const IPNS_ID = process.env.LOCHNER_IPNS_ID || process.env.LOCHNER_EXPECTED_IPNS_ID || 'k2k4r8jw4dtnalpkgklrqeflhsgderg6a8wn5lix7bww1yjemm0rx7ye';
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

  const contentSha256 = contentHash.digest('hex');

  return {
    schemaVersion: 1,
    project: DOMAIN_NAME,
    domainName: DOMAIN_NAME,
    ipnsId: IPNS_ID,
    source: 'https://lochner.tech',
    manifestPath: MANIFEST_PATH,
    gitRevision,
    gitRevisionDirty,
    gitRepositoryUrl: GITHUB_REPOSITORY_URL,
    gitCommitUrl: gitRevision ? `${GITHUB_REPOSITORY_URL}/commit/${gitRevision}` : null,
    gitTreeUrl: gitRevision ? `${GITHUB_REPOSITORY_URL}/tree/${gitRevision}` : null,
    contentSha256,
    previousContentSha256: resolvePreviousContentSha256(rootDir, contentSha256),
    files,
  };
}

function resolvePreviousContentSha256(rootDir, contentSha256) {
  const existingManifest = readExistingManifest(rootDir);
  const previousHashes = [];

  if (existingManifest) {
    if (Array.isArray(existingManifest.previousContentSha256)) {
      previousHashes.push(...existingManifest.previousContentSha256);
    }

    if (typeof existingManifest.contentSha256 === 'string') {
      previousHashes.push(existingManifest.contentSha256);
    }
  }

  return [...new Set(previousHashes)]
    .filter((hash) => isSha256(hash) && hash !== contentSha256);
}

function readExistingManifest(rootDir) {
  try {
    return JSON.parse(fs.readFileSync(path.join(rootDir, MANIFEST_PATH), 'utf8'));
  } catch {
    return null;
  }
}

function isSha256(value) {
  return typeof value === 'string' && /^[a-f0-9]{64}$/i.test(value);
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
  DOMAIN_NAME,
  GITHUB_REPOSITORY_URL,
  IPNS_ID,
  MANIFEST_PATH,
  createIpfsVersionManifest,
  resolvePreviousContentSha256,
  serializeManifest,
};
