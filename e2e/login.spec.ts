import { test, expect } from '@playwright/test'

import { getLoginPage } from '../support/pages/LoginPage'
import { getDashPage } from '../support/pages/DashPage'
import { getToast } from '../support/pages/components/Toast'

import { User, getLoginUser } from '../support/fixtures/User'

import { insertUser, removeUserByUsername } from '../support/database'

const user: User = getLoginUser()

test('deve logar com sucesso', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const dashPage = getDashPage(page)
    const toast = getToast(page)
    
    await removeUserByUsername(user.username)
    await insertUser(user)

    await loginPage.open()

    await loginPage.submit(user)

    await expect(dashPage.welcome()).toContainText(`Olá, ${user.name}!`)
    await expect(toast.element()).toContainText('Login realizado com sucesso!')

})

test('nao deve logar com senha incorreta', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    await loginPage.open()

    await loginPage.submit({...user, password: '123456'})

    await expect(toast.element())
        .toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')

})

test('nao deve logar com usuario não cadastrado', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    await loginPage.open()

    await loginPage.submit({...user, username: 'not-found'})

    await expect(toast.element())
        .toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')

})

test('nao deve logar quando não informo nenhum dos campos', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    await loginPage.open()

    await loginPage.submit({...user, username: '', password: ''})

    await expect(toast.element())
        .toContainText('Por favor, preencha todos os campos.')

})

test('nao deve logar quando não informo o usuário', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    await loginPage.open()

    await loginPage.submit({...user, username: ''})

    await expect(toast.element())
        .toContainText('Por favor, preencha todos os campos.')

})

test('nao deve logar quando não informo a senha', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    await loginPage.open()

    await loginPage.submit({...user, password: ''})

    await expect(toast.element())
        .toContainText('Por favor, preencha todos os campos.')

})