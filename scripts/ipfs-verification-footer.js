const GITHUB_REPOSITORY_URL = 'https://github.com/nicholelochner/lochner.tech_apparel';
const GITHUB_RAW_MANIFEST_URL = 'https://raw.githubusercontent.com/nicholelochner/lochner.tech_apparel/main/ipfs-version.json';
const GITHUB_MAIN_COMMIT_API_URL = 'https://api.github.com/repos/nicholelochner/lochner.tech_apparel/commits/main';
const MANIFEST_PATH = 'ipfs-version.json';
const TEST_DOMAIN = 'lochner.tech';
const IPNS_ID = 'k2k4r8jw4dtnalpkgklrqeflhsgderg6a8wn5lix7bww1yjemm0rx7ye';
const INBROWSER_IPNS_URL = `https://${IPNS_ID}.ipns.inbrowser.link/`;
const DWEB_IPNS_URL = `https://${IPNS_ID}.ipns.dweb.link/`;
const PUBLIC_GATEWAY_CHECKER_URL = 'https://ipfs.github.io/public-gateway-checker/';
const PUBLIC_IPFS_GATEWAYS = [
  { label: 'inbrowser.link', siteUrl: INBROWSER_IPNS_URL },
  { label: 'ipfs.io', siteUrl: `https://ipfs.io/ipns/${TEST_DOMAIN}/` },
  { label: 'dweb.link', siteUrl: DWEB_IPNS_URL },
  { label: '4everland.io', siteUrl: `https://4everland.io/ipns/${TEST_DOMAIN}/` },
  { label: 'ipfs.filebase.io', siteUrl: `https://ipfs.filebase.io/ipns/${TEST_DOMAIN}/` },
  { label: 'dget.top', siteUrl: `https://dget.top/ipns/${TEST_DOMAIN}/` },
];

