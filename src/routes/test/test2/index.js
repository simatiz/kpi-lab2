function GET(req, res) {
    try {
        throw new Error("unhandled error");
        res.json({name: 'test handlerGet'})
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
}

function PURGE(req, res) {
    res.json({name: 'test handlerOptions'})
}

export {GET, PURGE}
