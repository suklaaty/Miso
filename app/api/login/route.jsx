import { validateEmail, validatePassword } from '@/app/components/functions'
import { getUser } from '@/app/components/query'
import bcrypt from 'bcrypt'
import * as jose from 'jose'

export async function POST(request) {
    let status = 401
    let res = []
    let data = await request.json()
    let email = data.email
    let password = data.password
    if (email === undefined || email === '') {
        res.push('Email is required')
    } else if (!validateEmail(email)) {
        res.push('Email is invalid')
    }
    if (password === undefined || password === '') {
        res.push('Password is required')
    } else if (!validatePassword(password)) {
        res.push('Password should be 8-128 characters long, consisting of at least 1 lower and upper case letter, 1 number, and 1 of the following characters #?!@$%^&*-')
    }
    if (Object.keys(res).length === 0) {
        let user = await getUser(email)
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                let expiration = new Date((new Date()).getTime() + process.env.AUTH_EXPIRATION * 24 * 60 * 60 * 1000)
                let token = await new jose.SignJWT({ user: { id: user.id, email: user.email, role: user.role } }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime(expiration).sign(new TextEncoder().encode(process.env.AUTH_SECRET))
                status = 200
                res = token
            } else {
                res.push('Email or password is incorrect')
            }
        } else {
            res.push('Email or password is incorrect')
        }
    }
    return new Response(JSON.stringify(res), { status: status })
}