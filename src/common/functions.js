// functions.js

export const sleep = ms => new Promise(resolve => 
    setTimeout(resolve, ms ?? 1000))

