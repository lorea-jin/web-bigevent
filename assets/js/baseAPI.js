$.ajaxPrefilter(function (options) {
    //options是每次调用ajax请求的时候 传递的配置对象
    //这个函数调用之后才会发起真正的请求

    options.url='http://ajax.frontend.itheima.net'+options.url
 })