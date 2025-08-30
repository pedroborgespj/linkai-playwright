import { faker } from '@faker-js/faker'

export interface User {
    name: string
    username: string
    email: string
    password: string
    confirmPassword: string,
    links?: Link[]
}

export interface Link {
    title: string,
    url: string
}

export function getFakerUser() {

    const defaultPassword = 'pwd123'

    return {
        name: faker.person.fullName(),
        username: faker.internet.username().replace('.', ''),
        email: faker.internet.email(),
        password: defaultPassword,
        confirmPassword: defaultPassword
    }
}

export function getNewUser() {

    const defaultPassword = 'pwd123'

    return {
        name: 'Beth Amancio',
        username: 'beth_amancio',
        email: 'bethamancio@email.com',
        password: defaultPassword,
        confirmPassword: defaultPassword
    }
}

export function getDuplicateUser() {

    const defaultPassword = 'pwd123'

    return {
        name: 'Bruno Santos',
        username: 'bruno',
        email: 'brunosantos@email.com',
        password: defaultPassword,
        confirmPassword: defaultPassword
    }
}

export function getLoginUser() {

    const defaultPassword = 'pwd123'

    return {
        name: 'Beth',
        username: 'beth',
        email: 'bethamanciodog@email.com',
        password: defaultPassword,
        confirmPassword: defaultPassword
    }
}

export function getuserWithLink() {

    const defaultPassword = 'pwd123'

    return {
        name: 'Clodoaldo',
        username: 'clods',
        email: 'clodoaldo@email.com',
        password: defaultPassword,
        confirmPassword: defaultPassword,
        links: [{
            title: 'Meus Cursos',
            url: 'https://clodoaldo.dev/cursos'
        }]
    }
}

export function getuserWithLinks() {

    const defaultPassword = 'pwd123'

    return {
        name: 'Fernando',
        username: 'nando',
        email: 'fernando@email.com',
        password: defaultPassword,
        confirmPassword: defaultPassword,
        links: [
            { title: 'Meus Cursos', url: 'https://fernando.dev/cursos' },
            { title: 'Meus Blog', url: 'https://fernando.dev/blog' },
            { title: 'Fale Comigo', url: 'https://fernando.dev/contato' },
            { title: 'Minhas Musicas', url: 'https://fernando.dev/playlist' },
            { title: 'Sobre', url: 'https://fernando.dev/sobre' }
        ]
    }
}

export function getuserWithSocialMedia() {

    const defaultPassword = 'pwd123'

    return {
        name: 'Jon Bon Jovi',
        username: 'bonjovi',
        email: 'jon@bonjovi.com',
        password: defaultPassword,
        confirmPassword: defaultPassword,
        socialMedia: {
            github: 'bonjovi',
            linkedin: 'bonjovi',
            instagram: 'bonjovi'
        }
    }
}