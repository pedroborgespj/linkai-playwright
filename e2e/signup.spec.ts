import { test, expect } from '@playwright/test'

import { getSignUpPage } from '../support/pages/SignupPage'
import { getDashPage } from '../support/pages/DashPage'
import { getToast } from '../support/pages/components/Toast'

import { getNewUser, User } from '../support/fixtures/User'

test('deve realizar o cadastro com sucesso', async ({ page }) => {

    const signUpPage = getSignUpPage(page)
    const dashPage = getDashPage(page)
    const toast = getToast(page)

    const user: User = getNewUser()

    await signUpPage.open()
    await signUpPage.fill(user)
    await signUpPage.submit()

    await expect(dashPage.welcome()).toContainText(`Olá, ${user.name}!`)
    await expect(toast.element()).toContainText('Conta criada com sucesso!')

})

test('deve exibir erro ao tentar cadastrar com campos obrigatórios em branco', async ({ page }) => {
    
    const signUpPage = getSignUpPage(page)
    const toast = getToast(page)

    await signUpPage.open()
    await signUpPage.submit()

    await expect(toast.element())
        .toContainText('Por favor, preencha todos os campos.')

})

// test('deve validar o formato inválido de email', async ({ page }) => {



// })

// test('deve exibir erro quando a confirmação de senha for diferente da senha', async ({ page }) => {



// })
