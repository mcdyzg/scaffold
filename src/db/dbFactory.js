import _assign from 'lodash/assign'
import _map from 'lodash/map'

let DBF = {
    __: {},

    set(key, value) {
        this.__[key] = value;
    },
    get(key) {
        return this.__[key];
    },
    create(name, methods) {
        if (this.context[name]) {
            console.warn('DB: "' + name + '" is existed! ');
            return;
        }
        this.context[name] = new DB(methods);
    },
    context: {
        link: data => this.context.Data = data,
        Data: {}
    }
}

class DB {
    constructor(methods) {
        _map(methods, (config, method) => this[method] = query => {
            let cfg = _assign({},config);
            // cfg.jsonp = config.jsonp || false;
            this.urlPrefix = DBF.get('urlPrefix') || '';
            cfg.url = this.getUrl(config.url)
            // query._csrf = localStorage.getItem('csrfToken') || '';
            return new request(cfg, query)
        });
    }
    getUrl(url){
        if (this.urlPrefix) {
            return this.urlPrefix + url;
        } else {
            return url;
        }
    }
}

class request {
    constructor(config, querys) {
        return new Promise((resolve, reject) => {

            // 使用fetch,有时会出现后台显示请求成功，前台请求不成功，所以换成superagent,暂时没发现问题
            let temData = '';
            let temConfig = {
                method : config.type,
                // credentials:config.credentials || 'same-origin',
                headers: {
                    "Accept": "application/json",
                    // 'Content-Type': config.contentType || 'application/json;charset=UTF-8',
                    "Content-Type": config.contentType || "application/x-www-form-urlencoded"
                },
            };
            if(config.type === 'GET'){
                _map(querys,(value,name)=>{
                    temData += `${name}=${value}&`
                })
            }else if(config.type === 'POST'){
                temConfig.body = JSON.stringify(querys);
            }
            fetch(`${config.url}${config.type==='GET'?'?'+temData:''}`,temConfig)
            .then((res)=>{return res.json()},(err)=>{
                reject({
                    status: '404',
                    msg:'请求失败，请稍后重试',
                    err:err,
                })
            })
            .then((res)=>{
                resolve(DBF.get('defaultParsePesp')(res))
            })

            // $.ajax({
            //     url: config.url,
            //     type: config.type,
            //     data: querys,
            //     dataType:'json'
            // })
            // .done(resp => {
            //     let parseRespFunc = DBF.get('defaultParsePesp') || function(){};
            //     let data = parseRespFunc(resp);
            //     if(data){
            //         resolve(data)
            //     }else{
            //         reject(resp)
            //     }
            // })

            
        })
    }
}

export default DBF