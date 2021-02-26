$.ajaxPrefilter(function (options) {
    //options是每次调用ajax请求的时候 传递的配置对象
    //这个函数调用之后才会发起真正的请求

    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    

   // url路径中包含/my/则需要加
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
        Authorization: localStorage.getItem('token') ||""
        }
    }
    
    //每次发起ajax请求前都会添加complete回调函数
    options.complete = function (res) {
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') { 
        localStorage.removeItem('token')
        location.href='/login.html'
    }}
    
 })