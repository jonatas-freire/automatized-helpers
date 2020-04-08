const left = (error) => ({
    map: (_) => error,
    matchWith: (pattern) => pattern.left(error)
})

const right = (value) => ({
    map: (f) => right(f(value)),
    matchWith: (pattern) => pattern.right(value)
})

const Try = (fn) => {
    try {
        return right(fn())
    } catch (e) {
        return left(e)
    }
}

module.exports = Try