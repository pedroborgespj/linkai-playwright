export interface User {
    name: string
    username: string
    password: string
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