const { transform } = ('./transformSvg');

module.exports = {
  process (code, path) {
    return transform(path);
  },
  getCacheKey () {
    return '<svg></svg>';
  },
};
