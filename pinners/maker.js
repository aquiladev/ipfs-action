module.exports = ({ builder, upload }) => async options => {
  const api = await builder(options);

  return {
    upload: async (options) => {
      const { path } = options;
      if (!path) {
        throw new Error('Path is empty'); 
      }
      
      return upload(api, options);
    }
  }
}