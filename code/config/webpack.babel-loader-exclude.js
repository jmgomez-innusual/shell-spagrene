// Exclude all dependencies except for framework packages
module.exports = (m) =>
  (/node_modules[\/\\]/.test(m) && !/[\/\\]@amiga(-x)?/.test(m)) || /@itx-digital-web-community/.test(m);
