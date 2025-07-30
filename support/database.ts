import {MongoClient} from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017/linkai')

export async function removeUserByEmail(email: string) {

    await client.connect()

    const result = await client
        .db()
        .collection('users')
        .deleteOne({email: email})

    return result.deletedCount

}

export async function removeUserByUsername(username: string) {

    await client.connect()

    const result = await client
        .db()
        .collection('users')
        .deleteOne({username: username})

    return result.deletedCount

}

export async function insertUser(user: any) {

    await client.connect()

    const result = await client
        .db()
        .collection('users')
        .insertOne(user)

    return result.insertedId

}

