import { VerifyAuthHeader } from '@/app/components/Authentication'

export async function GET(request) {
 let status = 400
 let res = []
 let { user } = await VerifyAuthHeader()
 if (!user) {
  res.push('Invalid authorization header')
  status = 401
 }
 if (Object.keys(res).length === 0) {
  res = user
  status = 200
 }
 return new Response(JSON.stringify(res), { status: status })
}