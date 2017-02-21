import DBF from './dbFactory';

// 设置全局的`url`前缀
// 开发环境
let urlPrefix;
if (__LOCAL__) {   
    urlPrefix = '//api.github.com/';
}

// 生产环境
if (__PRO__) {  
    urlPrefix = '//api.github.com/';
    
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

export default DBF.context;