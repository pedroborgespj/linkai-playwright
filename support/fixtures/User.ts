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
    email: string
}

export function getNewUser() {

    const defaultPassword = 'pwd123'

    return {
        name: faker.person.fullName(),
        username: faker.internet.username().replace('.', ''),
        email: faker.internet.email(),
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