import { expect, test } from '@playwright/test'

import { removeUserByEmail } from '../support/database'

import { createFullProfile } from '../support/services'

import profile from '../support/fixtures/profile.json'

test.describe.serial('Perfil do usuário', () => {

    test.beforeAll(async ({ request }) => {

        await removeUserByEmail(profile.user.email)
        await createFullProfile(request, profile)
    })

    test('Deve exibir os meus links no meu perfil', async ({ page, request }) => {

        await page.goto(`/${profile.user.username}`)

        await expect(page.getByRole('heading', { name: profile.user.name })).toBeVisible()

        for (const link of profile.links) {
            const item = page.locator(`a[href="${link.url}"]`)
            await expect(item).toBeVisible()
            await expect(item).toContainText(link.name)
        }

    })

    test('Deve exibir as redes sociais do meu perfil', async ({ page, request }) => {

        await page.goto(`/${profile.user.username}`)

        await expect(page.getByRole('heading', { name: profile.user.name })).toBeVisible()

        const socialUrls = [
            `https://github.com/${profile.socials.github.username}`,
            `https://instagram.com/${profile.socials.instagram.username}`,
            `https://linkedin.com/in/${profile.socials.linkedin.username}`
        ]

        for (const url of socialUrls) {
            const item = page.locator(`a[href="${url}"]`)
            await expect(item).toBeVisible()
        }

    })

})

