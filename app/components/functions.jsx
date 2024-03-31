import { customAlphabet } from 'nanoid'

export function validateDomain(domain) {
 let regex = /^(localhost|(([a-zA-Z0-9-]+\.)*([a-zA-Z0-9-])+\.([a-zA-Z]){2,}))(\:\d+)*$/g
 return regex.test(domain)
}

export function validateEmail(email) {
 let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
 return regex.test(email)
}

export function validatePassword(password) {
 let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,128}$/
 return regex.test(password)
}

export function validateString(value) {
 let valid = false
 if (value !== true && value !== 'true' && value !== false && value !== 'false' && value !== undefined && value !== 'undefined' && value !== null && value !== 'null' && value.trim().length !== 0) {
  valid = true
 }
 return valid
}

export function generateId(length) {
 let alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
 let nanoid = customAlphabet(alphabet, length)
 return nanoid()
}

export function formatDisplayDate(date) {
 let months = { 0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec' }
 let newDate = new Date(date)
 return months[newDate.getMonth()] + ' ' + newDate.getDate() + ', ' + newDate.getFullYear()
}

export function formatYMD(date) {
 let newDate = new Date(date)
 return newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate()
}

function sortDate(a, b) {
 let date1 = new Date(a.date)
 let date2 = new Date(b.date)
 return date1 - date2
}