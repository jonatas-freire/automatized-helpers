const pipe = (...fns) => (params) =>
    fns.reduce((param, fn) => fn(param), params)

module.exports = pipe