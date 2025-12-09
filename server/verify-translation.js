const axios = require('axios');

async function verify() {
    console.log('Attempting to delete invoice ID 2 (PAID) with vi locale...');

    try {
        await axios.delete('http://localhost:3000/invoices/2', {
            headers: {
                'Accept-Language': 'vi'
            }
        });
        console.log('Unexpected success! Should have failed.');
    } catch (e) {
        if (e.response) {
            console.log('Response status:', e.response.status);
            console.log('Response data:', JSON.stringify(e.response.data, null, 2));
        } else {
            console.error('Error:', e.message);
        }
    }
}

verify();
