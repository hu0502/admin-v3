import { notEmpty } from '../utils/utils.js'

export const componentGenerator = {
    description: 'generate vue component',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'component name please',
            validate: notEmpty('name')
        }
    ],
    actions: data => {
        const name = '{{pathCase name}}';
        const actions = [
            {
                type: 'add',
                path: `src/components/${name}.vue`,
                templateFile: 'auto-templates/components/index.hbs',
                data: {
                    name: name
                },
            },
        ];
        return actions;
    },

};

