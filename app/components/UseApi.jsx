export default async function UseApi(path, options = {}) {
    let data = []
    let request
    try {
        options.headers = Object.assign(options.headers ?? {}, { Authorization: `Bearer ${localStorage.getItem('miso.auth') || ''}` })
        request = await fetch(`/api/${path}`, options)
        if (request.status === 401 && !['/login', '/register'].includes(location.pathname) && !location.pathname.includes('/p/')) {
            location = '/login'
        }
        data = await request.json()
    } catch (error) {
        data.push(`Invalid response returned`)
    }
    return { status: request.status, data: data }
}