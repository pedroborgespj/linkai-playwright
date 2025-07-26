import { Page } from '@playwright/test'
import { UserSignup } from '../fixtures/User'

export function getSignUpPage(page: Page) {
    return {
        open: async () => {
            await page.goto('http://localhost:3000/cadastro')
        },
        fill: async (user: UserSignup) => {
            await page
                .getByRole('textbox', { name: 'Como você gostaria de ser chamado?' })
                .fill(user.name)

            await page
                .getByRole('textbox', { name: 'Escolha um @username único' })
                .fill(user.username)

            await page
                .getByRole('textbox', { name: 'Seu melhor e-mail para receber novidades!' })
                .fill(user.email)

            await page
                .getByRole('textbox', { name: 'Crie uma senha secreta e segura' })
                .fill(user.password)

            await page
                .getByRole('textbox', { name: 'Repita sua senha para garantir!' })
                .fill(user.confirmPassword)
        },
        submit: async () => {
            await page
                .getByRole('button', { name: 'Criar conta' })
                .click()
        }
    }
}