import * as http from 'node:http';
import router from './src/router.js';
import defaultHandler from './src/defaultHandler.js';
import helpers from './src/helpers.js';
import { safeJSON } from './src/utils.js';

const processedContentTypes = {
    'text/html': (text) => text,
    'text/plain': (text) => text,
    'application/json': (json) => safeJSON(json, {}),
    'application/x-www-form-urlencoded': (data) => Object.fromEntries(new URLSearchParams(data)),
};

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || '/', `https://${req.headers.host}`);
    const routeModule = router.get(url.pathname) ?? {};
    const handler = routeModule[req?.method] ?? defaultHandler;
    let payload = {};
    let rawRequest = '';
    for await (const chunk of req) {
        rawRequest += chunk;
    }
    if (req.headers['content-type']) {
        const contentType = req.headers['content-type'].split(';')[0];
        if (processedContentTypes[contentType]) {
            payload = processedContentTypes[contentType](rawRequest);
        }
    }
    try {
        handler(req, Object.assign(res, helpers), url, payload, rawRequest);
    } catch (err) {
        res.statusCode = 500;
        res.end('internal error');
    }
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(process.env.PORT || 8080);

process.on('SIGINT', () => {
    server.close((error) => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
    });
});