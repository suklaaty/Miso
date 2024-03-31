import { validateString } from '@/app/components/functions'
import { getWebsiteByPublicId } from '@/app/components/query'

export async function GET(request) {
 let status = 400
 let res = []
 let id = request.nextUrl.searchParams.get('id')
 if (!validateString(id)) {
  res.push('Invalid id')
 }
 if (Object.keys(res).length === 0) {
  let website
  if (website = await getWebsiteByPublicId(id)) {
   if (website.public) {
    res = website
    status = 200
   } else {
    res.push('Request is not allowed')
    status = 401
   }
  } else {
   res.push('Website not found')
   status = 404
  }
 }
 return new Response(JSON.stringify(res), { status: status })
}

function roundNumbers(n) {
 if (n < 1e3) return n;
 if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'k';
 if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'm';
 if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'b';
 if (n >= 1e12) return +(n / 1e12).toFixed(1) + 't';
}