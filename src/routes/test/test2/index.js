function GET(req, res) {
    throw "unhandled error2";
    res.json({name: 'test handlerGet'})
}

function PURGE(req, res) {
    res.json({name: 'test handlerOptions'})
}

export {GET, PURGE}
