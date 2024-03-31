'use server'

import { getUser } from '@/app/components/query'
import { headers } from 'next/headers'
import * as jose from 'jose'

export async function VerifyAuthHeader() {
    let token = false
    let authorization = headers().get('authorization')
    if (authorization !== null && authorization !== undefined && authorization !== '' && authorization.includes('Bearer ')) {
        try {
            let jwt = await jose.jwtVerify(authorization.split(' ')[1], new TextEncoder().encode(process.env.AUTH_SECRET))
            let jwtUser = jwt.payload.user
            let user = await getUser(jwtUser.email)
            if (!user || user.status !== 1 || user.id !== jwtUser.id || user.role !== jwtUser.role) {
                throw Error('Invalid token')
            }
            token = jwt.payload
        } catch { }
    }
    return token
}