import { compilerOptions } from './tsconfig.json';
import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
  transformIgnorePatterns: [
    "/node_modules/(?!next-auth|@auth/core|oauth4webapi)"
  ],
};

export default config;
