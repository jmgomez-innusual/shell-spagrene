const { inProject } = require("@amiga-fwk-web/tools-cli-utils");
const { findFile, requireFile } = inProject();
const esmDeps = requireFile("<root>/config/jest.esm.js", "<framework>/jest.esm.js");
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("../tsconfig.json");

// Jest configuration
// https://jestjs.io/docs/en/configuration
module.exports = {
  // Enable DOM tests support
  testEnvironment: "jsdom",
  // Preset Typescript
  preset: "ts-jest",

  // Base URL for the jsdom environment
  testEnvironmentOptions: {
    // Base URL for the jsdom environment
    url: "http://localhost",
  },

  // Test all files either suffixed with "-test.js", "-test.jsx", "-test.ts", "-test.tsx", or
  // having ".test.js", ".test.jsx", ".test.ts", ".test.tsx" extensions
  testRegex: ".*[-.]test\\.(js|ts)x?$",

  // Ignore the Yarn cache if present in the project's folder
  modulePathIgnorePatterns: ["<rootDir>/.yarn_cache"],
  
  transform: {
    // Transform all js and jsx files with Babel
    "\\.(js)x?$": findFile("<root>/config/jest.transformer.js", "<framework>/jest.transformer.js"),
    "\\.(ts)x?$": "ts-jest",
  },

  // Do not transpile node_modules unless there are a ESM distributed
  // module
  transformIgnorePatterns: [`node_modules/(?!(${esmDeps.join("|")})/)`],

  // Code search paths
  modulePaths: ["<rootDir>/src/", "<rootDir>/test/", "<rootDir>"],

  setupFiles: [
    // Configure environment variables for the test environment
    findFile("<root>/config/jest.env.js", "<framework>/jest.env.js"),
    // Load the jest required polyfills
    findFile("<root>/config/jest.polyfills.js", "<framework>/jest.polyfills.js"),
  ],

  setupFilesAfterEnv: [
    // Configure React testing library support
    findFile("<root>/config/jest.reacttesting.js", "<framework>/jest.reacttesting.js"),
  ],

  // Imported CSS/images mocks
  moduleNameMapper: {
    "^!raw-loader": findFile("<root>/config/jest.nullmapper.js", "<framework>/jest.nullmapper.js"),
    "\\.md$": findFile("<root>/config/jest.nullmapper.js", "<framework>/jest.nullmapper.js"),  
    "\\.css$": findFile("<root>/config/jest.nullmapper.js", "<framework>/jest.nullmapper.js"),
    "\\.icon\\.svg$": findFile("<root>/config/jest.svgiconmapper.js", "<framework>/jest.svgiconmapper.js"),
    "\\.(png|jpe?g|gif|svg)$": findFile("<root>/config/jest.nullmapper.js", "<framework>/jest.nullmapper.js"),
    ...pathsToModuleNameMapper(compilerOptions.paths)
  },

  // File extensions to be tested
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Do not create coverage reports by default. Use the --coverage CLI option to override it
  collectCoverage: false,

  // Dump the coverage reports into the "coverage" folder
  coverageDirectory: "reports/jest-coverage",

  // Project's path which coverage will be reported
  collectCoverageFrom: ["src/**/*.{js,jsx}", "src/**/*.{ts,tsx}"],

  // Generate coverage reports in textm HTML, lcov and clover format
  coverageReporters: ["text", "html", "lcov", "clover"],

  // Use the default and Sonar reporters
  reporters: [
    "default",
    //Config for sonar report. Check sonar-project.properties file.
    [
      "jest-sonar",
      {
        outputDirectory: "reports/jest-sonar",
        outputName: "sonar-report.xml",
        reportedFilePath: "absolute",
      },
    ],
    //Config fo QA-unit Workflow
    [
      "./node_modules/jest-html-reporter",
      {
        outputPath: "reports/test-report/test-report.html",
      },
    ],
  ],

  // Postprocess test result to create a Bamboo format compatible report
  testResultsProcessor: "jest-bamboo-reporter",

  // Avoid infinite loops when using the --watch option. The test-report.json
  // (jest-bamboo-reporter) gets regenerated on each test run.
  watchPathIgnorePatterns: ["<rootDir>/test-report.json"],
};
