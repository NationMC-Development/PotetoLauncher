const builder = require('electron-builder')
const Platform = builder.Platform

function getCurrentPlatform(){
    switch(process.platform){
        case 'win32':
            return Platform.WINDOWS
        case 'darwin':
            return Platform.MAC
        case 'linux':
            return Platform.linux
        default:
            console.error('Cannot resolve current platform!')
            return undefined
    }
}

builder.build({
    targets: (process.argv[2] != null && Platform[process.argv[2]] != null ? Platform[process.argv[2]] : getCurrentPlatform()).createTarget(),
    config: {
        appId: 'potetolauncher',
        productName: 'PotetoLauncher',
        artifactName: '${productName}-setup-${version}.${ext}',
        copyright: 'Copyright © 2018-2020 Daniel Scalzi, 2020 Kamesuta',
        directories: {
            buildResources: 'build',
            output: 'dist'
        },
        win: {
            target: [
                {
                    target: 'nsis',
                    arch: 'x64'
                }
            ]
        },
        nsis: {
            oneClick: false,
            perMachine: false,
            allowElevation: true,
            allowToChangeInstallationDirectory: true
        },
        mac: {
            target: 'dmg',
            category: 'public.app-category.games'
        },
        linux: {
            target: 'AppImage',
            maintainer: 'Daniel Scalzi, mumeinosato',
            vendor: 'Daniel Scalzi, mumeinosato',
            synopsis: 'ぽてとランチャー',
            description: 'ぽてさん神',
            category: 'Game'
        },
        compression: 'maximum',
        files: [
            '!{dist,.gitignore,.vscode,docs,dev-app-update.yml,.travis.yml,.nvmrc,.eslintrc.json,build.js,numa_skins.json,skinSetting.json}'
        ],
        extraResources: [
            'libraries'
        ],
        asar: true
    }
}).then(() => {
    console.log('Build complete!')
}).catch(err => {
    console.error('Error during build!', err)
})