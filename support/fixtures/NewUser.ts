export interface NewUser {
    name: string
    username: string
    email: string
    password: string
}

export const NewUsers = {
    firstUser: {
        name: 'user one',
        username: 'user1',
        email: 'user1@email.com',
        password: 'pwd123'
    }
}