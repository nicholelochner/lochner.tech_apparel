const GITHUB_REPOSITORY_URL = 'https://github.com/nicholelochner/lochner.tech_apparel';
const GITHUB_RAW_MANIFEST_URL = 'https://raw.githubusercontent.com/nicholelochner/lochner.tech_apparel/refs/heads/main/ipfs-version.json';
const MANIFEST_PATH = 'ipfs-version.json';
const TEST_DOMAIN = 'lochner.tech';
const IPNS_ID = 'k2k4r8jw4dtnalpkgklrqeflhsgderg6a8wn5lix7bww1yjemm0rx7ye';
const INBROWSER_IPNS_URL = `https://${IPNS_ID}.ipns.inbrowser.link/`;
const DWEB_IPNS_URL = `https://${IPNS_ID}.ipns.dweb.link/`;
const PUBLIC_GATEWAY_CHECKER_URL = 'https://ipfs.github.io/public-gateway-checker/';

function createSharedFooterTemplate(copyrightYear) {
  return `
  <footer class="site-footer site-footer-with-verification">
    <style>
      .site-footer-with-verification {
        text-align: center;
        color: #9aa4ba;
        padding: 0 1.5rem 2rem;
      }

      .site-footer-with-verification small {
        display: block;
      }

      .ipfs-footer-verification {
        max-width: 1100px;
        margin: 1rem auto 0;
        padding: 0.85rem 1rem;
        border: 1px solid rgba(56, 189, 248, 0.28);
        border-radius: 12px;
        background: linear-gradient(180deg, rgba(14, 165, 233, 0.1), rgba(255, 255, 255, 0.035));
        color: #dbeafe;
        text-align: left;
      }

      .ipfs-footer-verification-header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.6rem;
        justify-content: space-between;
      }

      .ipfs-footer-verification-title {
        margin: 0;
        color: #e0f2fe;
        font-size: 0.95rem;
        font-weight: 800;
      }

      .ipfs-footer-status {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.35rem 0.6rem;
        border-radius: 999px;
        background: rgba(148, 163, 184, 0.16);
        color: #e2e8f0;
        font-size: 0.85rem;
        font-weight: 700;
      }

      .ipfs-footer-status[data-state=verified] {
        background: rgba(34, 197, 94, 0.14);
        color: #bbf7d0;
      }

      .ipfs-footer-status[data-state=warning] {
        background: rgba(250, 204, 21, 0.14);
        color: #fef08a;
      }

      .ipfs-footer-status[data-state=error] {
        background: rgba(248, 113, 113, 0.14);
        color: #fecaca;
      }

      .ipfs-footer-status-dot {
        width: 0.55rem;
        height: 0.55rem;
        border-radius: 999px;
        background: currentColor;
        box-shadow: 0 0 16px currentColor;
      }

      .ipfs-footer-verification-details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
        gap: 0.65rem;
        margin-top: 0.75rem;
      }

      .ipfs-footer-verification-detail {
        min-width: 0;
      }

      .ipfs-footer-verification-detail strong {
        display: block;
        color: #bfdbfe;
        font-size: 0.75rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .ipfs-footer-verification-detail span,
      .ipfs-footer-verification-detail a {
        color: #e5e7eb;
        overflow-wrap: anywhere;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: 0.84rem;
      }

      .ipfs-footer-public-gateways {
        margin-top: 0.75rem;
        color: #cbd5e1;
        font-size: 0.86rem;
      }

      .ipfs-footer-public-gateways strong {
        color: #bfdbfe;
      }

      .ipfs-footer-public-gateways a {
        color: #bfdbfe;
        font-weight: 700;
      }

      .ipfs-footer-verification-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.55rem;
        margin-top: 0.75rem;
      }

      .ipfs-footer-verification-actions a,
      .ipfs-footer-verification-actions button {
        border: 1px solid rgba(147, 197, 253, 0.55);
        border-radius: 999px;
        background: rgba(37, 99, 235, 0.18);
        color: #bfdbfe;
        cursor: pointer;
        font: inherit;
        font-size: 0.85rem;
        font-weight: 700;
        padding: 0.42rem 0.7rem;
        text-decoration: none;
      }

      .ipfs-footer-verification-actions a:hover,
      .ipfs-footer-verification-actions button:hover {
        background: rgba(37, 99, 235, 0.28);
      }
    </style>
    <small>© ${copyrightYear} Lochner Technology · Minneapolis, MN</small>
    <section class="ipfs-footer-verification" aria-labelledby="ipfs-footer-verification-title">
      <div class="ipfs-footer-verification-header">
        <h2 id="ipfs-footer-verification-title" class="ipfs-footer-verification-title">IPFS/Git version verification</h2>
        <div id="ipfs-footer-status" class="ipfs-footer-status" data-state="loading" role="status" aria-live="polite">
          <span class="ipfs-footer-status-dot" aria-hidden="true"></span>
          <span id="ipfs-footer-status-message">Checking lochner.tech publication…</span>
        </div>
      </div>
      <div class="ipfs-footer-verification-details" aria-label="IPFS and Git version details">
        <div class="ipfs-footer-verification-detail">
          <strong>Git revision</strong>
          <span id="ipfs-footer-git-revision">pending</span>
        </div>
        <div class="ipfs-footer-verification-detail">
          <strong>Current hash</strong>
          <span id="ipfs-footer-origin-hash">pending</span>
        </div>
        <div class="ipfs-footer-verification-detail">
          <strong>IPFS hash</strong>
          <span id="ipfs-footer-gateway-hash">pending</span>
        </div>
        <div class="ipfs-footer-verification-detail">
          <strong>GitHub raw hash</strong>
          <span id="ipfs-footer-github-hash">pending</span>
        </div>
      </div>
      <div class="ipfs-footer-verification-actions">
        <button type="button" id="ipfs-footer-recheck-button">Recheck</button>
        <a id="ipfs-footer-git-link" href="${GITHUB_REPOSITORY_URL}" target="_blank" rel="noopener">Verify code on GitHub</a>
        <a id="ipfs-footer-gateway-link" href="https://ipfs.io/ipns/${TEST_DOMAIN}/" target="_blank" rel="noopener">Open IPFS gateway</a>
        <a id="ipfs-footer-manifest-link" href="/${MANIFEST_PATH}" target="_blank" rel="noopener">View manifest</a>
        <a id="ipfs-footer-github-manifest-link" href="${GITHUB_RAW_MANIFEST_URL}" target="_blank" rel="noopener">View GitHub raw manifest</a>
      </div>
      <div class="ipfs-footer-public-gateways">
        <strong>View site on public gateways:</strong>
        <a href="${INBROWSER_IPNS_URL}" target="_blank" rel="noopener">inbrowser.link</a> ·
        <a href="https://ipfs.io/ipns/${TEST_DOMAIN}/" target="_blank" rel="noopener">ipfs.io</a> ·
        <a href="${DWEB_IPNS_URL}" target="_blank" rel="noopener">dweb.link</a> ·
        <a href="${PUBLIC_GATEWAY_CHECKER_URL}" target="_blank" rel="noopener">gateway checker</a>
      </div>
    </section>
    <script>
      (function () {
        const TEST_DOMAIN = '${TEST_DOMAIN}';
        const MANIFEST_PATH = '${MANIFEST_PATH}';
        const CURRENT_MANIFEST_URL = resolveCurrentManifestUrl();
        const GITHUB_RAW_MANIFEST_URL = '${GITHUB_RAW_MANIFEST_URL}';
        const INBROWSER_IPNS_URL = '${INBROWSER_IPNS_URL}';
        const DWEB_IPNS_URL = '${DWEB_IPNS_URL}';
        const IPFS_GATEWAYS = [
          INBROWSER_IPNS_URL + MANIFEST_PATH,
          DWEB_IPNS_URL + MANIFEST_PATH,
          'https://ipfs.io/ipns/' + TEST_DOMAIN + '/' + MANIFEST_PATH
        ];

        const statusEl = document.getElementById('ipfs-footer-status');
        const statusMessageEl = document.getElementById('ipfs-footer-status-message');
        const gitRevisionEl = document.getElementById('ipfs-footer-git-revision');
        const originHashEl = document.getElementById('ipfs-footer-origin-hash');
        const gatewayHashEl = document.getElementById('ipfs-footer-gateway-hash');
        const githubHashEl = document.getElementById('ipfs-footer-github-hash');
        const recheckButton = document.getElementById('ipfs-footer-recheck-button');
        const gitLinkEl = document.getElementById('ipfs-footer-git-link');
        const gatewayLinkEl = document.getElementById('ipfs-footer-gateway-link');
        const manifestLinkEl = document.getElementById('ipfs-footer-manifest-link');

        function resolveCurrentManifestUrl() {
          const path = window.location.pathname;
          const ipnsPrefix = '/ipns/' + TEST_DOMAIN + '/';
          const ipfsMatch = path.match(/^(\/ipfs\/[^/]+\/)/);

          if (path === ipnsPrefix.slice(0, -1) || path.startsWith(ipnsPrefix)) {
            return window.location.origin + ipnsPrefix + MANIFEST_PATH;
          }

          if (ipfsMatch) {
            return window.location.origin + ipfsMatch[1] + MANIFEST_PATH;
          }

          return window.location.origin + '/' + MANIFEST_PATH;
        }

        function shortHash(hash) {
          return hash ? hash.slice(0, 16) + '…' + hash.slice(-12) : 'unavailable';
        }

        function shortRevision(revision) {
          return revision ? revision.slice(0, 12) + '…' : 'unavailable';
        }

        function setStatus(state, message) {
          statusEl.dataset.state = state;
          statusMessageEl.textContent = message;
        }

        function setGitRevision(manifest) {
          const dirtySuffix = manifest.gitRevisionDirty ? ' + uncommitted changes' : '';
          gitRevisionEl.textContent = shortRevision(manifest.gitRevision) + dirtySuffix;
          gitRevisionEl.title = manifest.gitRevision || '';
          if (manifest.gitCommitUrl) {
            gitRevisionEl.innerHTML = '';
            const link = document.createElement('a');
            link.href = manifest.gitCommitUrl;
            link.target = '_blank';
            link.rel = 'noopener';
            link.textContent = shortRevision(manifest.gitRevision) + dirtySuffix;
            link.title = manifest.gitRevision || '';
            gitRevisionEl.appendChild(link);
            gitLinkEl.href = manifest.gitCommitUrl;
          }
        }

        async function fetchJson(url) {
          const response = await fetch(url, { cache: 'no-store' });
          if (!response.ok) {
            throw new Error(response.status + ' ' + response.statusText);
          }
          return response.json();
        }

        async function fetchFirstGatewayManifest() {
          const errors = [];
          for (const gatewayUrl of IPFS_GATEWAYS) {
            try {
              const manifest = await fetchJson(gatewayUrl + '?verify=' + Date.now());
              return { gatewayUrl, manifest };
            } catch (error) {
              errors.push(gatewayUrl + ': ' + error.message);
            }
          }
          throw new Error(errors.join('; '));
        }

        async function runVerification() {
          setStatus('loading', 'Checking lochner.tech publication…');
          gitRevisionEl.textContent = 'pending';
          originHashEl.textContent = 'pending';
          gatewayHashEl.textContent = 'pending';
          githubHashEl.textContent = 'pending';
          recheckButton.disabled = true;

          try {
            const originManifest = await fetchJson(CURRENT_MANIFEST_URL + '?verify=' + Date.now());
            originHashEl.textContent = shortHash(originManifest.contentSha256);
            originHashEl.title = originManifest.contentSha256 || '';
            setGitRevision(originManifest);
            manifestLinkEl.href = CURRENT_MANIFEST_URL;

            const gatewayResult = await fetchFirstGatewayManifest();
            const gatewayManifest = gatewayResult.manifest;
            gatewayHashEl.textContent = shortHash(gatewayManifest.contentSha256);
            gatewayHashEl.title = gatewayManifest.contentSha256 || '';
            gatewayLinkEl.href = gatewayResult.gatewayUrl.replace('/' + MANIFEST_PATH, '/');

            const githubManifest = await fetchJson(GITHUB_RAW_MANIFEST_URL + '?verify=' + Date.now());
            githubHashEl.textContent = shortHash(githubManifest.contentSha256);
            githubHashEl.title = githubManifest.contentSha256 || '';

            const sameContent = originManifest.contentSha256 === gatewayManifest.contentSha256 &&
              originManifest.contentSha256 === githubManifest.contentSha256;
            const sameRevision = originManifest.gitRevision === gatewayManifest.gitRevision &&
              originManifest.gitRevision === githubManifest.gitRevision;

            if (originManifest.gitRevisionDirty || gatewayManifest.gitRevisionDirty || githubManifest.gitRevisionDirty) {
              setStatus('warning', 'Uncommitted changes reported; GitHub cannot fully verify this build.');
            } else if (sameContent && sameRevision) {
              setStatus('verified', 'Verified: current site, public IPFS gateways, and GitHub raw manifest match the same Git revision.');
            } else if (!sameRevision) {
              setStatus('warning', 'Mismatch: current site, public IPFS gateways, or GitHub raw manifest point at different Git revisions.');
            } else {
              setStatus('warning', 'Mismatch: current site, public IPFS gateways, or GitHub raw manifest have different content hashes.');
            }
          } catch (error) {
            setStatus('error', 'Unable to verify publication: ' + error.message);
          } finally {
            recheckButton.disabled = false;
          }
        }

        recheckButton.addEventListener('click', runVerification);
        runVerification();
      }());
    </script>
  </footer>
`;
}

module.exports = {
  createSharedFooterTemplate,
};
