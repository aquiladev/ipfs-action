const fsPath = require("path");

module.exports =
  ({ builder, upload }) =>
  async (options) => {
    const api = await builder(options);

    return {
      upload: async (options) => {
        const { path } = options;
        if (!path) {
          throw new Error("Path is empty");
        }

        let source = path;
        if (!fsPath.isAbsolute(source)) {
          const dir = (
            process.env.GITHUB_WORKSPACE || process.cwd()
          ).toString();
          source = fsPath.join(dir, source);
        }

        return upload(api, { ...options, path: source });
      },
    };
  };
