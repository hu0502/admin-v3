import { viewGenerator } from './auto-templates/view/prompt.js'
import { apiGenerator } from './auto-templates/api/prompt.js'
// import { viewActionType } from './auto-templates/view/actionType.js'

export default function(/** @type {import('plop').NodePlopAPI} */ plop) {
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('api', apiGenerator)

};