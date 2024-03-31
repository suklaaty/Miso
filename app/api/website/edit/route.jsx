import { VerifyAuthHeader } from '@/app/components/Authentication'
import { generateId, validateDomain, validateString } from '@/app/components/functions'
import { editWebsite, editWebsitePublicId, getWebsite } from '@/app/components/query'

export async function POST(request) {
 let status = 400
 let res = []
 let data = await request.json()
 let { user } = await VerifyAuthHeader()
 if (user) {
  if (!validateString(data.id)) {
   res.push('Invalid id')
  }
  if (!validateString(data.name)) {
   res.push('Invalid name')
  }
  if (!validateString(data.domain) || !validateDomain(data.domain)) {
   res.push('Invalid domain')
  }
  if (data.enablePublic !== true && data.enablePublic !== false) {
   res.push('Invalid enablePublic')
  }
  if (Object.keys(res).length === 0) {
   let website
   if (website = await getWebsite(data.id, user.id)) {
    if (website = await editWebsite(data.id, data.name, data.domain.toLowerCase(), data.enablePublic)) {
     let publicId = website.publicId
     if (data.enablePublic && publicId === null) {
      publicId = generateId(12)
      website = await editWebsitePublicId(data.id, publicId)
     }
     res = website
     status = 200
    } else {
     res.push('Unexpected server response')
     status = 500
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