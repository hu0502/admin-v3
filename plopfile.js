import { viewGenerator } from './auto-templates/view/prompt.js'
import { apiGenerator } from './auto-templates/api/prompt.js'
import { storeGenerator } from './auto-templates/store/prompt.js'
import { componentGenerator } from './auto-templates/components/prompt.js' 

export default function(/** @type {import('plop').NodePlopAPI} */ plop) {
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('api', apiGenerator)
  plop.setGenerator('store', storeGenerator)
  plop.setGenerator('components', componentGenerator)
};