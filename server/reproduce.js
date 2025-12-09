const http = require('http');

function request(method, path, body, headers = {}) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
        });

        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function verify() {
    try {
        console.log('Creating PAID invoice...');
        const createRes = await request('POST', '/invoices', {
            customerName: 'Test VI',
            customerEmail: 'test@vi.com',
            status: 'PAID',
            invoiceNumber: 'TEST-' + Date.now(),
            invoiceDate: new Date().toISOString(),
            items: [{ description: 'Item 1', quantity: 1, price: 100 }]
        });

        console.log('Create Response:', createRes.statusCode);
        const invoice = JSON.parse(createRes.body);
        if (!invoice.id) throw new Error('Failed to create invoice');

        console.log(`Deleting Invoice ${invoice.id} with Accept-Language: vi`);
        const deleteRes = await request('DELETE', `/invoices/${invoice.id}`, null, {
            'Accept-Language': 'vi'
        });

        console.log(`Delete Status: ${deleteRes.statusCode}`);
        console.log(`Delete Body: ${deleteRes.body}`);

    } catch (e) {
        console.error('Error:', e);
    }
}

verify();
