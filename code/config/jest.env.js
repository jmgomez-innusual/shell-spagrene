// Force Node env to test
process.env.NODE_ENV = "test";

// Set AMIGA globals in the global scope
global.AMIGA = {
  APP_VERSION: "vX.Y.Z",
  PUBLISHING_ENDPOINTS: false,
};

global.console = {
  ...console,
  // Uncomment to ignore a specific log level
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
