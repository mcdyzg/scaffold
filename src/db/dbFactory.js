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

            $.ajax({
                url: config.url,
                type: config.type,
                data: querys,
                dataType:'json'
            })
            .done(resp => {
                let parseRespFunc = DBF.get('defaultParsePesp') || function(){};
                let data = parseRespFunc(resp);
                if(data){
                    resolve(data)
                }else{
                    reject(resp)
                }
            })

            
        })
    }
}

export default DBF