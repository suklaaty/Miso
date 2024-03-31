require('dotenv').config()

let errors = []

if (!process.env.DATABASE_URL || !/^postgres(ql)?:\/\/.+:.+@.+:\d+\/.+$/.test(process.env.DATABASE_URL)) {
 errors.push('DATABASE_URL is invalid')
}

if (!process.env.AUTH_EXPIRATION || isNaN(process.env.AUTH_EXPIRATION) || process.env.AUTH_EXPIRATION == '0') {
 errors.push('AUTH_EXPIRATION is invalid')
}

if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 12) {
 errors.push('AUTH_SECRET is invalid')
}

if (errors.length) {
 console.log(errors.join('\n'))
 process.exit(1)
}