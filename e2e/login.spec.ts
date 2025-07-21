import { test, expect } from '@playwright/test'

import { getLoginPage } from '../support/pages/LoginPage'
import { getDashPage } from '../support/pages/DashPage'
import { getToast } from '../support/pages/components/Toast'

interface User {
    name: string
    username: string
    password: string
}

test('deve logar com sucesso', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const dashPage = getDashPage(page)
    const toast = getToast(page)

    const user = {
        name: 'Beth',
        username: 'beth',
        password: 'pwd123'
    }

    await loginPage.open()

    await loginPage.submit(user.username, user.password)

    await expect(dashPage.welcome()).toContainText(`Olá, ${user.name}!`)
    await expect(toast.element()).toContainText('Login realizado com sucesso!')

})

test('nao deve logar com senha incorreta', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user = {
        name: 'Beth',
        username: 'beth',
        password: '123456'
    }

    await loginPage.open()

    await loginPage.submit(user.username, user.password)

    await expect(toast.element())
        .toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')

})

test('nao deve logar com usuario não cadastrado', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user = {
        name: 'Beth',
        username: 'not-found',
        password: 'pwd123'
    }

    await loginPage.open()

    await loginPage.submit(user.username, user.password)

    await expect(toast.element())
        .toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')

})

test('nao deve logar com usuario não informo nenhum dos campos', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user = {
        name: 'Beth',
        username: '',
        password: ''
    }

    await loginPage.open()

    await loginPage.submit(user.username, user.password)

    await expect(toast.element())
        .toContainText('Por favor, preencha todos os campos.')

})

test('nao deve logar com usuario não informo o usuário', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user = {
        name: 'Beth',
        username: '',
        password: 'pwd123'
    }

    await loginPage.open()

    await loginPage.submit(user.username, user.password)

    await expect(toast.element())
        .toContainText('Por favor, preencha todos os campos.')

})

test('nao deve logar com usuario não informo a senha', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user = {
        name: 'Beth',
        username: 'beth',
        password: ''
    }

    await loginPage.open()

    await loginPage.submit(user.username, user.password)

    await expect(toast.element())
        .toContainText('Por favor, preencha todos os campos.')

})