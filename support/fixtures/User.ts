import { faker } from '@faker-js/faker'

export interface User {
    name: string
    username: string
    email: string
    password: string
    confirmPassword: string
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