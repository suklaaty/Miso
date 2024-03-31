import { PrismaClient } from '@prisma/client'

let prisma

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }
    prisma = global.prisma
}

export async function getUser(email) {
    let result = null
    try {
        result = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })
    } catch (error) {
        console.error(error)
    }
    return result
}

export async function addUser(id, email, password, role, status) {
    let result = null
    try {
        result = await prisma.user.create({
            data: {
                id: id,
                email: email,
                password: password,
                role: role,
                status: status
            }
        })
    } catch (error) {
        console.error(error)
    }
    return result
}

export async function emailExists(email) {
    let result = null
    try {
        result = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
    } catch (error) {
        console.error(error)
    }
    return result !== null && Object.keys(result).length > 0
}

export async function editUser(id, email, password, role, status) {
    let result = null
    try {
        result = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                email: email,
                password: password,
                role: role,
                status: status
            }
        })
    } catch (error) {
        console.error(error)
    }
    return result
}

export async function addWebsite(id, name, domain, userId) {
    let result = null
    try {
        result = await prisma.website.create({
            data: {
                id: id,
                name: name,
                domain: domain,
                userId: userId
            }
        })
    } catch (error) {
        console.error(error)
    }
    return result
}

export async function domainExists(userId, domain) {
    let result = null
    try {
        result = await prisma.website.findUnique({
            where: {
                userId_domain: {
                    userId: userId,
                    domain: domain
                }
            }
        })
    } catch (error) {
        console.error(error)
    }
    return result !== null && Object.keys(result).length > 0
}

export async function getWebsites(userId) {
    let result = null
    try {
        result = await prisma.website.findMany({
            where: {
                userId: userId
            }
        })
    } catch (error) {
        console.error(error)
    }
    return result
}

export async function getWebsiteById(id) {
    let result = null
    try {
        result = await prisma.website.findUnique({
            where: {
                id: id
            }
        })
    } catch (error) {
        console.error(error)
    }
    return result
}

export async function getWebsiteByPublicId(id) {
    let result = null
    try {
        result = await prisma.website.findUnique({
            where: {
                publicId: id
            }
        })
    } catch (error) {
        console.error(error)
    }
    return result
}

export async function getWebsite(id, userId) {
    let result = null
    try {
        result = await prisma.website.findUnique({
            where: {
                id: id,
                userId: userId
            }
        })
    } catch (error) {
        console.error(error)
    }
    return result
}

export async function deleteWebsiteEvents(id) {
    let result = null
    try {
        result = await prisma.websiteEvent.deleteMany({
            where: {
                websiteId: id
            }
        })
    } catch (error) {
        console.error(error)
    }
    return result
}

export async function deleteWebsite(id) {
    let result = null
    try {
        result = await prisma.website.delete({
            where: {
                id: id
            }
        })
    } catch (error) {
        console.error(error)
    }
    return result
}

export async function editWebsite(id, name, domain, enablePublic) {
    let result = null
    try {
        result = await prisma.website.update({
            where: {
                id: id
            },
            data: {
                name: name,
                domain: domain,
                public: enablePublic
            }
        })
    } catch (error) {
        console.error(error)
    }
    return result
}

export async function editWebsitePublicId(id, publicId) {
    let result = null
    try {
        result = await prisma.website.update({
            where: {
                id: id
            },
            data: {
                publicId: publicId
            }
        })
    } catch (error) {
        console.error(error)
    }
    return result
}

export async function addWebsiteEvent(id, websiteId, event, title, path, params, referrer, fingerprint, ipAddress, userAgent, device, browser, os, language, countryIso, countryName) {
    let result = null
    try {
        result = await prisma.websiteEvent.create({
            data: {
                id: id,
                websiteId: websiteId,
                event: event,
                title: title,
                path: path,
                params: params,
                referrer: referrer,
                fingerprint: fingerprint,
                ipAddress: ipAddress,
                userAgent: userAgent,
                device: device,
                browser: browser,
                os: os,
                language: language,
                countryIso: countryIso,
                countryName: countryName
            }
        })
    } catch (error) {
        console.error(error)
    }
    return result
}

