import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js}'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        wx: true,
        App: true,
        Page: true,
        getCurrentPages: true,
        getApp: true,
        Component: true,
        requirePlugin: true,
        requireMiniProgram: true,
      },
    },
    ignores: [
      'node_modules',
      'miniprogram_npm',
      'components/mp-weixin',
      'utils/lodash.mini.js',
      'utils/lodash.fix.js',
      'switch-env.js',
    ],
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
];
