function GET(req, res) {
    res.setHeader('content-type', 'text/plain');
    res.end(`OK`);
}

function POST(req, res, payload) {
    res.setHeader('content-type', 'text/plain');
    res.end('POST request handled' + payload);
}

function OPTIONS(req, res){
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.end();
}

export {GET, POST, OPTIONS}
