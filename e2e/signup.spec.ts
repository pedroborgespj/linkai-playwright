import { test, expect } from '@playwright/test'

import { getToast } from '../support/actions/components/Toast'
import { getAuthActions } from '../support/actions/auth'

import { removeUserByEmail, insertUser, removeUserByUsername } from '../support/database'

import { getNewUser, User, getDuplicateUser } from '../support/fixtures/User'

test('deve realizar o cadastro com sucesso', async ({ page }) => {

    const auth = getAuthActions(page)
    const toast = getToast(page)

    const user: User = getNewUser()
    await removeUserByEmail(user.email)

    await auth.navigateToSignup()
    await auth.fillSignupForm(user)
    await auth.submitSignupForm()
    await auth.verifyUserLogin(user)

    await expect(toast.element()).toContainText('Conta criada com sucesso!')

})

test('não deve cadastrar quando o email já estiver em uso', async ({ page }) => {

    const auth = getAuthActions(page)
    const toast = getToast(page)

    const user: User = getDuplicateUser()
    await removeUserByEmail(user.email)
    await insertUser(user)

    await auth.navigateToSignup()
    await auth.fillSignupForm({...user, username: 'bruno123'})
    await auth.submitSignupForm()

    await expect(toast.element()).toContainText('Parece que esse e-mail ou nome de usuário já foi ca')

})

test('não deve cadastrar quando o username já estiver em uso', async ({ page }) => {

    const auth = getAuthActions(page)
    const toast = getToast(page)

    const user: User = getDuplicateUser()
    await removeUserByUsername(user.username)
    await insertUser(user)

    await auth.navigateToSignup()
    await auth.fillSignupForm({...user, email: 'bruno123@test.com.br'})
    await auth.submitSignupForm()

    await expect(toast.element()).toContainText('Parece que esse e-mail ou nome de usuário já foi ca')

})

test('deve exibir erro ao tentar cadastrar com campos obrigatórios em branco', async ({ page }) => {

    const auth = getAuthActions(page)
    const toast = getToast(page)

    await auth.navigateToSignup()
    await auth.submitSignupForm()

    await expect(toast.element())
        .toContainText('Por favor, preencha todos os campos.')

})

test('não deve cadastrar quando o email for incorreto', async ({ page }) => {

    const auth = getAuthActions(page)

    const user: User = getNewUser()
    user.email = 'www.teste.com.br'

    await auth.navigateToSignup()
    await auth.fillSignupForm(user)
    await auth.submitSignupForm()

    await auth.validateEmailFieldType()

})

test('deve exibir erro ao tentar cadastrar com username incorreto', async ({ page }) => {

    const auth = getAuthActions(page)
    const toast = getToast(page)

    const user: User = getNewUser()
    user.username = 'beth@test'

    await auth.navigateToSignup()
    await auth.fillSignupForm(user)
    await auth.submitSignupForm()

    await expect(toast.element())
        .toContainText('Username inválido')

})

test('deve exibir erro quando a confirmação de senha for diferente da senha', async ({ page }) => {

    const auth = getAuthActions(page)
    const toast = getToast(page)

    const user: User = getNewUser()
    user.confirmPassword = 'test123'

    await auth.navigateToSignup()
    await auth.fillSignupForm(user)
    await auth.submitSignupForm()

    await expect(toast.element())
        .toContainText('Senhas não coincidem')

})
