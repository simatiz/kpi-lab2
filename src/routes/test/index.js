function GET(req, res) {
    res.join({name:`OK`});
}

function POST(req, res, payload) {
    res.json({name: "root handlerOptions"})
}

function OPTIONS(req, res, payload){
    res.json(payload)
}

export {GET, POST, OPTIONS}
