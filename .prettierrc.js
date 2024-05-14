const config = require('@taiga-ui/prettier-config');

/** @type {import("prettier").Config} */
module.exports = {
    ...config,
    singleAttributePerLine: false,
    overrides: [
        ...config.overrides,
        {
            files: ['*.js', '*.ts'],
            options: {
                printWidth: 120,
            },
        },
    ],
};
