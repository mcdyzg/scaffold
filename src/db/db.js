var DBF = require('./dbFactory');

// 设置全局的`url`前缀
// 开发环境
if (__LOCAL__) {   
    var urlPrefix= 
   	'//api.github.com/';
}

// 生产环境
if (__PRO__) {  
    var urlPrefix = 
    '//api.github.com/';
    
}

DBF.set('urlPrefix', urlPrefix);

DBF.set('defaultParsePesp', function(resp){
    return resp;
});

DBF.create('Test', {
	getData:{
		url       :'search/users',
		type      :'GET'
	}
});

module.exports = DBF.context;