function createSharedFooterTemplate(copyrightYear) {
  const publicGatewayLinks = PUBLIC_IPFS_GATEWAYS
    .map((gateway) => `<a href="${gateway.siteUrl}" target="_blank" rel="noopener">${gateway.label}</a>`)
    .join(' ·\n        ');
  const publicGatewayManifestUrls = JSON.stringify(
    PUBLIC_IPFS_GATEWAYS.map((gateway) => gateway.siteUrl + MANIFEST_PATH)
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
        <div id="ipfs-footer-gateway-detail" class="ipfs-footer-verification-detail">
          <strong>IPFS hash</strong>
          <span id="ipfs-footer-gateway-hash">pending</span>
        </div>
        <div id="ipfs-footer-github-detail" class="ipfs-footer-verification-detail">
          <strong>GitHub raw hash</strong>
          <span id="ipfs-footer-github-hash">pending</span>
        </div>
      </div>
      <p class="ipfs-footer-explainer">
        <strong>How this verifies:</strong> the footer JavaScript fetches this site's manifest, a public IPFS/IPNS gateway manifest, and the GitHub raw manifest, then compares their Git revisions and content hashes. The links below are evidence links for manual inspection; the <strong>Run verification</strong> button is the programmatic check.
      </p>
      <noscript>
        <p class="ipfs-footer-explainer"><strong>JavaScript is required</strong> to run the automatic verification. Without JavaScript, these controls can only open the evidence files.</p>
      </noscript>
      <div class="ipfs-footer-verification-actions">
        <button type="button" id="ipfs-footer-recheck-button">Run verification</button>
        <a id="ipfs-footer-git-link" href="${GITHUB_REPOSITORY_URL}" target="_blank" rel="noopener">Open GitHub commit</a>
        <a id="ipfs-footer-gateway-link" href="https://ipfs.io/ipns/${TEST_DOMAIN}/" target="_blank" rel="noopener">Open matched IPFS gateway</a>
        <a id="ipfs-footer-manifest-link" href="/${MANIFEST_PATH}" target="_blank" rel="noopener">Open this site manifest</a>
        <a id="ipfs-footer-github-manifest-link" href="${GITHUB_RAW_MANIFEST_URL}" target="_blank" rel="noopener">Open GitHub raw manifest</a>
      </div>
      <div class="ipfs-footer-public-gateways">
        <strong>View site on public gateways:</strong>
        ${publicGatewayLinks} ·
        <a href="${PUBLIC_GATEWAY_CHECKER_URL}" target="_blank" rel="noopener">gateway checker</a>
      </div>
    </section>
    <script>
      (function () {
        const TEST_DOMAIN = '${TEST_DOMAIN}';
        const MANIFEST_PATH = '${MANIFEST_PATH}';
        const CURRENT_MANIFEST_URL = resolveCurrentManifestUrl();
        const GITHUB_RAW_MANIFEST_URL = '${GITHUB_RAW_MANIFEST_URL}';
        const GITHUB_MAIN_COMMIT_API_URL = '${GITHUB_MAIN_COMMIT_API_URL}';
        const IPFS_GATEWAYS = ${publicGatewayManifestUrls};

        const statusEl = document.getElementById('ipfs-footer-status');
        const statusMessageEl = document.getElementById('ipfs-footer-status-message');
        const gitRevisionEl = document.getElementById('ipfs-footer-git-revision');
        const originHashEl = document.getElementById('ipfs-footer-origin-hash');
        const gatewayHashEl = document.getElementById('ipfs-footer-gateway-hash');
        const githubHashEl = document.getElementById('ipfs-footer-github-hash');
        const gatewayDetailEl = document.getElementById('ipfs-footer-gateway-detail');
        const githubDetailEl = document.getElementById('ipfs-footer-github-detail');
        const recheckButton = document.getElementById('ipfs-footer-recheck-button');
        const gitLinkEl = document.getElementById('ipfs-footer-git-link');
        const gatewayLinkEl = document.getElementById('ipfs-footer-gateway-link');
        const manifestLinkEl = document.getElementById('ipfs-footer-manifest-link');

        function resolveCurrentManifestUrl() {
          const path = window.location.pathname;
          const ipnsPrefix = '/ipns/' + TEST_DOMAIN + '/';
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
          statusEl.dataset.state = state;
          statusMessageEl.textContent = message;
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
            gitLinkEl.href = manifest.gitCommitUrl;
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

        async function fetchGatewayManifests() {
          const results = await Promise.allSettled(IPFS_GATEWAYS.map(async (gatewayUrl) => ({
            gatewayUrl,
            manifest: await fetchJson(gatewayUrl + '?verify=' + Date.now(), 8000, 'public gateway manifest: ' + gatewayUrl)
          })));
          logVerificationStep('public gateway fetch settled', results.map((result, index) => ({
            gatewayUrl: IPFS_GATEWAYS[index],
            status: result.status,
            error: result.status === 'rejected' && result.reason ? result.reason.message : null,
            manifest: result.status === 'fulfilled' ? summarizeManifest(result.value.manifest) : null
          })));
          const fulfilled = results
            .filter((result) => result.status === 'fulfilled')
            .map((result) => result.value);

          if (!fulfilled.length) {
            const errors = results.map((result, index) => {
              const reason = result.reason && result.reason.message ? result.reason.message : 'unknown error';
              return IPFS_GATEWAYS[index] + ': ' + reason;
            });
            throw new Error(errors.join('; '));
          }

          return {
            fulfilled,
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
            publicGatewayManifestUrls: IPFS_GATEWAYS
          });
          setStatus('loading', 'Checking lochner.tech publication…');
          gitRevisionEl.textContent = 'checking…';
          originHashEl.textContent = 'checking…';
          gatewayHashEl.textContent = 'checking…';
          githubHashEl.textContent = 'checking…';
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
            const primaryGatewayResult = matchingGatewayResults[0] || gatewayResults[0];
            const gatewayManifest = primaryGatewayResult.manifest;
            const hasMatchingGatewayManifest = matchingGatewayResults.length > 0;
            setDetail(gatewayHashEl, shortHash(gatewayManifest.contentSha256), gatewayResults.map((result) => {
              const versionStatus = result.manifest.contentSha256 === originManifest.contentSha256
                ? 'current'
                : knownPreviousContentHashes.includes(result.manifest.contentSha256)
                  ? 'known older version'
                  : 'unknown version';
              return result.gatewayUrl + ' — ' + versionStatus + ' — ' + (result.manifest.gitRevision || 'no revision') + ' — ' + (result.manifest.contentSha256 || 'no content hash');
            }).join('\\n'));
            setDetailState(gatewayDetailEl, hasMatchingGatewayManifest ? 'passed' : null);
            gatewayLinkEl.href = primaryGatewayResult.gatewayUrl.replace('/' + MANIFEST_PATH, '/');

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
