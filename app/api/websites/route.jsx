import { VerifyAuthHeader } from '@/app/components/Authentication'
import { validateString } from '@/app/components/functions'
import { getWebsiteEventByHour, getWebsiteEventCount, getWebsites } from '@/app/components/query'

export async function GET(request) {
 let status = 400
 let res = []
 let option = request.nextUrl.searchParams.get('option')
 let start = request.nextUrl.searchParams.get('start')
 let end = request.nextUrl.searchParams.get('end')
 let { user } = await VerifyAuthHeader()
 if (!user) {
  res.push('Invalid authorization header')
  status = 401
 }
 if (!validateString(option) || !['all', 'page_view', 'total_views'].includes(option)) {
  res.push('Invalid option parameter')
 }
 if (['page_view', 'total_views'].includes(option)) {
  if (!validateString(start)) {
   res.push('Invalid start parameter')
  } else if (!validateString(end)) {
   res.push('Invalid end parameter')
  }
 }
 if (Object.keys(res).length === 0) {
  if (option === 'all') {
   status = 200
   res = await getWebsites(user.id)
  } else {
   status = 200
   let query
   start = new Date(start)
   end = new Date(end)
   if (option === 'page_view') {
    let query = await getWebsites(user.id)
    for (let key = 0, n = query.length; key < n; key++) {
     res.push(await getWebsiteEventByHour(query[key].id, option, start, end))
    }
    res = Array.from(
     res.flat().reduce((groups, entry) => {
      let date = new Date(entry.date)
      date = date.toISOString()
      groups.set(date, (groups.get(date) || []).concat(entry))
      return groups
     }, new Map())
    ).map(([date, entries]) => ([date, entries.reduce((sum, e) => sum + e.views, 0)]))
   } else if (option === 'total_views') {
    query = await getWebsites(user.id)
    for (let key = 0, n = query.length; key < n; key++) {
     res.push({ id: query[key].id, domain: query[key].domain, views: (await getWebsiteEventCount(query[key].id, 'page_view', start, end))['_count'] })
    }
   }
  }
 }
 return new Response(JSON.stringify(res), { status: status })
}