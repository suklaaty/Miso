import { VerifyAuthHeader } from '@/app/components/Authentication'
import { validateString } from '@/app/components/functions'
import { getWebsiteById, getGroupCount, getUniqueWebsiteEvent, getWebsite, getWebsiteEventByHour } from '@/app/components/query'

export async function GET(request) {
 let status = 400
 let res = []
 let id = request.nextUrl.searchParams.get('id')
 let option = request.nextUrl.searchParams.get('option')
 let start = request.nextUrl.searchParams.get('start')
 let end = request.nextUrl.searchParams.get('end')
 let limit = request.nextUrl.searchParams.get('limit') ?? null
 let { user } = await VerifyAuthHeader()
 let website
 if (validateString(id)) {
  website = await getWebsiteById(id)
  if (website) {
   if (website.userId !== user?.id && !website.public) {
    res.push('Request is not allowed')
    status = 401
   }
  } else {
   res.push('Website not found')
   status = 404
  }
 } else {
  res.push('Invalid id')
 }
 if (!validateString(option) || !['details', 'path', 'referrer', 'browser', 'os', 'device', 'countryIso', 'countryName', 'page_view', 'top_stats'].includes(option)) {
  res.push('Invalid option parameter')
 }
 if (['path', 'referrer', 'browser', 'os', 'device', 'countryIso', 'countryName', 'page_view', 'top_stats'].includes(option)) {
  if (!validateString(start)) {
   res.push('Invalid start parameter')
  } else if (!validateString(end)) {
   res.push('Invalid end parameter')
  }
 }
 if (Object.keys(res).length === 0) {
  if (option === 'details') {
   status = 200
   res = website
  } else {
   status = 200
   let query
   start = new Date(start)
   end = new Date(end)
   if (['path', 'referrer', 'browser', 'os', 'device', 'countryIso', 'countryName'].includes(option)) {
    query = await getGroupCount(id, option, start, end, limit)
    query.forEach(function (val, key) {
     if (val[option] == null) {
      if (option === 'referrer') {
       val[option] = 'Direct / None'
      } else {
       val[option] = 'Unknown'
      }
     }
     res.push({ id: key, option: val[option], views: val._count })
    })
   } else if (option === 'page_view') {
    res = await getWebsiteEventByHour(id, option, start, end)
   } else if (option === 'top_stats') {
    let data = await getUniqueWebsiteEvent(id, 'page_view', 'fingerprint', start, end)
    let visitors = Object.keys(data).length
    let views = data.reduce((acc, item) => acc + item._count, 0)
    let vpv = parseInt((views / Object.keys(data).length).toFixed(0))
    let bounce = parseInt(((data.filter(d => d._count <= 1).length / data.length) * 100).toFixed(0))
    res = { views: roundNumbers(views), visitors: roundNumbers(visitors), vpv: vpv || 0, bounce: bounce || 0 }
   }
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