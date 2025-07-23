import { Page } from '@playwright/test'
import { NewUser } from '../fixtures/NewUser'

export function getSignUpPage(page: Page) {
    return {
        open: async () => {
            await page.goto('http://localhost:3000/cadastro')
        },
        submit: async (user: NewUser) => {
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
                .fill(user.password)

            await page
                .getByRole('button', { name: 'Criar conta' })
                .click()
        }
    }
}