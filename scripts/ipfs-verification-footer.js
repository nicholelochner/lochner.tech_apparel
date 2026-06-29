const GITHUB_RAW_MANIFEST_URL = 'https://raw.githubusercontent.com/nicholelochner/lochner.tech_apparel/main/ipfs-version.json';
const GITHUB_MAIN_COMMIT_API_URL = 'https://api.github.com/repos/nicholelochner/lochner.tech_apparel/commits/main';
const MANIFEST_PATH = 'ipfs-version.json';
const DOMAIN_NAME = 'lochner.tech';
const IPNS_ID = 'k2k4r8jw4dtnalpkgklrqeflhsgderg6a8wn5lix7bww1yjemm0rx7ye';
const DWEB_IPNS_URL = `https://${IPNS_ID}.ipns.dweb.link/`;
const PUBLIC_GATEWAY_CHECKER_URL = 'https://ipfs.github.io/public-gateway-checker/';
const PUBLIC_IPFS_GATEWAYS = [
  { label: 'ipfs.io', siteUrl: `https://ipfs.io/ipns/${IPNS_ID}/` },
  { label: 'dweb.link', siteUrl: DWEB_IPNS_URL },
  { label: 'ipfs.filebase.io', siteUrl: `https://ipfs.filebase.io/ipns/${IPNS_ID}/` },
  { label: 'dget.top', siteUrl: `https://dget.top/ipns/${IPNS_ID}/` },
];

