$.ajaxPrefilter(function (options) {
    options.url = "http://www.liulongbin.top:3007" + options.url
    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        const { status, message } = res.responseJSON
        // 判断是否登录
        if (status === 1 && message === '身份认证失败！')
            // 强制清除token
            localStorage.removeItem('token')
        // 跳转到登录页
        location.href = '/login.html'
    }
})