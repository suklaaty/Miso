import { VerifyAuthHeader } from '@/app/components/Authentication'
import { validateString } from '@/app/components/functions'
import { deleteWebsite, deleteWebsiteEvents, getWebsite } from '@/app/components/query'

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
   if (await getWebsite(data.id, user.id)) {
    if (await deleteWebsite(data.id) && await deleteWebsiteEvents(data.id)) {
     res = 'Website deleted succesfully'
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