import { generateId, validateEmail, validatePassword, validateString } from '@/app/components/functions'
import { emailExists, addUser } from '@/app/components/query'
import bcrypt from 'bcrypt'

export async function POST(request) {
    let status = 400
    let res = []
    let data = await request.json()
    let email = data.email
    let password = data.password
    if (process.env.AUTH_ALLOW_REGISTRATION != "1") {
        res.push('Registration is disabled')
    }
    if (!validateString(email)) {
        res.push('Email is required')
    } else if (!validateEmail(email)) {
        res.push('Email is invalid')
    } else if (await emailExists(email)) {
        res.push('Email is already associated with an account')
    }
    if (!validateString(password)) {
        res.push('Password is required')
    } else if (!validatePassword(password)) {
        res.push('Password should be 8-128 characters long, consisting of at least 1 lower and upper case letter, 1 number, and 1 of the following characters #?!@$%^&*-')
    }
    if (Object.keys(res).length === 0) {
        password = await bcrypt.hash(password, 10)
        if (await addUser(generateId(24), email, password, 2, 1)) {
            status = 200
            res = 'Registered successfully'
        } else {
            res.push('Unexpected server response')
        }
    }
    return new Response(JSON.stringify(res), { status: status })
}