This code is unlicensed and may not be used for commercial purposes. You may use it as a technical reference. 

Copyright (c) 2022-2026 Nicholas Jean Lochner, a/k/a Nichole Lochner

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
npm run export:ipfs
```

The command writes a self-contained `dist-ipfs/` directory that:
- Copies the static assets and images needed by the site
- Renders the shared header and footer into each HTML file, so the Node.js server is not required
- Rewrites root-relative local asset references to relative paths for gateway compatibility
- Adds `lochner-apparel/index.html` so the `/lochner-apparel` route alias also works as a directory-style IPFS path

Publish the generated directory with your IPFS client or pinning service, or use one of the included helper scripts.

For a first publish, run:

```bash
npm run ipfs:publish
```

That script builds `dist-ipfs/`, adds it to IPFS with CIDv1, pins the CID, creates the `lochner-tech` IPNS key if needed, and publishes the CID to that IPNS name.

For production updates after the key already exists, run:

```bash
npm run ipfs:update
```

The update script refuses to create a new key. To guard against publishing with the wrong local key, set `LOCHNER_EXPECTED_IPNS_ID` to the production IPNS ID before running it:

```bash
LOCHNER_EXPECTED_IPNS_ID=<production-ipns-id> npm run ipfs:update
```

Both scripts support `LOCHNER_IPNS_KEY_NAME` to override the default `lochner-tech` key name. They also support `IPFS_BIN`, `IPFS_HOME`, and `IPFS_PATH` for Kubo/IPFS installations that are not on `PATH`.
