import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000', // Server URL
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loop if refresh token itself fails or login/register fails
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/login') && !originalRequest.url.includes('/auth/refresh')) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
                try {
                    // Call refresh endpoint
                    // We create a new axios instance to avoid interceptors for this specific call to prevent loops (though url check helps)
                    const response = await axios.post('http://localhost:3000/auth/refresh', { refresh_token: refreshToken });

                    const { access_token, refresh_token: newRefreshToken } = response.data;

                    localStorage.setItem('token', access_token);
                    localStorage.setItem('refreshToken', newRefreshToken);

                    // Update authorization header and retry original request
                    originalRequest.headers.Authorization = `Bearer ${access_token}`;
                    return instance(originalRequest);
                } catch (e) {
                    console.error('RefreshToken failed', e);
                    // Fall through to logout
                }
            }

            // Logout if refresh failed or no refresh token
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance;