export async function getWebsiteEventCount(websiteId, event, start, end) {
    let result = null
    try {
        result = await prisma.websiteEvent.aggregate({
            where: {
                websiteId: websiteId,
                event: event,
                created: {
                    gte: start,
                    lte: end
                }
            },
            _count: true,
        })
    } catch (error) {
        console.error(error)
    }
    return result
}

export async function getUniqueWebsiteEvent(websiteId, event, group, start, end) {
    let result = null
    try {
        result = await prisma.websiteEvent.groupBy({
            by: [group],
            where: {
                websiteId: websiteId,
                event: event,
                created: {
                    gte: start,
                    lte: end
                }
            },
            _count: true,
            orderBy: {
                _count: {
                    id: 'desc'
                }
            }
        })
    } catch (error) {
        console.error(error)
    }
    return result
}

// export async function getWebsiteEventByMinute(websiteId, event, start, end) {
//  let result = null
//  try {
//   result = await prisma.$queryRaw`SELECT CAST(CONCAT(EXTRACT(YEAR FROM created), '-', EXTRACT(MONTH FROM created), '-', EXTRACT(DAY FROM created), ' ', EXTRACT(HOUR FROM created), ':', EXTRACT(MINUTE FROM created)) AS timestamp) AS date, COUNT(*)::int AS views FROM public.website_event WHERE "websiteId" = ${websiteId} AND event = ${event} AND created >= ${start} AND created <= ${end} GROUP BY date ORDER BY date`
//  } catch (error) {
//   console.error(error)
//  }
//  return result
// }

export async function getWebsiteEventByHour(websiteId, event, start, end) {
    let result = null
    try {
        result = await prisma.$queryRaw`SELECT CAST(CONCAT(EXTRACT(YEAR FROM created), '-', EXTRACT(MONTH FROM created), '-', EXTRACT(DAY FROM created), ' ', EXTRACT(HOUR FROM created), ':00') AS timestamp) AS date, COUNT(*)::int AS views FROM public.website_event WHERE "websiteId" = ${websiteId} AND event = ${event} AND created >= ${start} AND created <= ${end} GROUP BY date ORDER BY date`
    } catch (error) {
        console.error(error)
    }
    return result
}

// export async function getWebsiteEventByDay(websiteId, event, start, end) {
//  let result = null
//  try {
//   result = await prisma.$queryRaw`SELECT CAST(CONCAT(EXTRACT(YEAR FROM created), '-', EXTRACT(MONTH FROM created), '-', EXTRACT(DAY FROM created), ' ', '00:00') AS timestamp) AS date, COUNT(*)::int AS views FROM public.website_event WHERE "websiteId" = ${websiteId} AND event = ${event} AND created >= ${start} AND created <= ${end} GROUP BY date ORDER BY date`
//  } catch (error) {
//   console.error(error)
//  }
//  return result
// }

export async function getGroupCount(websiteId, group, start, end, limit = null) {
    let result = null
    let query = {
        by: [group],
        where: {
            websiteId: websiteId,
            created: {
                gte: start,
                lte: end
            }
        },
        _count: true,
        orderBy: {
            _count: {
                id: 'desc'
            }
        }
    }
    if (limit !== null) {
        query.take = parseInt(limit)
    }
    try {
        result = await prisma.websiteEvent.groupBy(query)
    } catch (error) {
        console.error(error)
    }
    return result
}

// export async function getAllWebsiteEvents(websiteId, start, end) {
//  let result = null
//  try {
//   result = await prisma.websiteEvent.findMany({
//    where: {
//     websiteId: websiteId,
//     created: {
//      gte: start,
//      lte: end
//     }
//    }
//   })
//  } catch (error) {
//   console.error(error)
//  }
//  return result
// }