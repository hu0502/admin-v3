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
        },
        // {
        //     type: 'list',
        //     name: 'sendRequest',
        //     message: 'Whether to create a server application',
        //     choices: [
        //       {
        //         name: 'Create vue modules(Create a server app at the same time)',
        //         value: true
        //       },
        //       {
        //         name: 'Create vue modules(Don\'t create a server app)',
        //         value: false
        //       }
        //     ]
        // },
    ],
    actions: data => {
        const properCaseName = '{{properCase name}}';
        const lowerCaseName = '{{lowerCase name}}';
        const pathCaseName = '{{pathCase name}}';
        let actions = [
            {
                type: 'add',
                path: `src/views/${pathCaseName}.vue`,
                templateFile: 'auto-templates/view/index.hbs',
                data: {
                    name: pathCaseName
                }
            },
            // {
            //     type: 'add',
            //     path: `src/http/api/${pathCaseName}.api.ts`,
            //     templateFile: 'auto-templates/api/index.hbs',
            //     data: {
            //         name: pathCaseName
            //     }
            // },
            // {
            //     type: 'add',
            //     path: `src/store/${pathCaseName}.ts`,
            //     templateFile: 'auto-templates/store/index.hbs',
            //     data: {
            //         name: pathCaseName
            //     }
            // },
        ];
        // if(data.sendRequest){
        //     actions.push(connect(data.name))
        // }
        return actions;
    },
};

