const path = require('path');

const resolvePath = p => path.resolve(__dirname, p);

module.exports = {
    webpack: {
        alias: {
            '@src': resolvePath('./src'),
            '@components': resolvePath('./src/components'),
            '@parts': resolvePath('./src/parts'),
            '@pages': resolvePath('./src/pages'),
            '@vars': resolvePath('./src/common'),
            '@util': resolvePath('./src/util'),
            '@uikit': resolvePath('./src/uikit'),
            '@admin-lib': resolvePath('./src/admin-lib'),
            '@hooks': resolvePath('./src/hooks'),
        }
    },
};
