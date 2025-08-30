import { Page, expect } from '@playwright/test'

const eSocialMedia = {
    GitHub: 0,
    LinkedIn: 1,
    Instagram: 2
}

type SocialMedia = 'GitHub' | 'Instagram' | 'LinkedIn'

export function getSocialActions(page: Page) {
    return {
        addSocialMedia: async (socialMedia: SocialMedia, username: string) => {

            const socialCard = page.locator('.bg-card:has-text("Redes Sociais")')

            const index = eSocialMedia[socialMedia]

            await socialCard
                .getByRole('button', { name: 'Adicionar' })
                .nth(index)
                .click()
            
            await expect(page.getByRole('heading', {name: `Adicionar ${socialMedia}`}))
                .toBeVisible()

            await page
                .getByPlaceholder(`Seu username no ${socialMedia}`)
                .fill(username)

            await page
                .getByRole('button', {name: 'Salvar'})
                .click()
        }
    }
}