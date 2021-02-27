$(function () { 

    userinfo()
    //请求用户信息
    var form = layui.form
    var layer=layui.layer
    function userinfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // $('.layui-form [name=username]').val(res.data.username)
                form.val('formUserInfo',res.data)
            }
        })
    }
    
    $('.layui-form').on('submit', function (e) { 
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status !==0) { 
                    return layer.msg('获取用户数据失败')
                }
                layer.msg('修改成功')

                window.parent.getUserInfo();
            }
        })
    })

    $('#reset').click(function (e) { 
        e.preventDefault()
        userinfo()
    })
   
})