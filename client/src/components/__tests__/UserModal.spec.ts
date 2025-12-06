import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserModal from '../UserModal.vue'

describe('UserModal', () => {
    it('renders correctly when open', () => {
        const wrapper = mount(UserModal, {
            props: {
                isOpen: true,
            }
        })
        expect(wrapper.find('h3').text()).toBe('Add New Member')
    })

    it('validates required fields', async () => {
        const wrapper = mount(UserModal, {
            props: { isOpen: true }
        })

        await wrapper.find('button.bg-indigo-600').trigger('click')

        expect(wrapper.text()).toContain('Name is required')
        expect(wrapper.text()).toContain('Email is required')
        expect(wrapper.text()).toContain('Password is required')
    })

    it('emits save event with valid data', async () => {
        const wrapper = mount(UserModal, {
            props: { isOpen: true }
        })

        await wrapper.find('input#name').setValue('Test User')
        await wrapper.find('input#email').setValue('test@example.com')
        await wrapper.find('input#password').setValue('password123')

        await wrapper.find('button.bg-indigo-600').trigger('click')

        expect(wrapper.emitted('save')).toBeTruthy()
        expect(wrapper.emitted('save')![0][0]).toMatchObject({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        })
    })
})
