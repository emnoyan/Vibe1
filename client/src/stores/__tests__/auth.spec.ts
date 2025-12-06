import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../auth'
import axios from '@/plugins/axios'

vi.mock('@/plugins/axios')

describe('Auth Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
    })

    it('login sets user and token', async () => {
        const store = useAuthStore()
        const mockUser = { id: 1, email: 'test@test.com', name: 'Test', role: 'USER' }
        const mockToken = 'fake-token'

        // Mock axios post
        const authData = { user: mockUser, access_token: mockToken }
            ; (axios.post as any).mockResolvedValue({ data: authData })

        await store.login('test@test.com', 'password')

        expect(store.user).toEqual(mockUser)
        expect(store.token).toBe(mockToken)
        expect(localStorage.getItem('token')).toBe(mockToken)
    })

    it('logout clears state', () => {
        const store = useAuthStore()
        store.user = { id: 1 } as any
        store.token = 'token'
        localStorage.setItem('token', 'token')

        store.logout()

        expect(store.user).toBeNull()
        expect(store.token).toBeNull()
        expect(localStorage.getItem('token')).toBeNull()
    })
})
