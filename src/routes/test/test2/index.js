function GET(req, res) {
    res.setHeader('content-type', 'text/plain');
    res.end(`OK2`);
}

function POST(req, res, payload) {
    res.setHeader('content-type', 'text/plain');
    res.end('POST request handled' + payload);
}

function OPTIONS(req, res){
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.end();
}

export {GET, POST, OPTIONS}
