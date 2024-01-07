function GET(req, res) {
    throw "unhandled error1";
    res.json({name: 'test handlerGet'})
}

function PURGE(req, res) {
    res.json({name: 'test handlerOptions'})
}

export {GET, PURGE}
