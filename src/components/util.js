export function hello() {
    return 'hello1'
}

// webpack2默认开启tree-shaking,nouse2没有调用，因此打包的时候不会出现
export function nouse2() {
    return 'nouse2'
}
