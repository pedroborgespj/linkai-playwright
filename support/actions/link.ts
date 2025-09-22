import { Page, expect } from '@playwright/test'

import { Link } from '../fixtures/User'

export function getLinkActions(page: Page) {
    return {
        openModal: async () => {

            await page
                .getByRole('button', { name: 'Adicionar' })
                .first().click()

            const modal = page.getByRole('heading', { name: 'Adicionar Novo Link' })
            await expect(modal).toBeVisible()
        },
        submitLinkForm: async (link: Link) => {
            await page
                .getByRole('textbox', { name: 'Nome do Link' })
                .fill(link.title)
            await page
                .getByRole('textbox', { name: 'URL' })
                .fill(link.url)

            await page
                .getByRole('button', { name: 'Adicionar Link' })
                .click({force: true})
        }
    }
}