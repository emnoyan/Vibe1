import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Header from '../Header.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '@/stores/auth'

const { mockRouterPush } = vi.hoisted(() => {
    return { mockRouterPush: vi.fn() }
})

vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockRouterPush
    }),
    createRouter: () => ({
        push: mockRouterPush,
        beforeEach: vi.fn()
    }),
    createWebHistory: vi.fn()
}))

describe('Header', () => {
    it('renders user name and logout button', () => {
        const wrapper = mount(Header, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vi.fn,
                    initialState: {
                        auth: {
                            user: { name: 'Test User', role: 'ADMIN' },
                            token: 'token'
                        }
                    }
                })]
            }
        })
        expect(wrapper.text()).toContain('Test User (ADMIN)')
        expect(wrapper.text()).toContain('Logout')
    })

    it('calls logout and redirects', async () => {
        const wrapper = mount(Header, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vi.fn,
                    initialState: {
                        auth: { user: { name: 'Test', role: 'USER' } }
                    },
                    stubActions: false
                })]
            }
        })

        const authStore = useAuthStore()
        authStore.logout = vi.fn()

        await wrapper.find('button').trigger('click')

        expect(authStore.logout).toHaveBeenCalled()
        expect(mockRouterPush).toHaveBeenCalledWith('/login')
    })
})
