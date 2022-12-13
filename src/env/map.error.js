import { SourceMapConsumer } from 'source-map'

let consumer = null

const getConsumer = function () {
    if (consumer == null) consumer = new SourceMapConsumer(require("main.js.map"))
    return consumer
}

const cache = {}

const sourceMappedStackTrace = function (error) {
    const stack = error instanceof Error ? error.stack : error
    if (cache.hasOwnProperty(stack)) return cache[stack]

    const re = /^\s+at\s+(.+?\s+)?\(?([0-z._\-\\\/]+):(\d+):(\d+)\)?$/gm
    let match
    let outStack = error.toString()
    console.log("ErrorMapper -> sourceMappedStackTrace -> outStack", outStack)

    while ((match = re.exec(stack))) {
        if (match[2] !== "main") break

        const pos = getConsumer().originalPositionFor({
            column: parseInt(match[4], 10),
            line: parseInt(match[3], 10)
        })

        if (!pos.line) break

        if (pos.name) outStack += `\n    at ${pos.name} (${pos.source}:${pos.line}:${pos.column})`
        else {
            if (match[1]) outStack += `\n    at ${match[1]} (${pos.source}:${pos.line}:${pos.column})`
            else outStack += `\n    at ${pos.source}:${pos.line}:${pos.column}`
        }
    }

    cache[stack] = outStack
    return outStack
}


export const errorMapper = function (next) {
    return () => {
        try {
            next()
        }
        catch (e) {
            if (e instanceof Error) {
                const errorMessage = Game.rooms.sim ?
                    `Original stack tracer : <br>${_.escape(e.stack)}` :
                    `${_.escape(sourceMappedStackTrace(e))}`

                console.log(`<text style="color:#ef9a9a">${errorMessage}</text>`)
            }
            else throw e
        }
    }
}