const run = require("./runner");

jest.setTimeout(240000);

const FILEBASE_CONFIG = {
  bucket: '',
  key: '',
  secret: ''
}

describe.skip("index: Integration test", () => {
  it("should upload data dir", async () => {
    process.env["INPUT_PATH"] = "./data";
    process.env["INPUT_SERVICE"] = "ipfs";
    process.env["INPUT_HOST"] = "ipfs.infura.io";
    process.env["INPUT_PORT"] = 5001;
    process.env["INPUT_PROTOCOL"] = "https";
    process.env["INPUT_TIMEOUT"] = 60000;
    process.env["INPUT_VERBOSE"] = false;
    await run();
  });

  it("[filebase] should upload data dir", async () => {
    process.env["INPUT_PATH"] = "./data";
    process.env["INPUT_SERVICE"] = "filebase";
    process.env["INPUT_PINNAME"] = "filebase-ipfs-action-runner-test";
    process.env["INPUT_BUCKET"] = FILEBASE_CONFIG.bucket;
    process.env["INPUT_APIKEY"] = FILEBASE_CONFIG.key;
    process.env["INPUT_APISECRET"] = FILEBASE_CONFIG.secret;
    process.env["INPUT_TIMEOUT"] = 60000;
    process.env["INPUT_VERBOSE"] = true;
    await run();
  });

  it("should upload real dapp dir", async () => {
    process.env["INPUT_PATH"] =
      "C:/Users/SergiiBomko/Documents/GitHub/dapps-delivery-guide/build";
    process.env["INPUT_SERVICE"] = "ipfs";
    process.env["INPUT_HOST"] = "ipfs.infura.io";
    process.env["INPUT_PORT"] = 5001;
    process.env["INPUT_PROTOCOL"] = "https";
    process.env["INPUT_TIMEOUT"] = 120000;
    process.env["INPUT_VERBOSE"] = true;
    await run();
  });

  it("[infura] should upload real dapp dir", async () => {
    process.env["INPUT_PATH"] =
      "C:/Users/SergiiBomko/Documents/GitHub/dapps-delivery-guide/build";
    process.env["INPUT_SERVICE"] = "infura";
    process.env["INPUT_TIMEOUT"] = 180000;
    process.env["INPUT_VERBOSE"] = true;
    await run();
  });
});
