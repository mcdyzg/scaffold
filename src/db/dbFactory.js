var ua           = navigator.userAgent;
var isMobile     = !!ua.match(/mobile/i);
var Q            = require('q');
/**
 * 目前该项目只支持创建一个DB上下文 
 * 即所有的DB实例都保存在`DBFactory.context`下
 * 
 * TODO 后续增加对复杂项目的支持，允许同时创建多个`DBFactory.context`，比如
 *      一个模块对应一个`DB context`
 *      DBFactory.createContext('Xxx').create('Xxx', methods)
 */
var DBFactory = {
    __: {},
    set: function (key, value) {
        this.__[key] = value;
    },
    get: function (key) {
        return this.__[key];
    },
    create: function (name, methods) {
        // 禁止创建重名的DB实例
        if (this.context[name]) {
            console.warn('DB: "' + name + '" is existed! ');
            return;
        }
        return this.context[name] = new DB(name, methods);
    },
    // 存储db实例
    context: {
        link: function (data) {
            DBFactory.context.Data = data;
        },
        // 占位 禁止覆盖
        Data: {}
    }
};



function DB(DBName, methods) {
    var t = this;
    t.cache = {};
    $.each(methods, function (method, config) {

        if (typeof config === 'function') {
            t[method] = config;
            return;
        }

        t[method] = function (query) {
            var cfg = {};

            cfg.method = method;

            cfg.DBName = DBName;

            cfg.query = $.extend({}, config.query || {}, query || {});

            t.urlPrefix = DBFactory.get('urlPrefix') || '';

            // 是否是外部的api
            cfg.isWebApi = typeof config.isWebApi === 'boolean' ? config.isWebApi : false;

            cfg.url = t.getUrl(config.url, cfg.isWebApi);

            cfg.parseResp = config.parseResp || '';

            // 是否是全局只获取一次
            cfg.once = typeof config.once === 'boolean' ? config.once : false;

            // 数据缓存，如果`once`设置为true，则在第二次请求的时候直接返回改缓存数据。
            t.cache[method] = t.cache[method] || null;

            cfg.jsonp = config.jsonp || false;
            cfg.type = config.type || 'POST';
            return request(cfg, t);
        }

        if (config.test) {
            console.log('_____【 '+DBName+'.'+method+'() 】_____');
            t[method]().then(function (data) {
                console.log(data);
            });
        }

    })
}

$.extend(DB.prototype, {
    /**
     * 获取正式接口的完整`url`
     * 如果通过`DB.set('urlPrefix', 'https://xxx')`设置了全局`url`的前缀，则执行补全
     */
    getUrl: function (url, isWebApi) {
        if(isWebApi){
            return url;
        }else{
            if (this.urlPrefix) {
                return this.urlPrefix + url;
            } else {
                return url;
            }
        }
        
    }
});

function request(cfg, db) {
    var deferred = Q.defer();
    if (cfg.once && db.cache[cfg.method]) {
        deferred.resolve(db.cache[cfg.method]);
    } else {
        var query;

        var mergeQuery = {};
        mergeQuery['__' + cfg.DBName + '.' + cfg.method + '()__'] = '';
        if (cfg.isMock) {
            mergeQuery.m = 1;
        }

        query = $.extend({}, mergeQuery, cfg.query);

        var resfparam = cfg.url.match(/\{\w+\}/g);
        var omit = [];
        if(resfparam && resfparam.length){
            var temp = '';
            for (var i = resfparam.length - 1; i >= 0; i--) {
                temp = resfparam[i].replace('{', '').replace('}', '');
                cfg.url = cfg.url.replace(resfparam, query[temp]||'');
                omit.push(temp);
            }
        }
        // query = _.omit(query, omit);
        var ajaxOptions = {
            url : cfg.url,
            type: "POST",
            data: query,
            success: function(resp) {
                var parseRespFunc = cfg.parseResp || DBFactory.get('defaultParsePesp');
                var data = parseRespFunc(resp);
                if(data){
                    // 需要缓存数据的情况
                    cfg.once && (db.cache[cfg.method] = data);
                    deferred.resolve(data);
                }else{
                    //errorcode
                    deferred.reject(resp);
                }
                
            },
            error: function (xhr, errorType, error) {
                // window.location.href = '#/500';
                console.error(error);
            }
        };
        if (cfg.jsonp === true) {
            ajaxOptions.dataType = 'jsonp';
        } else {
            ajaxOptions.dataType = 'json';
            ajaxOptions.type = cfg.type;
        }

        $.ajax(ajaxOptions);
    }

    return deferred.promise;
}

module.exports = DBFactory;