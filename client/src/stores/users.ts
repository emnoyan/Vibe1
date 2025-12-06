import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import { isAxiosError } from 'axios'

export interface User {
    id: number
    email: string
    name: string | null
    role: string
    status: string
    createdAt: string
    updatedAt: string
}

export interface CreateUserDto {
    email: string
    name: string
    password: string
}

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [] as User[],
        loading: false,
        fetching: false,
        error: null as string | null,
    }),
    actions: {
        async fetchUsers() {
            this.fetching = true
            this.error = null
            try {
                const response = await axios.get<User[]>('http://localhost:3000/users')
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
    },
})
