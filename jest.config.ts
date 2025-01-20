module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true, // Enable test coverage collection
    coverageDirectory: 'coverage', // Directory where the coverage reports are saved
    coverageProvider: 'v8',
    collectCoverageFrom: ['api/routes/*.ts'], // Specify which files to collect coverage from
};