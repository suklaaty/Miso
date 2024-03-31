/** @type {import('next').NextConfig} */

const nextConfig = {
 async headers() {
  return [
   {
    source: '/:path*',
    headers: [
     {
      key: 'Accept-Ch',
      value: 'Sec-CH-UA,Sec-CH-UA-Arch,Sec-CH-UA-Bitness,Sec-CH-UA-Full-Version,Sec-CH-UA-Full-Version-List,Sec-CH-UA-Mobile,Sec-CH-UA-Model,Sec-CH-UA-Platform,Sec-CH-UA-Platform-Version',
     },
     {
      key: 'Critical-Ch',
      value: 'Sec-CH-UA,Sec-CH-UA-Arch,Sec-CH-UA-Bitness,Sec-CH-UA-Full-Version,Sec-CH-UA-Full-Version-List,Sec-CH-UA-Mobile,Sec-CH-UA-Model,Sec-CH-UA-Platform,Sec-CH-UA-Platform-Version',
     }
    ]
   },
   {
    source: '/api/collect',
    headers: [
     {
      key: 'Access-Control-Allow-Origin',
      value: '*',
     },
     {
      key: 'Access-Control-Allow-Headers',
      value: 'content-type'
     }
    ]
   },
   {
    source: '/script.js',
    headers: [
     {
      key: 'Access-Control-Allow-Methods',
      value: 'GET, POST, OPTIONS',
     }
    ]
   }
  ]
 }
}

module.exports = nextConfig