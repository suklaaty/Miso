import { VerifyAuthHeader } from '@/app/components/Authentication'
import { generateId, validateDomain, validateString } from '@/app/components/functions'
import { addWebsite, domainExists } from '@/app/components/query'

export async function POST(request) {
 let status = 400
 let res = []
 let data = await request.json()
 let { user } = await VerifyAuthHeader()
 if (user) {
  if (!validateString(data.name)) {
   res.push('Invalid name')
  }
  if (!validateString(data.domain) || !validateDomain(data.domain)) {
   res.push('Invalid domain')
  } else if (await domainExists(user.id, data.domain)) {
   res.push('Domain already associated with account')
  }
  if (Object.keys(res).length === 0) {
   let website
   if (website = await addWebsite(generateId(24), data.name, data.domain.toLowerCase(), user.id)) {
    res = website
    status = 200
   } else {
    res.push('Unexpected server response')
    status = 500
   }
  }
 } else {
  res.push('Invalid authorization header')
  status = 401
 }
 return new Response(JSON.stringify(res), { status: status })
}