module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'configs/tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testMatch: ['**/(lib|tests)/**/*.spec.(ts|js)'],
  testEnvironment: 'node',
};
