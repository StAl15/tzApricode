const path = require(`path`);

module.exports = {
    webpack: {
        alias: {
            "@components": path.resolve(__dirname, "src/components"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@API": path.resolve(__dirname, "src/API"),
            "@models": path.resolve(__dirname, "src/models"),
            "@store": path.resolve(__dirname, "src/store"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@pages": path.resolve(__dirname, "src/pages"),
        },
    },
};