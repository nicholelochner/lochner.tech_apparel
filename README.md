This code is unlicensed and may not be used for commercial purposes. You may use it as a technical reference. 

# lochner.tech static site host

This repository includes a Node.js server to host the static website files over both HTTP and HTTPS.

## Certificate configuration

The server is configured with hardcoded certbot paths and serves both domains simultaneously via SNI:

- `lochner.tech`
  - `/etc/letsencrypt/live/lochner.tech/privkey.pem`
  - `/etc/letsencrypt/live/lochner.tech/fullchain.pem`
- `www.lochner.tech`
  - `/etc/letsencrypt/live/www.lochner.tech/privkey.pem`
  - `/etc/letsencrypt/live/www.lochner.tech/fullchain.pem`

If your cert paths change, update `TLS_CERTIFICATES` in `server.js`.

## Run

```bash
npm start
```

The server will:
- Redirect all HTTP requests on port `80` to HTTPS
- Serve the site on port `443` (HTTPS)
- Select the correct certificate for `lochner.tech` and `www.lochner.tech` using SNI

## Build for IPFS

IPFS gateways commonly serve sites from a path like `/ipfs/<CID>/`, so absolute site-root URLs such as `/assets/...` can point at the gateway root instead of this site. Generate an IPFS-ready bundle before publishing:

```bash
npm run build:ipfs
```

The command writes a self-contained `dist-ipfs/` directory that:
- Copies the static assets and images needed by the site
- Renders the shared header and footer into each HTML file, so the Node.js server is not required
- Rewrites root-relative local asset references to relative paths for gateway compatibility
- Adds `lochner-apparel/index.html` so the `/lochner-apparel` route alias also works as a directory-style IPFS path

Publish the generated directory with your IPFS client or pinning service. For example:

```bash
ipfs add -r dist-ipfs
```

Then open the resulting root CID through your preferred IPFS gateway.
