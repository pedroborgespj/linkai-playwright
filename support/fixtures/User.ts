import { faker } from '@faker-js/faker'

export interface User {
    name: string
    username: string
    email: string
    password: string
}

export function getNewUser() {
    return {
        name: faker.person.fullName(),
        username: faker.internet.username().replace('.', ''),
        email: faker.internet.email(),
        password: 'pwd123'
    }
}


export const Users = {
    validUser: {
        name: 'Beth',
        username: 'beth',
        email: '',
        password: 'pwd123'
    },
    invalidPassword: {
        name: 'Beth',
        username: 'beth',
        email: '',
        password: '123456'
    },
    nonExistentUser: {
        name: 'Beth',
        username: 'not-found',
        email: '',
        password: 'pwd123'
    },
    emptyFields: {
        name: 'Beth',
        username: '',
        email: '',
        password: ''
    },
    emptyUsername: {
        name: 'Beth',
        username: '',
        email: '',
        password: 'pwd123'
    },
    emptyPassword: {
        name: 'Beth',
        username: 'beth',
        email: '',
        password: ''
    }
}