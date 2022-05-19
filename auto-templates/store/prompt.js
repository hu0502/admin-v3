import { notEmpty } from '../utils/utils.js'
export const storeGenerator = {
    description: 'generate vue store',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'store name please',
            validate: notEmpty('name')
        }
    ],
    actions: data => {
        const name = '{{pathCase name}}';
        const actions = [
            {
                type: 'add',
                path: `src/store/${name}.ts`,
                templateFile: 'auto-templates/store/index.hbs',
                data: {
                    name: name
                }
            }
        ];
        return actions;
    }
};
