async function reproduce() {
    try {
        // 1. Login to get token
        console.log('Logging in...');
        const loginRes = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@example.com',
                password: 'password123'
            })
        });

        if (!loginRes.ok) throw new Error(`Login failed: ${loginRes.status} ${loginRes.statusText}`);

        const { access_token, user } = await loginRes.json();
        console.log('Login successful. User ID:', user.id);

        // 2. Attempt to update language
        console.log('Updating language...');
        const updateRes = await fetch(`http://localhost:3000/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ language: 'vi' })
        });

        if (!updateRes.ok) {
            const errText = await updateRes.text();
            throw new Error(`Update failed: ${updateRes.status} ${errText}`);
        }

        const updatedUser = await updateRes.json();
        console.log('Update successful:', updatedUser);

    } catch (error) {
        console.error('Error reproducing issue:', error.message);
    }
}

reproduce();
