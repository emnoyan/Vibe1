import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import { isAxiosError } from 'axios'

export interface User {
    id: number;
    email: string;
    name: string | null;
    role: 'ADMIN' | 'USER' | 'MOD';
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: string;
    managedCategories?: { id: number; name: string; slug: string }[];
}

export interface CreateUserDto {
    email: string;
    name: string;
    password: string;
    role?: string;
    status?: string;
    managedCategoryIds?: number[];
}

export interface UserQueryParams {
    q?: string
    role?: string
    status?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

export interface UserStats {
    total: number
    active: number
    inactive: number
    admin: number
    user: number
}

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [] as User[],
        stats: null as UserStats | null,
        loading: false,
        fetching: false,
        error: null as string | null,
    }),
    actions: {
        async fetchUsers(params?: UserQueryParams) {
            this.fetching = true
            this.error = null
            try {
                const response = await axios.get<User[]>('http://localhost:3000/users', { params })
                this.users = response.data
            } catch (err: any) {
                if (isAxiosError(err)) {
                    this.error = err.response?.data?.message || err.message
                } else if (err instanceof Error) {
                    this.error = err.message
                } else {
                    this.error = 'An unknown error occurred'
                }
            } finally {
                this.fetching = false
            }
        },

        async fetchStats() {
            try {
                const response = await axios.get<UserStats>('http://localhost:3000/users/stats')
                this.stats = response.data
            } catch (err) {
                // Silectly fail for stats or log it
                console.error('Failed to fetch stats', err)
            }
        },

        async createUser(user: CreateUserDto) {
            this.loading = true
            this.error = null
            try {
                const response = await axios.post<User>('http://localhost:3000/users', user)
                this.users.push(response.data)
            } catch (err: any) {
                if (isAxiosError(err)) {
                    this.error = err.response?.data?.message || err.message
                } else if (err instanceof Error) {
                    this.error = err.message
                } else {
                    this.error = 'An unknown error occurred'
                }
                throw err
            } finally {
                this.loading = false
            }
        },

        async updateUser(id: number, userData: Partial<CreateUserDto>) {
            this.loading = true
            this.error = null
            try {
                const response = await axios.patch<User>(`http://localhost:3000/users/${id}`, userData)
                const index = this.users.findIndex(u => u.id === id)
                if (index !== -1) {
                    this.users[index] = response.data
                }
            } catch (err: any) {
                if (isAxiosError(err)) {
                    this.error = err.response?.data?.message || err.message
                } else if (err instanceof Error) {
                    this.error = err.message
                } else {
                    this.error = 'An unknown error occurred'
                }
                throw err
            } finally {
                this.loading = false
            }
        },

        async deleteUser(id: number) {
            this.loading = true
            this.error = null
            try {
                await axios.delete(`http://localhost:3000/users/${id}`)
                this.users = this.users.filter(u => u.id !== id)
            } catch (err: any) {
                if (isAxiosError(err)) {
                    this.error = err.response?.data?.message || err.message
                } else if (err instanceof Error) {
                    this.error = err.message
                } else {
                    this.error = 'An unknown error occurred'
                }
                throw err
            } finally {
                this.loading = false
            }
        },

        async bulkDeleteUsers(ids: number[]) {
            this.loading = true
            this.error = null
            try {
                await axios.post('http://localhost:3000/users/bulk-delete', { ids })
                this.users = this.users.filter(u => !ids.includes(u.id))
            } catch (err: any) {
                if (isAxiosError(err)) {
                    this.error = err.response?.data?.message || err.message
                } else if (err instanceof Error) {
                    this.error = err.message
                } else {
                    this.error = 'An unknown error occurred'
                }
                throw err
            } finally {
                this.loading = false
            }
        },
    },
})
