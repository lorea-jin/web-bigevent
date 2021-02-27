$(function () { 
    var form = layui.form
    var layer=layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) { 
            if (value !== $('.layui-form [name=newPwd]').val()) {
                return ('两次密码不一致，请重新输入')
             }
        },
        samePwd: function (value) {
            if (value == $('.layui-form [name=oldPwd]').val()) {
                return('新密码和旧密码一致')
            }
         }
            
        
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url:'/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status !==0) { 
                  return layer.msg(res.message)
                }
                layer.msg('更新密码成功')
               
                console.log($('.layui-form')[0]);
                $('.layui-form')[0].reset()
            }
        })
    })
})