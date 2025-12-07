import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Sidebar from '../Sidebar.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/dashboard', component: { template: '<div>Dashboard</div>' } },
        { path: '/users', component: { template: '<div>Users</div>' } }
    ]
})

describe('Sidebar', () => {
    it('renders navigation links', () => {
        const wrapper = mount(Sidebar, {
            global: {
                plugins: [router]
            }
        })

        expect(wrapper.text()).toContain('Dashboard')
        expect(wrapper.text()).toContain('Users')
    })
})
