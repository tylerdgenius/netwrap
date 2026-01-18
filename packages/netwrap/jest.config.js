// jest.config.js

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleNameMapper: {
    // Add any custom module mappings if needed
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "<rootDir>/test/setupTests.ts",
  ],
  // transform: {
  //   "^.+\\.(t|j)sx?$": "ts-jest",
  // },
};
