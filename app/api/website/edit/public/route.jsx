import { VerifyAuthHeader } from '@/app/components/Authentication'
import { generateId, validateString } from '@/app/components/functions'
import { editWebsitePublicId, getWebsite } from '@/app/components/query'

export async function POST(request) {
 let status = 400
 let res = []
 let data = await request.json()
 let { user } = await VerifyAuthHeader()
 if (user) {
  if (!validateString(data.id)) {
   res.push('Invalid id')
  }
  if (Object.keys(res).length === 0) {
   let website
   if (website = await getWebsite(data.id, user.id)) {
    if (website.public) {
     res = await editWebsitePublicId(data.id, generateId(12))
     status = 200
    } else {
     res.push('Public Url is not enabled')
    }
   } else {
    res.push('Website not found')
    status = 404
   }
  }
 } else {
  res.push('Invalid authorization header')
  status = 401
 }
 return new Response(JSON.stringify(res), { status: status })
}