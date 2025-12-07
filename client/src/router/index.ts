import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import UsersView from '@/views/UsersView.vue';
import LoginView from '@/views/LoginView.vue';
import BlogView from '@/views/blog/BlogView.vue';
import PostDetailView from '@/views/blog/PostDetailView.vue';
import AdminPostsView from '@/views/admin/AdminPostsView.vue';
import AdminCategoriesView from '@/views/admin/AdminCategoriesView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: BlogView,
            meta: { layout: 'PublicLayout' }
        },
        {
            path: '/post/:id',
            name: 'post-detail',
            component: PostDetailView,
            meta: { layout: 'PublicLayout' }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { guest: true, layout: 'AuthLayout' }, // Explicitly 'AuthLayout' which falls back to PublicLayout/div in App.vue if not handled, or I should map it to 'div' or 'PublicLayout'. App.vue defaults to PublicLayout.
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/RegisterView.vue'),
            meta: { guest: true, layout: 'AuthLayout' },
        },
        {
            path: '/admin',
            redirect: '/admin/dashboard',
        },
        {
            path: '/admin/dashboard',
            name: 'admin-dashboard',
            component: UsersView,
            meta: { requiresAuth: true, layout: 'AdminLayout' },
        },
        {
            path: '/admin/users',
            name: 'admin-users',
            component: UsersView,
            meta: { requiresAuth: true, layout: 'AdminLayout' },
        },
        {
            path: '/admin/posts',
            name: 'admin-posts',
            component: AdminPostsView,
            meta: { requiresAuth: true, layout: 'AdminLayout' },
        },
        {
            path: '/admin/categories',
            name: 'admin-categories',
            component: AdminCategoriesView,
            meta: { requiresAuth: true, layout: 'AdminLayout' },
        },
        {
            path: '/admin/invoices',
            name: 'admin-invoices',
            component: () => import('@/views/admin/AdminInvoicesView.vue'),
            meta: { requiresAuth: true, layout: 'AdminLayout' },
        },
        {
            path: '/admin/invoices/:id',
            name: 'admin-invoice-detail',
            component: () => import('@/views/admin/AdminInvoiceDetailView.vue'),
            meta: { requiresAuth: true, layout: 'AdminLayout' },
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
        if (authStore.user?.role === 'ADMIN') {
            next('/admin/dashboard');
        } else {
            next('/');
        }
    } else {
        next();
    }
});

export default router;
