import { deviceIpAddress, deviceObject } from '@/app/components/device'
import { generateId } from '@/app/components/functions'
import { addWebsiteEvent, getWebsiteById } from '@/app/components/query'
import { isbot } from 'isbot'
import * as geolite2 from 'geolite2-redist'
import * as maxmind from 'maxmind'

async function addEvent(request) {
 let data = await request.json()
 if (data.id !== undefined && data.event !== undefined && data.title !== undefined && data.path !== undefined && data.params !== undefined && data.userAgent !== undefined && data.language !== undefined && data.referrer !== undefined && data.secChUa !== undefined && data.secChUaArch !== undefined && data.secChUaBitness !== undefined && data.secChUaFullVersion !== undefined && data.secChUaFullVersionList !== undefined && data.secChUaMobile !== undefined && data.secChUaModel !== undefined && data.secChUaPlatform !== undefined && data.secChUaPlatformVersion !== undefined && data.id !== '' && data.event !== '' && data.title !== '' && data.path !== '' && data.userAgent !== '' && data.language !== '') {
  if (process.env.COLLECT_BOT == "1" || process.env.COLLECT_BOT != "1" && !isbot(data.userAgent)) {
   let website = await getWebsiteById(data.id)
   if (website) {
    let origin = new URL(request.headers.get('origin'))
    if (website.domain === origin.host) {
     let ipAddress = deviceIpAddress(request.headers)
     let device = deviceObject({ 'user-agent': data.userAgent, 'sec-ch-ua': data.secChUa, 'sec-ch-ua-arch': data.secChUaArch, 'sec-ch-ua-bitness': data.secChUaBitness, 'sec-ch-ua-full-version': data.secChUaFullVersion, 'sec-ch-ua-full-version-list': data.secChUaFullVersionList, 'sec-ch-ua-mobile': data.secChUaMobile, 'sec-ch-ua-model': data.secChUaModel, 'sec-ch-ua-platform': data.secChUaPlatform, 'sec-ch-ua-platform-version': data.secChUaPlatformVersion, 'ipAddress': ipAddress })
     let geo = await geolite2.open(geolite2.GeoIpDbName.Country, (path) => maxmind.open(path))
     let geoData = geo.get(ipAddress)
     let countryIso = geoData?.country?.iso_code ?? null
     let countryName = geoData?.country?.names?.en ?? null
     if (process.env.COLLECT_IP == "0") {
      ipAddress = null
     }
     let referrer = null
     if (data.referrer !== '') {
      let url = new URL(data.referrer)
      if (url.host !== website.domain) {
       referrer = data.referrer.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '')
      }
     }
     await addWebsiteEvent(generateId(24), website.id, data.event, data.title, data.path, data.params === '' ? null : data.params, referrer, device.fingerprint, ipAddress, data.userAgent, device.device.type, device.browser.name, device.os.name, data.language, countryIso, countryName)
    }
   }
  }
 }
}

export function POST(request) {
 addEvent(request)
 return new Response(null, { status: 204 })
}

export async function OPTIONS() {
 return new Response(null, { status: 204 })
}