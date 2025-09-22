import { Page, expect } from '@playwright/test'

export function getToast(page: Page) {
    return {
        haveText: async (title: string, description: string) => {

            const toast = page.locator('.toast')

            await expect(toast).toContainText(title)
            await expect(toast).toContainText(description)
            
        }
    }
}