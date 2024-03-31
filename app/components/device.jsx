import { headers } from 'next/headers'
import { UAParser } from 'ua-parser-js'
import Bowser from 'bowser'
import crypto from 'crypto'

export function deviceInfo(headers) {
 let info = UAParser(headers).withClientHints()
 if (info.device.type === undefined) {
  let bowser = Bowser.getParser(info.ua)
  info.device.type = bowser.getPlatformType()
  if (info.device.type === '' && additionalDesktop(info.ua)) {
   info.device.type = 'desktop'
  }
 }
 switch (info.device.type) {
  case 'mobile':
   info.device.type = 'Mobile'
   break
  case 'tablet':
   info.device.type = 'Tablet'
   break
  case 'desktop':
   info.device.type = 'Desktop'
   break
  case 'smarttv':
   info.device.type = 'SmartTv'
   break
  case 'console':
   info.device.type = 'Console'
   break
  case 'wearable':
   info.device.type = 'Wearable'
   break
  case 'embedded':
   info.device.type = 'Embedded'
   break
  default:
 }
 return info
}

function additionalDesktop(userAgent) {
 const regexes = [{ regex: /^Mozilla\/5.0 \([a-zA-Z\d]+; CrOS [a-zA-Z\d_]+ [\d.]+\) AppleWebKit\/[\d.]+ \(KHTML, like Gecko\) Chrome\/[\d.]+ Safari\/[\d.]+$/, flags: 'mg' }]
 let isFound = false
 for (const pattern of regexes) {
  let regex = new RegExp(pattern.regex, pattern.flags)
  if (regex.test(userAgent)) {
   isFound = true
   break
  }
 }
 return isFound
}

export function deviceObject(headers) {
 let info = deviceInfo(headers)
 info['fingerprint'] = crypto.createHash('md5').update(JSON.stringify(info) + headers.ipAddress).digest('hex')
 return info
}

export function deviceHeaderList() {
 let headersList = headers()
 let info = deviceInfo({ 'user-agent': headersList.get('user-agent'), 'sec-ch-ua': headersList.get('sec-ch-ua'), 'sec-ch-ua-arch': headersList.get('sec-ch-ua-arch'), 'sec-ch-ua-bitness': headersList.get('sec-ch-ua-bitness'), 'sec-ch-ua-full-version': headersList.get('sec-ch-ua-full-version'), 'sec-ch-ua-full-version-list': headersList.get('sec-ch-ua-full-version-list'), 'sec-ch-ua-mobile': headersList.get('sec-ch-ua-mobile'), 'sec-ch-ua-model': headersList.get('sec-ch-ua-model'), 'sec-ch-ua-platform': headersList.get('sec-ch-ua-platform'), 'sec-ch-ua-platform-version': headersList.get('sec-ch-ua-platform-version') })
 info['hash'] = crypto.createHash('md5').update(JSON.stringify(info)).digest('hex')
 return info
}

export function deviceIpAddress(headers) {
 let ipAddress = null
 if (headers.has('cf-connecting-ip')) {
  ipAddress = headers.get('cf-connecting-ip')
 } else if (headers.has('cf-pseudo-ipv4')) {
  ipAddress = headers.get('cf-pseudo-ipv4')
 } else if (headers.has('true-client-ip')) {
  ipAddress = headers.get('true-client-ip')
 } else if (headers.has('x-client-ip')) {
  ipAddress = headers.get('x-client-ip')
 } else if (headers.has('fastly-client-ip')) {
  ipAddress = headers.get('fastly-client-ip')
 } else if (headers.has('x-forwarded-for')) {
  let xForwardedFor = headers.get('x-forwarded-for')
  ipAddress = xForwardedFor.split(/\s*,\s*/)[0]
 } else if (headers.has('x-real-ip')) {
  ipAddress = headers.get('x-real-ip')
 } else if (headers.has('x-cluster-client-ip')) {
  ipAddress = headers.get('x-cluster-client-ip')
 }
 return ipAddress
}