import { test } from '@playwright/test'

import { getToast } from '../support/actions/components/Toast'
import { getAuthActions } from '../support/actions/auth'

import { User, getLoginUser } from '../support/fixtures/User'

import { insertUser, removeUserByUsername } from '../support/database'

const user: User = getLoginUser()

test('deve logar com sucesso', async ({ page }) => {

    const auth = getAuthActions(page)
    const toast = getToast(page)
    
    await removeUserByUsername(user.username)
    await insertUser(user)

    await auth.navigateToLogin()
    await auth.doLogin(user)
    await auth.verifyUserLogin(user)
    await toast.haveText('Login realizado com sucesso!', 'Bem-vindo de volta ao Linkaí.')

})

test('nao deve logar com senha incorreta', async ({ page }) => {

    const auth = getAuthActions(page)
    const toast = getToast(page)

    await auth.navigateToLogin()
    await auth.doLogin({...user, password: '123456'})

    await toast.haveText('Oops!', 'Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')

})

test('nao deve logar com usuario não cadastrado', async ({ page }) => {

    const auth = getAuthActions(page)
    const toast = getToast(page)

    await auth.navigateToLogin()

    await auth.doLogin({...user, username: 'not-found'})

    await toast.haveText('Oops!', 'Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')

})

test('nao deve logar quando não informo nenhum dos campos', async ({ page }) => {

    const auth = getAuthActions(page)
    const toast = getToast(page)

    await auth.navigateToLogin()

    await auth.doLogin({...user, username: '', password: ''})

    await toast.haveText('Campos obrigatórios', 'Por favor, preencha todos os campos.')

})

test('nao deve logar quando não informo o usuário', async ({ page }) => {

    const auth = getAuthActions(page)
    const toast = getToast(page)

    await auth.navigateToLogin()

    await auth.doLogin({...user, username: ''})

    await toast.haveText('Campos obrigatórios', 'Por favor, preencha todos os campos.')

})

test('nao deve logar quando não informo a senha', async ({ page }) => {

    const auth = getAuthActions(page)
    const toast = getToast(page)

    await auth.navigateToLogin()

    await auth.doLogin({...user, password: ''})

    await toast.haveText('Campos obrigatórios', 'Por favor, preencha todos os campos.')

})