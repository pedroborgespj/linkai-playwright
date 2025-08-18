import { expect, Page } from '@playwright/test'
import { User } from '../fixtures/User'

export function getAuthActions(page: Page) {

    const emailField = () => {
        return page
            .getByRole('textbox', { name: 'Seu melhor e-mail para receber novidades!' })
    }

    return {
        navigateToLogin: async () => {
            await page.goto('http://localhost:3000/login')
        },
        navigateToSignup: async () => {
            await page.goto('http://localhost:3000/cadastro')
        },
        doLogin: async (user: User) => {
            await page
                .getByRole('textbox', { name: 'Seu @username incrível' })
                .fill(user.username)

            await page
                .getByRole('textbox', { name: 'Digite sua senha secreta' })
                .fill(user.password)

            await page
                .getByRole('button', { name: 'Entrar' })
                .click()
        },
        verifyUserLogin: async (user: User) => {
            const title = page.locator('h1')
            await expect(title).toContainText(`Olá, ${user.name}!`)
        },
        fillSignupForm: async (user: User) => {
            await page
                .getByRole('textbox', { name: 'Como você gostaria de ser chamado?' })
                .fill(user.name)

            await page
                .getByRole('textbox', { name: 'Escolha um @username único' })
                .fill(user.username)

            await emailField().fill(user.email)

            await page
                .getByRole('textbox', { name: 'Crie uma senha secreta e segura' })
                .fill(user.password)

            await page
                .getByRole('textbox', { name: 'Repita sua senha para garantir!' })
                .fill(user.confirmPassword)
        },
        submitSignupForm: async () => {
            await page
                .getByRole('button', { name: 'Criar conta' })
                .click()
        },
        validateEmailFieldType: async () => {
            await expect(emailField()).toHaveAttribute('type', 'email')
        }
    }
}