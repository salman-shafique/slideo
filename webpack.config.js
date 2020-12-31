var Encore = require('@symfony/webpack-encore');
const path = require('path');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addEntry('app', './assets/js/app.js')
    .addEntry('editor', './assets/editor/index.js')
    .addEntry('editor_pre', './assets/editor/indexPre.js')
    .addEntry('editor_download', './assets/editor/js/download/index.js')
    .addEntry('pricing', './assets/pricing/index.js')
    .addEntry('user_account', './assets/account/index.js')
    .splitEntryChunks()
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })
    .addAliases({
        JS: path.resolve(__dirname, 'assets/js'),
        CSS: path.resolve(__dirname, 'assets/css'),
        Editor: path.resolve(__dirname, 'assets/editor'),
    })
    .enableReactPreset()
    .autoProvidejQuery();

module.exports = Encore.getWebpackConfig();
