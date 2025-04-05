/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testMatch: ["<rootDir>/src/test/**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
