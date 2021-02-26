$(function () { 



    //【所有layui里面】自带的属性和方法都要先导出 layui.要用的属性  用变量接收调用出来。
    //var form=layui.form 才可以用   form下的各种属性
    //var layer=layui.layer 才可以用layer下面的属性

    //显示隐藏对于div、ajax传递对于表单

    $('#linkToLogin').on('click', function () { 
        $('.login-box').show()
        $('.reg-box').hide()
    })


    $('#linkToReg').on('click', function () { 
        $('.login-box').hide()
        $('.reg-box').show()
      
    })

   
    var form = layui.form
    var layer = layui.layer
    
    // 验证表单
    form.verify({
        psw: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        repsw: function (value) { //value是表单的值
            var firstpsw=$('#form-reg [name=password]').val()
          
            if (value !== firstpsw) { 
                return '两次密码不一致';
            }

        }
       
    })

    //ajax传递参数-注册信息
   
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            console.log(res);
            if (res.status !== 0) { 
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            $('#linkToLogin').click()
        })

     })

    //ajax传递参数-登陆
    $('#form-login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data:$(this).serialize(),
            success: function (res) {
                if (res.stauts !== 0) { layer.msg('登陆失败') };
                layer.msg('登陆成功')
                localStorage.setItem('token', res.token)
                location.href='/index.html'
                
            }
        })

        
     })
    
})