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
    });


export const viewGenerator = {
    description: 'generate vue template',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'template name please',
            validate: notEmpty('name')
        }
    ],
    actions: data => {
        const name = '{{properCase name}}';
        const actions = [
            {
                type: 'add',
                path: `src/views/${name}View/${name}.vue`,
                templateFile: 'auto-templates/view/index.hbs',
                data: {
                    name: name
                }
            },
            {
                type: 'add',
                path: `src/http/api/${name}/${name}.api.ts`,
                templateFile: 'auto-templates/api/index.hbs',
                data: {
                    name: name
                }
            },
            connect(data.name),
        ];
        return actions;
    },
};

