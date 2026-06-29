# @lochner/ipfs-verification-widget

Embeddable Node/CommonJS module that renders an IPFS/Git publication verification footer widget for static sites.

## Usage

```js
const { createSharedFooterTemplate } = require('@lochner/ipfs-verification-widget');

const footerHtml = createSharedFooterTemplate(new Date().getFullYear(), {
  domainName: 'alfmir.ai',
  ipnsId: 'your-ipns-id',
  githubRawManifestUrl: 'https://raw.githubusercontent.com/OWNER/REPO/main/ipfs-version.json',
  githubMainCommitApiUrl: 'https://api.github.com/repos/OWNER/REPO/commits/main',
  footerCredit: 'Alfmir AI',
});
```

The returned HTML includes the widget markup, styles, and browser-side verification script.

## Options

- `domainName` - displayed in the verification status copy.
- `ipnsId` - IPNS name used to build default public gateway URLs.
- `githubRawManifestUrl` - raw `ipfs-version.json` URL used during verification.
- `githubMainCommitApiUrl` - GitHub API URL for the publication branch commit.
- `manifestPath` - manifest path on the published site. Defaults to `ipfs-version.json`.
- `verificationNotBeforePath` - optional delay timestamp path. Defaults to `ipfs-verification-not-before.txt`.
- `publicIpfsGateways` - array of `{ label, siteUrl, manifestUrl? }` gateways. Defaults to several public IPNS gateways for `ipnsId`.
- `publicGatewayCheckerUrl` - link target for gateway checker.
- `footerCredit` - copyright footer text after the year.
