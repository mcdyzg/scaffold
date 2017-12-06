// import os from 'object-serialize'
import param from 'object-param'

export default new class {
    constructor() {
        this.map = new Map();
    }
    create(name, methods) {
        return this.context[name] = this.DB(methods);
    }
    set(key, value) {
        this.map.set(key, value);
    }
    get(key) {
        return this.map.get(key);
    }
    context() {
        this.link = data => this.context.Data = data;
    }
    DB(methods) {
        for (let method in methods) {
            const config = methods[method];
            this[method] = query => new Request(config, query, method);
        }
        return this;
    }
}

function Request(config,body) {

    let {url,method = ''} = config;
    const option = {
      credentials: 'same-origin',
    };
    if(method.toUpperCase() === 'POST'){
      Object.assign(option, {
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'post',
          body: param(body)
      })
    }else{
      url += `?${param(body)}`
    }

    return new Promise((resolve, reject) => {
        fetch(url, option).then(data => data.json()).then(({success,data,...err}) => {
            if (success) {
                resolve(data)
            } else {
                reject({
                  success,data,...err
                })
            }
        }).catch(()=>reject({
          errorMsg:'请求失败',
        }))
    })
}
