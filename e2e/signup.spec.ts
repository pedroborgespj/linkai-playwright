import { test, expect } from '@playwright/test'

import { getSignUpPage } from '../support/pages/SignupPage'
import { getDashPage } from '../support/pages/DashPage'
import { getToast } from '../support/pages/components/Toast'

import { getNewUser, UserSignup } from '../support/fixtures/User'

test('deve realizar o cadastro com sucesso', async ({ page }) => {

    const signUpPage = getSignUpPage(page)
    const dashPage = getDashPage(page)
    const toast = getToast(page)

    const user: UserSignup = getNewUser()

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

test('não deve cadastrar quando o email for incorreto', async ({ page }) => {

    const signUpPage = getSignUpPage(page)

    const user: UserSignup = getNewUser()
    user.email = 'www.teste.com.br'

    await signUpPage.open()
    await signUpPage.fill(user)
    await signUpPage.submit()

    await signUpPage.validateEmailFieldType()

})

test('deve exibir erro ao tentar cadastrar com username incorreto', async ({ page }) => {

    const signUpPage = getSignUpPage(page)
    const toast = getToast(page)

    const user: UserSignup = getNewUser()
    user.username = 'beth@test'

    await signUpPage.open()
    await signUpPage.fill(user)
    await signUpPage.submit()

    await expect(toast.element())
        .toContainText('Username inválido')

})

test('deve exibir erro quando a confirmação de senha for diferente da senha', async ({ page }) => {

    const signUpPage = getSignUpPage(page)
    const toast = getToast(page)

    const user: UserSignup = getNewUser()
    user.confirmPassword = 'test123'

    await signUpPage.open()
    await signUpPage.fill(user)
    await signUpPage.submit()

    await expect(toast.element())
        .toContainText('Senhas não coincidem')

})
