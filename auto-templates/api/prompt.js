export const apiGenerator = {
    description: 'generate vue API',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'API name please'
        }
    ],
    actions: data => {
        const name = '{{properCase name}}';
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
