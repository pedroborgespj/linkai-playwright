import { faker } from '@faker-js/faker'

export interface UserSignup {
    name: string
    username: string
    email: string
    password: string
    confirmPassword: string
}

export interface UserLogin {
    name: string
    username: string
    password: string
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


export const Users = {
    validUser: {
        name: 'Beth',
        username: 'beth',
        password: 'pwd123'
    },
    invalidPassword: {
        name: 'Beth',
        username: 'beth',
        password: '123456'
    },
    nonExistentUser: {
        name: 'Beth',
        username: 'not-found',
        password: 'pwd123'
    },
    emptyFields: {
        name: 'Beth',
        username: '',
        password: ''
    },
    emptyUsername: {
        name: 'Beth',
        username: '',
        password: 'pwd123'
    },
    emptyPassword: {
        name: 'Beth',
        username: 'beth',
        password: ''
    }
}