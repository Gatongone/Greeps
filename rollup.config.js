const clear = require('rollup-plugin-clear')
const screeps = require('rollup-plugin-screeps')
const copy = require('rollup-plugin-copy')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')

let config
// get config from target
if (!process.env.DEST) console.warn("[Warning] No target is specified, the code will be compiled but not uploaded.")
else if (!(config = require("./.secret.json")[process.env.DEST])) {
    throw new Error("[Error] Invalid target, please check if the secret.json contains the corresponding configuration.")
}

// upload or copy
const pluginDeploy = config && config.copyPath ?
    // copy to path
    copy({
        targets: [
            {
                src: 'dist/main.js',
                dest: config.copyPath
            },
            {
                src: 'dist/main.js.map',
                dest: config.copyPath,
                rename: name => name + '.map.js',
                transform: contents => `module.exports = ${contents.toString()};`
            }
        ],
        hook: 'writeBundle',
        verbose: true
    }) :
    // update .map to .map.js ,then upload
    screeps({ config, dryRun: !config })

module.exports = {
    input: 'src/main.js',
    output: {
        file: 'dist/main.js',
        format: 'cjs',
        sourcemap: true
    },
    plugins: [
        // clear last compilation 
        clear({ targets: ["dist"] }),
        resolve(),
        commonjs(),
        // upload or copy
        pluginDeploy
    ]
};