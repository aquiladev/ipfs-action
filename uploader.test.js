import uploader from "./uploader.js";

import {jest} from '@jest/globals';
jest.setTimeout(240000);

const options = {
  path: "",
  service: "ipfs",
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  timeout: 1000,
  verbose: false,
};

describe("ipfs", () => {
  it("throws ENOENT: no such file or directory", async () => {
    await expect(
      uploader.upload({ ...options, path: "./1" })
    ).rejects.toThrow();
  });

  it.skip("throws multipart: NextPart: EOF", async () => {
    await expect(
      uploader.upload({ ...options, path: "./data_empty" })
    ).rejects.toThrow("multipart: NextPart: EOF");
  });
});

describe("infura", () => {
  it("throws ENOENT: no such file or directory", async () => {
    await expect(
      uploader.upload({ ...options, path: "./1", service: "infura" })
    ).rejects.toThrow();
  });
});

describe("pinata", () => {
  it("throws error when pinataKey is empty", async () => {
    await expect(
      uploader.upload({ ...options, path: "./data", service: "pinata" })
    ).rejects.toThrow("[pinata] API Key is empty");
  });

  it("throws error when pinataSecret is empty", async () => {
    await expect(
      uploader.upload({
        ...options,
        path: "./data",
        service: "pinata",
        pinataKey: ".",
      })
    ).rejects.toThrow("[pinata] Secret is empty");
  });
});

describe("filebase", () => {
  it("throws error when filebaseKey is empty", async () => {
    await expect(
      uploader.upload({ ...options, path: "./data", service: "filebase" })
    ).rejects.toThrow("filebaseKey is empty");
  });

  it("throws error when filebaseSecret is empty", async () => {
    await expect(
      uploader.upload({
        ...options,
        path: "./data",
        service: "filebase",
        filebaseKey: ".",
      })
    ).rejects.toThrow("filebaseSecret is empty");
  });
});
