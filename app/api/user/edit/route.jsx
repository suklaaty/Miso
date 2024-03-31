import { VerifyAuthHeader } from '@/app/components/Authentication'
import { validateEmail, validatePassword, validateString } from '@/app/components/functions'
import { editUser, emailExists, getUser } from '@/app/components/query'
import bcrypt from 'bcrypt'
import * as jose from 'jose'

export async function POST(request) {
 let status = 400
 let res = []
 let data = await request.json()
 let email = data.email
 let newPassword = data.newPassword
 let currentPassword = data.currentPassword
 let { user } = await VerifyAuthHeader()
 if (!user) {
  res.push('Invalid authorization header')
  status = 401
 }
 if (!validateString(email)) {
  res.push('Email is required')
 } else if (!validateEmail(email)) {
  res.push('Email is invalid')
 } else if (email !== user.email && await emailExists(email)) {
  res.push('Email is already associated with an account')
 }
 if (validateString(newPassword) && !validatePassword(newPassword)) {
  res.push('New Password should be 8-128 characters long, consisting of at least 1 lower and upper case letter, 1 number, and 1 of the following characters #?!@$%^&*-')
 }
 if (!validateString(currentPassword)) {
  res.push('Current Password is required')
 } else if (!validatePassword(currentPassword)) {
  res.push('Current Password should be 8-128 characters long, consisting of at least 1 lower and upper case letter, 1 number, and 1 of the following characters #?!@$%^&*-')
 }
 if (Object.keys(res).length === 0) {
  let dbUser = await getUser(user.email)
  if (await bcrypt.compare(currentPassword, dbUser.password)) {
   if (validateString(newPassword)) {
    dbUser.password = await bcrypt.hash(newPassword, 10)
   }
   res = await editUser(user.id, email, dbUser.password)
   res.token = await new jose.SignJWT({ user: { id: dbUser.id, email: email, role: dbUser.role } }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime(new Date((new Date()).getTime() + process.env.AUTH_EXPIRATION * 24 * 60 * 60 * 1000)).sign(new TextEncoder().encode(process.env.AUTH_SECRET))
   status = 200
  } else {
   res.push('Current Password is incorrect')
  }
 }
 return new Response(JSON.stringify(res), { status: status })
}