const { writeFile, readFile } = require('../helpers/filesystem')
const Try = require('../helpers/try')
const Pipe = require('../helpers/pipe')

const getVersions = ({ version }) =>
    version.split('.').map((v) => Number(v))

const updateVersion = (versions, condition) =>
    versions.map((version, index) => condition(index) ? version + 1 : version).join('.')

const update = (versions) => ({
    major: () => updateVersion(versions, (x) => x == 0),
    minor: () => updateVersion(versions, (x) => x == 1),
    patch: () => updateVersion(versions, (x) => x == 2),
})

const updatePackage = () => {
    const whichUpdate = process.argv.pop()

    console.log("Lendo o package JSON...")
    const package = Pipe(readFile, JSON.parse)('./package.json')

    console.log(`Atualizando a versão do ${whichUpdate}`)
    const newVersion = Pipe(getVersions, update)(package)[whichUpdate]()

    console.log(`Nova versão: ${newVersion}`)
    package.version = newVersion

    console.log(`Atualizando package JSON...`)
    const rewritterPackage = writeFile.bind(null, './package.json')
    Pipe(JSON.stringify, rewritterPackage)(package)
}

(() =>
    Try(updatePackage)
        .matchWith({
            right: (_) => console.log(`Atualização finalizada!`),
            left: (e) => console.log(`Ops! Houve um erro no processo ${e}`)
        })
)()