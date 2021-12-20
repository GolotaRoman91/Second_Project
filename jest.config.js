/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    verbose: true,
    clearMocks: true,
    projects: [
        {
            displayName: "Browser",
            testEnvironment: "jsdom",
            rootDir: "./",
            testMatch: ["<rootDir>/__tests__/**/*.[jt]s"],
            testURL: "http://localhost",
        },
    ],
};