function createSharedFooterTemplate(copyrightYear) {
  const publicGatewayLinks = PUBLIC_IPFS_GATEWAYS
    .map((gateway) => `<a href="${gateway.siteUrl}" target="_blank" rel="noopener">${gateway.label}</a>`)
    .join(' ·\n        ');
  const publicGatewayManifestEntries = JSON.stringify(
    PUBLIC_IPFS_GATEWAYS.map((gateway) => ({
      label: gateway.label,
      siteUrl: gateway.siteUrl,
      manifestUrl: gateway.siteUrl + MANIFEST_PATH,
    }))
  );

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

      .ipfs-footer-verification:not([open]) {
        display: inline-block;
        width: auto;
        max-width: 100%;
        padding: 0.55rem 0.75rem;
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

      .ipfs-footer-verification-summary {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.6rem;
        justify-content: space-between;
        list-style: none;
        cursor: pointer;
      }

      .ipfs-footer-verification:not([open]) .ipfs-footer-verification-summary {
        flex-wrap: nowrap;
      }

      .ipfs-footer-verification-summary::-webkit-details-marker {
        display: none;
      }

      .ipfs-footer-verification-summary:focus-visible {
        border-radius: 10px;
        outline: 2px solid rgba(147, 197, 253, 0.75);
        outline-offset: 4px;
      }

      .ipfs-footer-summary-status {
        margin-left: auto;
        color: #e2e8f0;
        font-size: 0.9rem;
        font-weight: 900;
      }

      .ipfs-footer-summary-status[data-state=verified] {
        color: #22c55e;
      }

      .ipfs-footer-summary-status[data-state=warning],
      .ipfs-footer-summary-status[data-state=error] {
        color: orangered;
      }

      .ipfs-footer-verification[open] .ipfs-footer-summary-status {
        display: none;
      }

      .ipfs-footer-summary-info-icon {
        display: inline-grid;
        place-items: center;
        width: 1.25rem;
        height: 1.25rem;
        flex: 0 0 auto;
        border: 1px solid currentColor;
        border-radius: 999px;
        color: #bfdbfe;
        font-size: 0.78rem;
        font-weight: 900;
        line-height: 1;
      }

      .ipfs-footer-verification-heading {
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        min-width: min(100%, 18rem);
      }

      .ipfs-footer-verification:not([open]) .ipfs-footer-verification-heading {
        min-width: 0;
      }

      .ipfs-footer-verification:not([open]) .ipfs-footer-verification-title {
        white-space: nowrap;
      }

      .ipfs-footer-shield {
        position: relative;
        display: inline-grid;
        place-items: center;
        width: 2rem;
        height: 2rem;
        flex: 0 0 auto;
        color: #93c5fd;
        font-size: 1.7rem;
        line-height: 1;
        filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.42));
      }

      .ipfs-footer-verification:not([open]) .ipfs-footer-shield {
        width: 1.5rem;
        height: 1.5rem;
        font-size: 1.25rem;
      }

      .ipfs-footer-shield-mark {
        position: absolute;
        display: inline-grid;
        place-items: center;
        width: 1.08rem;
        height: 1.08rem;
        border-radius: 999px;
        color: #0f172a;
        font-size: 0.74rem;
        font-weight: 1000;
        line-height: 1;
        opacity: 0;
        transform: translateY(0.05rem);
      }

      .ipfs-footer-verification[data-state=loading] .ipfs-footer-shield-mark {
        border: 2px solid rgba(191, 219, 254, 0.35);
        border-top-color: #e0f2fe;
        opacity: 1;
        animation: ipfs-footer-shield-spin 0.8s linear infinite;
      }

      .ipfs-footer-verification[data-state=verified] .ipfs-footer-shield-mark {
        background: #22c55e;
        color: #052e16;
        opacity: 1;
      }

      .ipfs-footer-verification[data-state=warning] .ipfs-footer-shield-mark,
      .ipfs-footer-verification[data-state=error] .ipfs-footer-shield-mark {
        background: orangered;
        color: #fff7ed;
        opacity: 1;
      }

      .ipfs-footer-verification[data-state=loading] .ipfs-footer-shield-symbol,
      .ipfs-footer-verification[data-state=verified] .ipfs-footer-shield-symbol {
        color: #bfdbfe;
      }

      .ipfs-footer-verification[data-state=warning] .ipfs-footer-shield-symbol,
      .ipfs-footer-verification[data-state=error] .ipfs-footer-shield-symbol {
        color: #fdba74;
      }

      @keyframes ipfs-footer-shield-spin {
        to { transform: translateY(0.05rem) rotate(360deg); }
      }

      .ipfs-footer-verification[open] .ipfs-footer-verification-summary {
        padding-bottom: 0.75rem;
        border-bottom: 1px solid rgba(148, 163, 184, 0.18);
      }

      .ipfs-footer-verification:not([open]) .ipfs-footer-verification-content {
        display: none;
      }

      .ipfs-footer-verification-content {
        padding-top: 0.75rem;
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

      .ipfs-footer-verification-detail-with-info {
        position: relative;
        padding-right: 2.15rem;
      }

      .ipfs-footer-info-icon {
        position: absolute;
        top: 50%;
        right: 0.45rem;
        transform: translateY(-50%);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.35rem;
        height: 1.35rem;
        border: 1px solid currentColor;
        border-radius: 999px;
        color: #bfdbfe;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 0.82rem;
        font-weight: 900;
        line-height: 1;
      }

      .ipfs-footer-verification-detail[role=button] {
        border-radius: 8px;
        cursor: pointer;
        outline: none;
      }

      .ipfs-footer-verification-detail[role=button]:hover,
      .ipfs-footer-verification-detail[role=button]:focus-visible {
        background: rgba(37, 99, 235, 0.12);
        box-shadow: 0 0 0 2px rgba(147, 197, 253, 0.35);
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

      .ipfs-footer-verification-detail[data-state=passed] strong,
      .ipfs-footer-verification-detail[data-state=passed] span,
      .ipfs-footer-verification-detail[data-state=passed] a {
        color: #bbf7d0;
      }

      .ipfs-footer-explainer,
      .ipfs-footer-public-gateways {
        margin-top: 0.75rem;
        color: #cbd5e1;
        font-size: 0.86rem;
      }

      .ipfs-footer-explainer {
        color: #cbd5e1;
        font-size: 0.86rem;
        line-height: 1.45;
      }

      .ipfs-footer-explainer strong,
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

      .ipfs-footer-modal[hidden] {
        display: none;
      }

      .ipfs-footer-modal {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
      }

      .ipfs-footer-modal-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(2, 6, 23, 0.72);
      }

      .ipfs-footer-modal-dialog {
        position: relative;
        z-index: 1;
        width: min(920px, 100%);
        max-height: min(82vh, 720px);
        overflow: auto;
        border: 1px solid rgba(147, 197, 253, 0.45);
        border-radius: 16px;
        background: #07111f;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
        color: #dbeafe;
        padding: 1rem;
      }

      .ipfs-footer-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 0.8rem;
      }

      .ipfs-footer-modal-title {
        margin: 0;
        color: #e0f2fe;
        font-size: 1rem;
      }

      .ipfs-footer-modal-close {
        border: 1px solid rgba(147, 197, 253, 0.55);
        border-radius: 999px;
        background: rgba(37, 99, 235, 0.18);
        color: #bfdbfe;
        cursor: pointer;
        font: inherit;
        font-weight: 800;
        padding: 0.25rem 0.6rem;
      }

      .ipfs-footer-gateway-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.82rem;
      }

      .ipfs-footer-gateway-table th,
      .ipfs-footer-gateway-table td {
        border-top: 1px solid rgba(148, 163, 184, 0.24);
        padding: 0.55rem;
        text-align: left;
        vertical-align: top;
      }

      .ipfs-footer-gateway-table th {
        color: #bfdbfe;
        font-size: 0.72rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .ipfs-footer-gateway-table a {
        color: #bfdbfe;
        font-weight: 700;
      }

      .ipfs-footer-gateway-table code {
        color: #e5e7eb;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        overflow-wrap: anywhere;
      }
    </style>
    <small>© ${copyrightYear} Lochner Technology · Minneapolis, MN</small>
    <details id="ipfs-footer-verification" class="ipfs-footer-verification" data-state="loading">
      <summary id="ipfs-footer-verification-summary" class="ipfs-footer-verification-summary" aria-labelledby="ipfs-footer-verification-title" aria-controls="ipfs-footer-verification-content" aria-expanded="false">
        <span class="ipfs-footer-verification-heading">
          <span class="ipfs-footer-shield" aria-hidden="true">
            <span class="ipfs-footer-shield-symbol">🛡</span>
            <span id="ipfs-footer-shield-mark" class="ipfs-footer-shield-mark"></span>
          </span>
          <h2 id="ipfs-footer-verification-title" class="ipfs-footer-verification-title">IPFS/Git version verification</h2>
        </span>
        <span id="ipfs-footer-summary-status" class="ipfs-footer-summary-status" data-state="loading" aria-hidden="true">Checking</span>
        <span class="ipfs-footer-summary-info-icon" aria-hidden="true" title="Expand verification details">i</span>
      </summary>
      <div id="ipfs-footer-verification-content" class="ipfs-footer-verification-content" hidden>
      <span id="ipfs-footer-status" class="ipfs-footer-status" data-state="loading" role="status" aria-live="polite">
        <span class="ipfs-footer-status-dot" aria-hidden="true"></span>
        <span id="ipfs-footer-status-message">Checking ${DOMAIN_NAME} publication…</span>
      </span>
      <div class="ipfs-footer-verification-details" aria-label="IPFS and Git version details">
        <div class="ipfs-footer-verification-detail">
          <strong>Git revision</strong>
          <span id="ipfs-footer-git-revision">pending</span>
        </div>
        <div class="ipfs-footer-verification-detail">
          <strong>Current hash</strong>
          <span id="ipfs-footer-origin-hash">pending</span>
        </div>
        <div id="ipfs-footer-gateway-detail" class="ipfs-footer-verification-detail ipfs-footer-verification-detail-with-info" role="button" tabindex="0" aria-haspopup="dialog" aria-controls="ipfs-footer-gateway-modal" aria-describedby="ipfs-footer-gateway-info">
          <strong>Public gateway IPFS hash</strong>
          <span id="ipfs-footer-gateway-hash">pending</span>
          <span id="ipfs-footer-gateway-info" class="ipfs-footer-info-icon" aria-label="Open public gateway verification details">i</span>
        </div>
        <div id="ipfs-footer-github-detail" class="ipfs-footer-verification-detail">
          <strong>GitHub raw hash</strong>
          <span id="ipfs-footer-github-hash">pending</span>
        </div>
      </div>
      <p class="ipfs-footer-explainer">
        <strong>How this verifies:</strong> the footer JavaScript fetches this site's manifest, a public IPFS/IPNS gateway manifest, and the GitHub raw manifest, then compares their Git revisions and content hashes.
      </p>
      <noscript>
        <p class="ipfs-footer-explainer"><strong>JavaScript is required</strong> to run the automatic verification. Without JavaScript, these controls can only open the evidence files.</p>
      </noscript>
      <div class="ipfs-footer-verification-actions">
        <button type="button" id="ipfs-footer-recheck-button">Run verification</button>
        <a id="ipfs-footer-manifest-link" href="/${MANIFEST_PATH}" target="_blank" rel="noopener">Open this site manifest</a>
        <a id="ipfs-footer-github-manifest-link" href="${GITHUB_RAW_MANIFEST_URL}" target="_blank" rel="noopener">Open GitHub raw manifest</a>
      </div>
      <div class="ipfs-footer-public-gateways">
        <strong>View site on public gateways:</strong>
        ${publicGatewayLinks} ·
        <a href="${PUBLIC_GATEWAY_CHECKER_URL}" target="_blank" rel="noopener">gateway checker</a>
      </div>
      </div>
    </details>
    <div id="ipfs-footer-gateway-modal" class="ipfs-footer-modal" role="dialog" aria-modal="true" aria-labelledby="ipfs-footer-gateway-modal-title" hidden>
      <div class="ipfs-footer-modal-backdrop" data-ipfs-footer-modal-close></div>
      <div class="ipfs-footer-modal-dialog">
        <div class="ipfs-footer-modal-header">
          <h3 id="ipfs-footer-gateway-modal-title" class="ipfs-footer-modal-title">Public gateway verification states</h3>
          <button type="button" id="ipfs-footer-gateway-modal-close" class="ipfs-footer-modal-close" aria-label="Close public gateway verification states">Close</button>
        </div>
        <table class="ipfs-footer-gateway-table">
          <thead>
            <tr>
              <th scope="col">Gateway</th>
              <th scope="col">Verification state</th>
              <th scope="col">Git revision</th>
              <th scope="col">Content hash</th>
            </tr>
          </thead>
          <tbody id="ipfs-footer-gateway-modal-body">
            <tr><td colspan="4">Run verification to load gateway states.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <script>
      (function () {
        const IPNS_ID = '${IPNS_ID}';
        const MANIFEST_PATH = '${MANIFEST_PATH}';
        const CURRENT_MANIFEST_URL = resolveCurrentManifestUrl();
        const GITHUB_RAW_MANIFEST_URL = '${GITHUB_RAW_MANIFEST_URL}';
        const GITHUB_MAIN_COMMIT_API_URL = '${GITHUB_MAIN_COMMIT_API_URL}';
        const IPFS_GATEWAYS = ${publicGatewayManifestEntries};

        const verificationEl = document.getElementById('ipfs-footer-verification');
        const verificationSummaryEl = document.getElementById('ipfs-footer-verification-summary');
        const verificationContentEl = document.getElementById('ipfs-footer-verification-content');
        const summaryStatusEl = document.getElementById('ipfs-footer-summary-status');
        const statusEl = document.getElementById('ipfs-footer-status');
        const statusMessageEl = document.getElementById('ipfs-footer-status-message');
        const shieldMarkEl = document.getElementById('ipfs-footer-shield-mark');
        const gitRevisionEl = document.getElementById('ipfs-footer-git-revision');
        const originHashEl = document.getElementById('ipfs-footer-origin-hash');
        const gatewayHashEl = document.getElementById('ipfs-footer-gateway-hash');
        const githubHashEl = document.getElementById('ipfs-footer-github-hash');
        const gatewayDetailEl = document.getElementById('ipfs-footer-gateway-detail');
        const githubDetailEl = document.getElementById('ipfs-footer-github-detail');
        const recheckButton = document.getElementById('ipfs-footer-recheck-button');
        const manifestLinkEl = document.getElementById('ipfs-footer-manifest-link');
        const gatewayModalEl = document.getElementById('ipfs-footer-gateway-modal');
        const gatewayModalBodyEl = document.getElementById('ipfs-footer-gateway-modal-body');
        const gatewayModalCloseEl = document.getElementById('ipfs-footer-gateway-modal-close');
        let gatewayModalRows = IPFS_GATEWAYS.map((gateway) => ({
          label: gateway.label,
          siteUrl: gateway.siteUrl,
          manifestUrl: gateway.manifestUrl,
          state: 'Not checked',
          revision: null,
          hash: null,
          error: null
        }));

        function setVerificationExpanded(expanded) {
          verificationEl.open = expanded;
          verificationSummaryEl.setAttribute('aria-expanded', String(expanded));
          verificationContentEl.hidden = !expanded;
        }

        setVerificationExpanded(false);

        function resolveCurrentManifestUrl() {
          const path = window.location.pathname;
          const ipnsPrefix = '/ipns/' + IPNS_ID + '/';
          const ipfsPathParts = path.split('/');
          const ipfsPrefix = ipfsPathParts[1] === 'ipfs' && ipfsPathParts[2]
            ? '/ipfs/' + ipfsPathParts[2] + '/'
            : null;

          if (path === ipnsPrefix.slice(0, -1) || path.startsWith(ipnsPrefix)) {
            return window.location.origin + ipnsPrefix + MANIFEST_PATH;
          }

          if (ipfsPrefix) {
            return window.location.origin + ipfsPrefix + MANIFEST_PATH;
          }

          return window.location.origin + '/' + MANIFEST_PATH;
        }

        function shortHash(hash) {
          return hash ? hash.slice(0, 16) + '…' + hash.slice(-12) : 'unavailable';
        }

        function shortRevision(revision) {
          return revision ? revision.slice(0, 12) + '…' : 'unavailable';
        }

        function logVerificationStep(step, details) {
          if (details === undefined) {
            console.info('[IPFS verification]', step);
          } else {
            console.info('[IPFS verification]', step, details);
          }
        }

        function summarizeManifest(manifest) {
          if (!manifest) {
            return null;
          }

          return {
            gitRevision: manifest.gitRevision || null,
            gitRevisionDirty: Boolean(manifest.gitRevisionDirty),
            contentSha256: manifest.contentSha256 || null,
            previousContentSha256: Array.isArray(manifest.previousContentSha256)
              ? manifest.previousContentSha256
              : [],
            gitCommitUrl: manifest.gitCommitUrl || null
          };
        }

        function setStatus(state, message) {
          verificationEl.dataset.state = state;
          summaryStatusEl.dataset.state = state;
          summaryStatusEl.textContent = state === 'verified' ? 'Verified' : state === 'loading' ? 'Checking' : 'Failed';
          statusEl.dataset.state = state;
          statusMessageEl.textContent = message;
          shieldMarkEl.textContent = state === 'verified' ? '✓' : state === 'loading' ? '' : '×';
          logVerificationStep('status: ' + state, message);
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
          }
        }

        function fetchJson(url, timeoutMs = 12000, label = 'JSON') {
          logVerificationStep('fetch start: ' + label, { url, timeoutMs });
          const controller = new AbortController();
          const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

          return fetch(url, { cache: 'no-store', signal: controller.signal })
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.status + ' ' + response.statusText);
              }
              logVerificationStep('fetch response: ' + label, {
                url,
                status: response.status,
                statusText: response.statusText
              });
              return response.json();
            })
            .catch((error) => {
              if (error.name === 'AbortError') {
                const timeoutError = new Error('timed out after ' + Math.round(timeoutMs / 1000) + 's');
                logVerificationStep('fetch failed: ' + label, { url, error: timeoutError.message });
                throw timeoutError;
              }
              logVerificationStep('fetch failed: ' + label, { url, error: error.message });
              throw error;
            })
            .finally(() => window.clearTimeout(timeoutId));
        }

        function renderGatewayModalRows(rows) {
          gatewayModalBodyEl.innerHTML = '';
          rows.forEach((row) => {
            const tr = document.createElement('tr');
            const gatewayTd = document.createElement('td');
            const gatewayLink = document.createElement('a');
            gatewayLink.href = row.siteUrl;
            gatewayLink.target = '_blank';
            gatewayLink.rel = 'noopener';
            gatewayLink.textContent = row.label;
            gatewayTd.appendChild(gatewayLink);

            const stateTd = document.createElement('td');
            stateTd.textContent = row.state + (row.error ? ': ' + row.error : '');

            const revisionTd = document.createElement('td');
            const revisionCode = document.createElement('code');
            revisionCode.textContent = shortRevision(row.revision);
            revisionCode.title = row.revision || '';
            revisionTd.appendChild(revisionCode);

            const hashTd = document.createElement('td');
            const hashCode = document.createElement('code');
            hashCode.textContent = shortHash(row.hash);
            hashCode.title = row.hash || '';
            hashTd.appendChild(hashCode);

            tr.appendChild(gatewayTd);
            tr.appendChild(stateTd);
            tr.appendChild(revisionTd);
            tr.appendChild(hashTd);
            gatewayModalBodyEl.appendChild(tr);
          });
        }

        function openGatewayModal() {
          renderGatewayModalRows(gatewayModalRows);
          gatewayModalEl.hidden = false;
          gatewayModalCloseEl.focus();
        }

        function closeGatewayModal() {
          gatewayModalEl.hidden = true;
          gatewayDetailEl.focus();
        }

        async function fetchGatewayManifests() {
          const results = await Promise.allSettled(IPFS_GATEWAYS.map(async (gateway) => ({
            gatewayUrl: gateway.manifestUrl,
            label: gateway.label,
            siteUrl: gateway.siteUrl,
            manifest: await fetchJson(gateway.manifestUrl + '?verify=' + Date.now(), 8000, 'public gateway manifest: ' + gateway.manifestUrl)
          })));
          logVerificationStep('public gateway fetch settled', results.map((result, index) => ({
            gatewayUrl: IPFS_GATEWAYS[index].manifestUrl,
            status: result.status,
            error: result.status === 'rejected' && result.reason ? result.reason.message : null,
            manifest: result.status === 'fulfilled' ? summarizeManifest(result.value.manifest) : null
          })));
          const fulfilled = results
            .filter((result) => result.status === 'fulfilled')
            .map((result) => result.value);

          return {
            fulfilled,
            failed: results
              .map((result, index) => ({ result, gateway: IPFS_GATEWAYS[index] }))
              .filter((entry) => entry.result.status === 'rejected')
              .map((entry) => ({
                label: entry.gateway.label,
                siteUrl: entry.gateway.siteUrl,
                gatewayUrl: entry.gateway.manifestUrl,
                error: entry.result.reason && entry.result.reason.message ? entry.result.reason.message : 'unknown error'
              })),
            failedCount: results.length - fulfilled.length,
            totalCount: results.length
          };
        }

        function setDetail(el, value, title) {
          el.textContent = value;
          el.title = title || '';
        }

        function setDetailState(el, state) {
          if (state) {
            el.dataset.state = state;
          } else {
            delete el.dataset.state;
          }
        }

        async function fetchGithubMainCommit() {
          const commit = await fetchJson(GITHUB_MAIN_COMMIT_API_URL + '?verify=' + Date.now(), 8000, 'GitHub main commit API');

          if (!commit || typeof commit.sha !== 'string' || !commit.sha) {
            throw new Error('GitHub main commit response did not include a commit SHA');
          }

          const summarizedCommit = {
            sha: commit.sha,
            parentShas: Array.isArray(commit.parents)
              ? commit.parents.map((parent) => parent && parent.sha).filter(Boolean)
              : []
          };
          logVerificationStep('GitHub main commit parsed', summarizedCommit);
          return summarizedCommit;
        }

        async function runVerification() {
          console.group('[IPFS verification] run');
          logVerificationStep('configuration', {
            currentManifestUrl: CURRENT_MANIFEST_URL,
            githubRawManifestUrl: GITHUB_RAW_MANIFEST_URL,
            githubMainCommitApiUrl: GITHUB_MAIN_COMMIT_API_URL,
            publicGatewayManifestUrls: IPFS_GATEWAYS.map((gateway) => gateway.manifestUrl)
          });
          setStatus('loading', 'Checking ${DOMAIN_NAME} publication…');
          gitRevisionEl.textContent = 'checking…';
          originHashEl.textContent = 'checking…';
          gatewayHashEl.textContent = 'checking…';
          githubHashEl.textContent = 'checking…';
          gatewayModalRows = IPFS_GATEWAYS.map((gateway) => ({
            label: gateway.label,
            siteUrl: gateway.siteUrl,
            manifestUrl: gateway.manifestUrl,
            state: 'Checking',
            revision: null,
            hash: null,
            error: null
          }));
          renderGatewayModalRows(gatewayModalRows);
          setDetailState(gatewayDetailEl, null);
          setDetailState(githubDetailEl, null);
          recheckButton.disabled = true;

          try {
            const originManifest = await fetchJson(CURRENT_MANIFEST_URL + '?verify=' + Date.now(), 8000, 'current site manifest');
            logVerificationStep('current site manifest parsed', summarizeManifest(originManifest));
            setDetail(originHashEl, shortHash(originManifest.contentSha256), originManifest.contentSha256);
            setGitRevision(originManifest);
            manifestLinkEl.href = CURRENT_MANIFEST_URL;
            setStatus('loading', 'Loaded current site manifest; checking GitHub and IPFS…');

            const [githubManifest, gatewayResult, githubMainCommit] = await Promise.all([
              fetchJson(GITHUB_RAW_MANIFEST_URL + '?verify=' + Date.now(), 8000, 'GitHub raw manifest'),
              fetchGatewayManifests(),
              fetchGithubMainCommit()
            ]);

            logVerificationStep('GitHub raw manifest parsed', summarizeManifest(githubManifest));
            const githubManifestMatchesOrigin = githubManifest.contentSha256 === originManifest.contentSha256 &&
              githubManifest.gitRevision === originManifest.gitRevision;
            setDetail(githubHashEl, shortHash(githubManifest.contentSha256), githubManifest.contentSha256);
            setDetailState(githubDetailEl, githubManifestMatchesOrigin ? 'passed' : null);

            const gatewayResults = gatewayResult.fulfilled;
            const knownPreviousContentHashes = Array.isArray(originManifest.previousContentSha256)
              ? originManifest.previousContentSha256
              : [];
            const matchingGatewayResults = gatewayResults.filter((result) =>
              result.manifest.contentSha256 === originManifest.contentSha256 &&
              result.manifest.gitRevision === originManifest.gitRevision
            );
            const olderGatewayResults = gatewayResults.filter((result) =>
              knownPreviousContentHashes.includes(result.manifest.contentSha256) &&
              result.manifest.contentSha256 !== originManifest.contentSha256
            );
            const primaryGatewayResult = matchingGatewayResults[0] || gatewayResults[0] || null;
            const gatewayManifest = primaryGatewayResult ? primaryGatewayResult.manifest : null;
            const hasMatchingGatewayManifest = matchingGatewayResults.length > 0;
            gatewayModalRows = IPFS_GATEWAYS.map((gateway) => {
              const fulfilledGateway = gatewayResults.find((result) => result.gatewayUrl === gateway.manifestUrl);
              const failedGateway = gatewayResult.failed.find((result) => result.gatewayUrl === gateway.manifestUrl);
              if (fulfilledGateway) {
                const isCurrent = fulfilledGateway.manifest.contentSha256 === originManifest.contentSha256 &&
                  fulfilledGateway.manifest.gitRevision === originManifest.gitRevision;
                const isKnownOlder = knownPreviousContentHashes.includes(fulfilledGateway.manifest.contentSha256) &&
                  fulfilledGateway.manifest.contentSha256 !== originManifest.contentSha256;
                return {
                  label: gateway.label,
                  siteUrl: gateway.siteUrl,
                  manifestUrl: gateway.manifestUrl,
                  state: isCurrent ? 'Verified current' : isKnownOlder ? 'Known older version' : 'Mismatch',
                  revision: fulfilledGateway.manifest.gitRevision || null,
                  hash: fulfilledGateway.manifest.contentSha256 || null,
                  error: null
                };
              }
              return {
                label: gateway.label,
                siteUrl: gateway.siteUrl,
                manifestUrl: gateway.manifestUrl,
                state: 'Fetch failed',
                revision: null,
                hash: null,
                error: failedGateway ? failedGateway.error : 'unknown error'
              };
            });
            renderGatewayModalRows(gatewayModalRows);
            setDetail(
              gatewayHashEl,
              gatewayManifest ? shortHash(gatewayManifest.contentSha256) : 'unavailable',
              gatewayModalRows.map((row) => row.manifestUrl + ' — ' + row.state + ' — ' + (row.revision || 'no revision') + ' — ' + (row.hash || row.error || 'no content hash')).join(String.fromCharCode(10))
            );
            setDetailState(gatewayDetailEl, hasMatchingGatewayManifest ? 'passed' : null);
            const sameContent = originManifest.contentSha256 === githubManifest.contentSha256 &&
              hasMatchingGatewayManifest;
            const sameRevision = originManifest.gitRevision === githubManifest.gitRevision &&
              hasMatchingGatewayManifest;
            const githubMainAcceptableRevisions = [githubMainCommit.sha].concat(githubMainCommit.parentShas);
            const manifestRevisionIsCurrentGithubPublication =
              githubMainAcceptableRevisions.includes(githubManifest.gitRevision) &&
              githubMainAcceptableRevisions.includes(originManifest.gitRevision) &&
              matchingGatewayResults.some((result) => githubMainAcceptableRevisions.includes(result.manifest.gitRevision));
            const anyDirtyManifest = originManifest.gitRevisionDirty || githubManifest.gitRevisionDirty ||
              gatewayResults.some((result) => result.manifest.gitRevisionDirty);

            logVerificationStep('comparison results', {
              sameContent,
              sameRevision,
              hasMatchingGatewayManifest,
              manifestRevisionIsCurrentGithubPublication,
              anyDirtyManifest,
              matchingGatewayCount: matchingGatewayResults.length,
              checkedGatewayCount: gatewayResult.totalCount,
              failedGatewayCount: gatewayResult.failedCount,
              olderGatewayCount: olderGatewayResults.length,
              knownPreviousContentHashes,
              acceptableGithubRevisions: githubMainAcceptableRevisions
            });

            if (anyDirtyManifest) {
              setStatus('warning', 'Uncommitted changes reported; GitHub cannot fully verify this build.');
            } else if (!hasMatchingGatewayManifest && olderGatewayResults.length) {
              setStatus('warning', 'Outdated: checked public IPFS gateways are serving a known older site version.');
            } else if (!hasMatchingGatewayManifest) {
              setStatus('warning', 'Mismatch: no checked public IPFS gateway is serving the same manifest as this site.');
            } else if (!manifestRevisionIsCurrentGithubPublication) {
              setStatus('warning', 'Mismatch: manifests do not point at the current GitHub main commit or its direct parent manifest revision.');
            } else if (sameContent && sameRevision) {
              setStatus('verified', 'Verified: current site, at least one public IPFS gateway, GitHub raw manifest, and the current GitHub publication revision match.');
            } else if (!sameRevision) {
              setStatus('warning', 'Mismatch: current site, matched public IPFS gateway, or GitHub raw manifest point at different Git revisions.');
            } else {
              setStatus('warning', 'Mismatch: current site, matched public IPFS gateway, or GitHub raw manifest have different content hashes.');
            }
          } catch (error) {
            logVerificationStep('verification threw', { error: error.message });
            setStatus('error', 'Unable to verify publication: ' + error.message);
          } finally {
            recheckButton.disabled = false;
            logVerificationStep('run complete');
            console.groupEnd();
          }
        }

        verificationEl.addEventListener('toggle', () => {
          setVerificationExpanded(verificationEl.open);
        });
        if (!('open' in document.createElement('details'))) {
          verificationSummaryEl.addEventListener('click', () => {
            setVerificationExpanded(!verificationEl.open);
          });
        }
        gatewayDetailEl.addEventListener('click', openGatewayModal);
        gatewayDetailEl.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openGatewayModal();
          }
        });
        gatewayModalCloseEl.addEventListener('click', closeGatewayModal);
        gatewayModalEl.addEventListener('click', (event) => {
          if (event.target && event.target.hasAttribute('data-ipfs-footer-modal-close')) {
            closeGatewayModal();
          }
        });
        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && !gatewayModalEl.hidden) {
            closeGatewayModal();
          }
        });
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
