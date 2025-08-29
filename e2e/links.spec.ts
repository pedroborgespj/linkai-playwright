import { test, expect } from '@playwright/test';

import { getAuthActions } from '../support/actions/auth'
import { getLinkActions } from '../support/actions/link';
import { getToast } from '../support/actions/components/Toast'

import { User, getuserWithLink, getuserWithLinks } from '../support/fixtures/User';

import { insertUser, removeUserByUsername, removeLinks } from '../support/database'


test('deve cadastrar um novo link', async ({ page }) => {

    const auth = getAuthActions(page)
    const link = getLinkActions(page)
    const toast = getToast(page)

    const user: User = getuserWithLink()
    await removeUserByUsername(user.username)
    await insertUser(user)

    await removeLinks('clodoaldo.dev')

    await auth.navigateToLogin()
    await auth.doLogin(user)

    if (user.links) {
        for (const l of user.links) {
            await link.openModal()
            await link.submitLinkForm(l)
            await toast.haveText('Sucesso!', 'Link adicionado com sucesso.')
        }
    }
});

test('deve cadastrar multiplos links', async ({ page }) => {

    const auth = getAuthActions(page)
    const link = getLinkActions(page)
    const toast = getToast(page)

    const user: User = getuserWithLinks()
    await removeUserByUsername(user.username)
    await insertUser(user)

    await removeLinks('fernando.dev')

    await auth.navigateToLogin()
    await auth.doLogin(user)

    if (user.links) {
        for (const l of user.links) {
            await link.openModal()
            await link.submitLinkForm(l)
            await toast.haveText('Sucesso!', 'Link adicionado com sucesso.')
        }
    }
    
});