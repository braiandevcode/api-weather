import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']},
  {
    languageOptions: { 
    globals: globals.browser,
   },
   settings: {
    react: {
      version: 'detect' // Detecta automáticamente la versión de React
    }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules:{
      'react/react-in-jsx-scope': 'off', // Desactiva la regla que requiere que 'React' esté en el alcance cuando se usa JSX.
      'quotes': ['error', 'single'], // Forzar comillas simples
      'semi': ['error', 'always']    // Forzar punto y coma al final de las declaraciones
    }
  }
];