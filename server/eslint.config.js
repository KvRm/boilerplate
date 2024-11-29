// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  rules: {
    'no-console': 'warn',
    'n/prefer-global/process': 'off',
  },
})
