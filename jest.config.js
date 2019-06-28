module.exports = {
  testEnvironment: 'node',
  verbose: true,
  roots: ['tests'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: [
    '**/tests/**/*.js',
    '**/?(*.)+(test).js',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
