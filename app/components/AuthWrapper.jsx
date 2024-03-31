'use client'

import { useEffect, useState } from 'react'
import UseApi from '@/app/components/UseApi'

export function AuthWrapper({ children }) {
    let [canLoad, setCanLoad] = useState(false)

    useEffect(() => {
        (async function () {
            let request = await UseApi('verify')
            if (request.status === 200) {
                if (['/login', '/register'].includes(location.pathname)) {
                    location = '/'
                } else {
                    setCanLoad(true)
                }

            } else if ((request.status === 401 && (['/login', '/register'].includes(location.pathname) || location.pathname.includes('/p/')))) {
                setCanLoad(true)
            }
        })()
    }, [])

    if (!canLoad) {
        return ''
    }

    return children
}