import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from '@/plugins/axios';
import router from '@/router';
import { useUsersStore } from '@/stores/users';
import { ability } from '@/plugins/ability';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';

interface User {
    id: number;
    email: string;
    name: string;
    role: 'ADMIN' | 'USER';
    status: string;
    language?: string;
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));
    const token = ref<string | null>(localStorage.getItem('token') || null);
    const refreshToken = ref<string | null>(localStorage.getItem('refreshToken') || null);
    const error = ref<string | null>(null);
    const loading = ref(false);

    const isAuthenticated = computed(() => !!token.value);
    const isAdmin = computed(() => user.value?.role === 'ADMIN');

    function updateAbility(user: User | null) {
        const { can, rules } = new AbilityBuilder(createMongoAbility);

        if (user?.role === 'ADMIN') {
            can('manage', 'all');
        } else {
            can('read', 'User');
        }

        ability.update(rules);
    }

    if (user.value) {
        updateAbility(user.value);
        // Set language if user has preference
        // Initial language setting is handled by App.vue or main.ts watching user state, 
        // or by the components themselves. Store just holds the data.
    }

    async function login(email: string, password: string) {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.post('/auth/login', { email, password });
            const { access_token, refresh_token, user: userData } = response.data;

            token.value = access_token;
            refreshToken.value = refresh_token;
            user.value = userData;

            localStorage.setItem('token', access_token);
            localStorage.setItem('refreshToken', refresh_token);
            localStorage.setItem('user', JSON.stringify(userData));

            updateAbility(userData);

            await router.push('/users');
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Login failed';
            console.error(err);
        } finally {
            loading.value = false;
        }
    }

    async function register(name: string, email: string, password: string) {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.post('/auth/register', { name, email, password });
            const { access_token, refresh_token, user: userData } = response.data;

            token.value = access_token;
            refreshToken.value = refresh_token;
            user.value = userData;

            localStorage.setItem('token', access_token);
            localStorage.setItem('refreshToken', refresh_token);
            localStorage.setItem('user', JSON.stringify(userData));

            updateAbility(userData);

            await router.push('/users');
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Registration failed';
            console.error(err);
        } finally {
            loading.value = false;
        }
    }

    async function logout() {
        try {
            await axios.post('/auth/logout');
        } catch (e) {
            console.error('Logout failed on server', e);
        }

        token.value = null;
        refreshToken.value = null;
        user.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        // Reset users store state
        const usersStore = useUsersStore();
        usersStore.users = [];
        usersStore.error = null;

        updateAbility(null);

        router.push('/login');
    }

    async function updateLanguage(language: string) {
        if (!user.value) return;

        // Optimistic update
        user.value.language = language;
        localStorage.setItem('user', JSON.stringify(user.value));

        try {
            await axios.patch(`/users/${user.value.id}`, { language });
        } catch (e) {
            console.error('Failed to persist language preference', e);
            // Revert on failure? Or just log warn.
        }
    }

    return {
        user,
        token,
        refreshToken,
        error,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        updateLanguage
    };
});
