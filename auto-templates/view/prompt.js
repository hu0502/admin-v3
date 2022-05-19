import { notEmpty } from '../utils/utils.js'
import { apiTest } from '../common.api.js';

const connect = (param) => (answers) =>
    new Promise((resolve, reject) => {
        apiTest({ name: param }).then((res) => {
            if (res.code === 200) {
                resolve(res.code)
            } else {
                reject(JSON.stringify(res))
            }
        }).catch((err) => {
            throw err;
        });
    })


export const viewGenerator = {
    description: 'Create Vue modules, including template, api, store',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'template name please',
            validate: notEmpty('name')
        }
    ],
    actions: data => {
        const pathCaseName = '{{pathCase name}}';
        const lowerCaseName = '{{lowerCase name}}';

        const actions = [
            connect(data.name),
            {
                type: 'add',
                path: `src/views/${pathCaseName}.vue`,
                templateFile: 'auto-templates/view/index.hbs',
                data: {
                    name: pathCaseName
                }
            },
            {
                type: 'add',
                path: `src/http/api/${lowerCaseName}.api.ts`,
                templateFile: 'auto-templates/api/index.hbs',
                data: {
                    name: lowerCaseName
                }
            },
            {
                type: 'add',
                path: `src/store/${lowerCaseName}.ts`,
                templateFile: 'auto-templates/store/index.hbs',
                data: {
                    name: lowerCaseName
                }
            },
        ];
        return actions;
    },
};

