const fs = require('fs')


const writeFile = (path, data) =>
    fs.writeFileSync(path, data)

const readFile = (path) =>
    fs.readFileSync(path)


module.exports = { writeFile, readFile }