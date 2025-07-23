import { test, expect } from '@playwright/test'

import { getSignUpPage } from '../support/pages/SignUpPage'
import { getDashPage } from '../support/pages/DashPage'

import { NewUser, NewUsers } from '../support/fixtures/NewUser'

test('deve realizar o cadastro com sucesso', async ({ page }) => {

    const signUpPage = getSignUpPage(page)
    const dashPage = getDashPage(page)

    const newUser: NewUser = NewUsers.firstUser

    await signUpPage.open()

    await signUpPage.submit(newUser)

    await expect(dashPage.welcome()).toContainText(`Olá, ${newUser.name}!`)

})

// test('deve exibir erro ao tentar cadastrar com campos obrigatórios em branco', async ({ page }) => {



// })

// test('deve validar o formato inválido de email', async ({ page }) => {



// })

// test('deve exibir erro quando a confirmação de senha for diferente da senha', async ({ page }) => {



// })
