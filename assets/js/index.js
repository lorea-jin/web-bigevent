$(function () {

    var layer = layui.layer
    
    //getUserInfo函数
    getUserInfo()



    $('#btn-logout').on('click', function () { 

        layer.confirm('确定退出登陆?', {icon: 3, title:'提示'}, function(index){//确定退出do something
             
            //退出后（1）删除本地token （2）跳转
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
          });
    })



})

function getUserInfo() { 
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // headers: {
        //     Authorization: localStorage.getItem('token') ||""
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !==0) { 
                return layui.layer.msg('获取用户信息失败')
            }
            renderUser(res.data)
        },
        // complete: function (res) { 
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') { 
        //         localStorage.removeItem('token')
        //         location.href='/login.html'
        //     }
        // }
    })
}


function renderUser(user) { 
    var firstName=user.nickname||user.username

    $('.welcome').html('欢迎&nbsp;&nbsp;'+firstName)
        
    // 渲染头像

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide();
    } else { 
        $('.text-avatar').html(firstName[0].toUpperCase()).show();
        $('.layui-nav-img').hide()
    }
}
