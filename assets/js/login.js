$(function () {
    // 功能1：注册和登录功能的切换
    /* 
    1.点击去注册，让注册盒子显示，登录盒子隐藏
    2.点击去注册，让登录盒子显示，注册盒子隐藏
    */
    $("#link_reg").on('click', function () {
        $('.login-box').css('display', 'none')
        $('.reg-box').show()
    })
    $("#link_login").on('click', function () {
        $('.login-box').css('display', 'block')
        $('.reg-box').hide()
    })


    // 校验
    layui.form.verify({
        pwd: [/^[\S]{6,15}$/, '密码长度必须是6-15位的非空字符串'],
        repwd: function (value, item) {
            // value是确认密码框中的内容，item是确认密码框的dom元素
            // 密码框中的值
            const password = $('#form_reg [name=password]').val().trim()
            if (password !== value) {
                return '两次输入的密码不一致！'
            }
        }
    })

    // 功能2：实现注册功能
    /* 
    1.给表单注册submit事件
    2.阻止表单的默认同步提交事件
    3.收集表单中的数据
    4.非空校验
    5.校验通过，发起ajax请求
    6.判断请求成功与否
    7.成功则显示登录盒子
    */
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        const username = $('#form_reg [name=username]').val().trim()
        const password = $('#form_reg [name=password]').val().trim()
        $.ajax({
            method: "post",
            url: "/api/reguser",
            data: {
                username,
                password
            },
            success: function (res) {
                console.log(res)
                if (res.status !== 0) return layer.msg(res.message, { icon: 5 })
                layer.msg(res.message, {
                    icon: 6,
                    time: 1000
                }, function () {
                    $("#link_login").click()
                })
            }
        })
    })

    // 功能3：实现登录功能
    /* 
       1.给表单注册submit提交事件
       2.阻止表单的默认提交
       3.收集表单数据
       4.对表单数据做校验
       5.如果校验通过，发起ajax请求
       6.判断请求成功与否
       7.如果成功，跳转到首页
    */
    $('#form_login').on("submit", function (e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data,
            success: function (res) {
                if (res.status) return layer.msg(res.message, { icon: 5 })
                layer.msg(res.message, { icon: 1, time: 1000 }, function () {
                    // 保存token
                    localStorage.setItem('token', res.token)
                    location.href = '/index.html'
                })
            }
        })
    })
})