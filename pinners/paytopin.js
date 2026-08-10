const fs = require("fs");
const fsPath = require("path");

/**
 * IPFS Pay-to-Pin service provider.
 * Uploads files to IPFS via the Pay-to-Pin gateway using x402 microUSDC payments on Algorand.
 *
 * Required inputs:
 *   paytopinMnemonic  - Algorand mnemonic phrase (GitHub Secret recommended)
 * Optional inputs:
 *   paytopinGatewayUrl - Gateway URL (default: https://pay-to-pin.duckdns.org)
 *   paytopinNetwork    - 'mainnet' or 'testnet' (default: 'mainnet')
 *   paytopinMaxPriceUsdc - Max price cap in USDC (default: 1.0)
 */

const DEFAULT_GATEWAY = "https://pay-to-pin.duckdns.org";

// Lazy-import the SDK client to keep bundle minimal (only needed if paytopin service is used)
function getClient() {
  return require("ipfs-pay-to-pin-client");
}

module.exports = {
  name: "Pay-to-Pin",
  builder: async (options) => {
    const {
      paytopinMnemonic,
      paytopinGatewayUrl,
      paytopinNetwork,
      paytopinMaxPriceUsdc,
    } = options;

    if (!paytopinMnemonic) {
      throw new Error(
        "[paytopin] Mnemonic is empty. (input `paytopinMnemonic`)"
      );
    }

    const gatewayUrl = (paytopinGatewayUrl || DEFAULT_GATEWAY).replace(/\/$/, "");
    const network = paytopinNetwork || "mainnet";
    const maxPriceUsdc = paytopinMaxPriceUsdc || 1.0;

    return { gatewayUrl, network, maxPriceUsdc };
  },
  upload: async (api, options) => {
    const { path, pinName, verbose } = options;
    const { gatewayUrl, network, maxPriceUsdc } = api;

    // Read all files from the path (file or directory)
    const files = [];
    const isDir = fs.lstatSync(path).isDirectory();

    if (isDir) {
      // Walk directory recursively
      const walk = (dir, prefix = "") => {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = fsPath.join(dir, entry.name);
          const relPath = prefix
            ? `${prefix}/${entry.name}`
            : entry.name;
          if (entry.isDirectory()) {
            walk(fullPath, relPath);
          } else {
            files.push({ fullPath, relPath });
          }
        }
      };
      walk(path);

      if (verbose) {
        console.log(`[paytopin] Found ${files.length} files to upload`);
      }
    } else {
      files.push({ fullPath: path, relPath: fsPath.basename(path) });
    }

    if (files.length === 0) {
      throw new Error("[paytopin] No files found to upload");
    }

    // Initialize the Pay-to-Pin SDK client
    const { IpfsPayToPinClient } = getClient();
    const client = new IpfsPayToPinClient({
      gatewayUrl,
      mnemonic: options.paytopinMnemonic,
      network,
      maxPriceUsdc,
    });

    if (verbose) {
      console.log(`[paytopin] Client ready, account: ${client.getAddress()}`);
    }

    // Upload files one by one to Pay-to-Pin
    const results = [];
    for (const file of files) {
      const fileData = fs.readFileSync(file.fullPath);

      if (verbose) {
        console.log(
          `[paytopin] Uploading ${file.relPath} (${fileData.length} bytes)...`
        );
      }

      const res = await client.pinFile({
        filename: file.relPath,
        data: fileData,
      });

      if (res.status === "success" || res.ipfs_cid) {
        results.push({
          cid: res.ipfs_cid,
          ipfs: res.ipfs_cid,
          gateway_url: res.gateway_url,
          filename: file.relPath,
        });
      } else {
        throw new Error(
          `[paytopin] Upload failed for ${file.relPath}: ${res.message || "unknown error"}`
        );
      }

      if (verbose) {
        console.log(
          `[paytopin] Pinned ${file.relPath} → ${res.ipfs_cid} (expires: ${res.expires_at})`
        );
      }
    }

    // Return the first CID as the primary result (for backward compat)
    const firstResult = results[0];

    return {
      cid: firstResult.cid,
      ipfs: firstResult.ipfs,
      paytopin_cid: firstResult.cid,
      paytopin_gateway_url: firstResult.gateway_url,
      files_pinned: results.map((r) => ({
        cid: r.cid,
        filename: r.filename,
        gateway_url: r.gateway_url,
      })),
    };
  },
};
