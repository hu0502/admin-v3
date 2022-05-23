import { notEmpty } from '../utils/utils.js'
export const apiGenerator = {
    description: 'generate vue API',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'api name please',
            validate: notEmpty('name')
        }
    ],
    actions: data => {
        const name = '{{pathCase name}}';
        const actions = [
            {
                type: 'add',
                path: `src/http/api/${name}.api.ts`,
                templateFile: 'auto-templates/api/index.hbs',
                data: {
                    name: name
                }
            }
        ];
        return actions;
    }
};
