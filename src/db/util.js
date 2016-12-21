module.exports = {
    getUrlParam: function(key) {
        var search = location.search;
        var arr = !search ? [] : location.search.substr(1).split('&');
        var param = {};
        for (var i=0, l=arr.length; i<l; i++) {
            var kv = arr[i].split('=');
            param[kv[0]] = kv[1];
        }
        return key ? (param[key] || '') : param;
    },
    getUserKey: function(redirectUrl,login){
        // var userKey = this.getUrlParam('userKey') || localStorage.getItem('auth');
        var userKey = localStorage.getItem('auth');
        if(userKey){
            localStorage.setItem('auth', userKey);
            return userKey;
        }else{
            if(login === false)return false;
            if(redirectUrl){
                window.location.href=window.__loginUrl__+encodeURIComponent('//'+window.location.host+window.location.pathname+redirectUrl);
            }else{
                window.location.href=window.__loginUrl__+encodeURIComponent(window.location.href);
            }
        }
    },
    setLocal: function(key, val){
        localStorage.setItem(key, JSON.stringify(val));
    },
    getLocal: function(key){
        if(localStorage.getItem(key)){
            return JSON.parse(localStorage.getItem(key));
        }else{
            return '';
        }
    },
    removeLocal: function(key){
        localStorage.removeItem(key);
    },
    //uuid生成
    getUnid: function(){
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4(); 
    }
};
