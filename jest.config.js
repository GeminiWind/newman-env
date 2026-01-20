module.exports = {
  testEnvironment: 'node',
  verbose: true,
  roots: ['tests'],
  collectCoverageFrom: [
    'src/**/*.ts',
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
    '**/tests/**/*.ts',
    '**/?(*.)+(test).ts',
  ],
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
