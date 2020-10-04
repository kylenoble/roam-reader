module.exports = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
