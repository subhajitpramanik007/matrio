/** @type {import('ts-jest').JestConfigWithTsJest} **/
import { createRequire } from 'module'
import { pathsToModuleNameMapper } from 'ts-jest'

const require = createRequire(import.meta.url)
const { compilerOptions } = require('./tsconfig.json')

export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths, {
            prefix: '<rootDir>/',
        }),
        '^(\\.{1,2}/.*)\\.js$': '$1',
        // '^(\\.{1,2}/.*)\\.ts$': '$1',
    },
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                useESM: true,
                // tsconfig: {
                //     module: 'NodeNext',
                //     target: 'ES2020',
                // },
            },
        ],
    },
    testTimeout: 10000,
    testMatch: ['**/tests/**/*.test.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}
