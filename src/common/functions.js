// functions.js

export const sleep = ms => new Promise(resolve => 
    setTimeout(resolve, ms ?? 1000))

export const debounce = (callback, limit) => {
    limit = limit || 300 // default limit value
    let timeout
    return () => {
        clearTimeout(timeout)
        timeout = setTimeout(() => callback(), limit)
    }
}
