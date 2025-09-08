import { expect } from '@playwright/test'

const baseUrl = 'http://localhost:3333'

export async function createFullProfile(request: any, profile: any) {
    
    const token = await registerUser(request, profile.user)

    profile.links.forEach(async (link: any) => {
        await createLink(request, token, link)
    })

    await createSocial(request, token, profile.socials.github)
    await createSocial(request, token, profile.socials.linkedin)
    await createSocial(request, token, profile.socials.instagram)
}

export async function registerUser(request: any, payload: any) {
    const response = await request.post(`${baseUrl}/api/auth/register`, {
        headers: {
            'Content-type': 'application/json'
        },
        data: payload
    })

    expect(response.status()).toBe(201)

    const { token } = await response.json()

    return token
}

export async function createLink(request: any, token: string, link: any) {
    const response = await request.post(`${baseUrl}/api/links`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: link
    })

    expect(response.status()).toBe(201)
}

export async function createSocial(request: any, token: string, social: any) {
    const response = await request.post(`${baseUrl}/api/socials`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: social
    })

    expect(response.status()).toBe(201)
}