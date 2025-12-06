import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import UsersView from '@/views/UsersView.vue';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/RegisterView.vue'),
            meta: { guest: true },
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { guest: true },
        },
        {
            path: '/',
            redirect: '/dashboard',
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: UsersView,
            meta: { requiresAuth: true },
        },
        {
            path: '/users',
            name: 'users',
            component: UsersView,
            meta: { requiresAuth: true },
        },
    ],
});

router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const isGuest = to.matched.some((record) => record.meta.guest);

    if (requiresAuth && !authStore.isAuthenticated) {
        next('/login');
    } else if (isGuest && authStore.isAuthenticated) {
        next('/users');
    } else {
        next();
    }
});

export default router;
