This code is unlicensed and may not be used for commercial purposes. You may use it as a technical reference. 

Copyright (c) 2022-2026 Nicholas Jean Lochner, a/k/a Nichole Lochner

# lochner.tech static site host

This repository includes a Node.js server to host the static website files over both HTTP and HTTPS.

# IPFS Deployment

First, merge in development branch into main.  
Then, generate ipfs-version.json
```bash
git/lochner.tech_apparel$ clear && git pull && npm run generate:ipfs-version && gf
```

Then, on the IPFS host node, run ipfs:update
```bash
git pull && npm run ipfs:update
```

Finally, on the VPS proxy, ensure daemon is running in a screen `ipfs daemon`
```bash
ipfs name resolve --nocache k2k4r8jw4dtnalpkgklrqeflhsgderg6a8wn5lix7bww1yjemm0rx7ye && ipfs get --progress /ipns/k2k4r8jw4dtnalpkgklrqeflhsgderg6a8wn5lix7bww1yjemm0rx7ye
/ipfs/bafybeiaa5aku4jpgtnxgdtcv3kfgwhemuitohfrizs5bnpna27rcwglk2a
Saving file(s) to k2k4r8jw4dtnalpkgklrqeflhsgderg6a8wn5lix7bww1yjemm0rx7ye
3.72 MiB / 3.72 MiB [---------------------------------------------------------------------------------------------------------------------------------------] 11.76 MiB/s 100.00% 500ms
```
If download hangs or fails, restart `ipfs daemon`

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
- Writes `ipfs-version.json`, a deterministic content manifest with the domain name, configured IPFS/IPNS ID, Git revision, and GitHub commit URL used by the frontend to compare the current site, public IPFS gateway versions, and the GitHub raw manifest
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

The update script refuses to create a new key and is hardcoded to expect the production IPNS ID by default. To publish with a different key, explicitly override `LOCHNER_EXPECTED_IPNS_ID`:

```bash
LOCHNER_EXPECTED_IPNS_ID=<alternate-ipns-id> npm run ipfs:update
```

Both scripts support `LOCHNER_IPNS_KEY_NAME` to override the default `lochner-tech` key name. The IPFS version manifest always includes `domainName: "lochner.tech"` and defaults `ipnsId` to `k2k4r8jw4dtnalpkgklrqeflhsgderg6a8wn5lix7bww1yjemm0rx7ye`; set `LOCHNER_IPNS_ID` or `LOCHNER_EXPECTED_IPNS_ID` to override the IPNS ID when generating a manifest for a different key. The scripts also support `IPFS_BIN`, `IPFS_HOME`, and `IPFS_PATH` for Kubo/IPFS installations that are not on `PATH`.

## Frontend IPFS version verification

Every `lochner.tech` page includes a browser-side verification footer that tests the release flow against `lochner.tech`. It fetches `ipfs-version.json` from the currently loaded site, which may be HTTPS served through an IPFS-backed proxy, from each configured public IPFS gateway with green IPNS support in the public gateway checker at `/ipns/k2k4r8jw4dtnalpkgklrqeflhsgderg6a8wn5lix7bww1yjemm0rx7ye/ipfs-version.json`, and from the GitHub raw manifest at `https://raw.githubusercontent.com/nicholelochner/lochner.tech_apparel/refs/heads/main/ipfs-version.json`, then compares the deterministic `contentSha256` value, the `gitRevision`, and every `files[]` entry by path, byte count, and SHA-256 hash. It also asks the GitHub commits API for the current `main` branch commit and accepts the manifest revision when it is either that commit or that commit's direct parent, which supports the normal workflow where `ipfs-version.json` is generated before the manifest commit exists. At least one configured public gateway response must match the current site manifest; the generator appends older content hashes to `previousContentSha256`, gateways serving any listed previous content hash are reported as known older versions, and stale or lagging gateways do not fail verification when another gateway matches. Each verification run also prints its fetch URLs, parsed manifests, gateway results, GitHub commit lineage, aggregate comparison booleans, per-file missing/extra/mismatched details, and final status to the browser console under an `[IPFS verification]` group. The footer links the revision to the exact GitHub commit, includes links to each configured public gateway for viewing the site, and warns if any manifest was generated from a dirty working tree, so users can verify the published frontend against source code. A match means the current site, at least one public gateway, the GitHub raw manifest, and current GitHub publication commit lineage all report the same Git revision, aggregate content version, and per-file path/byte/hash manifest entries; a mismatch means the IPFS/IPNS publication, proxied HTTPS site, or committed manifest may still be stale or was published from different source content.

Generate and commit the root manifest before publishing so GitHub raw blobs can participate in verification:

```bash
LOCHNER_GIT_REVISION_DIRTY=false npm run generate:ipfs-version
git add ipfs-version.json


#test

```
