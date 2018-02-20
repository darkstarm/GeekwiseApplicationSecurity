// event handler for login action
MyBlogApp.loginHandler = function(e) {
    e.preventDefault();
    console.log(e);
    let email = MyBlogApp.getFormInput(e, 'email');
    let password = MyBlogApp.getFormInput(e, 'password');
    MyBlogApp.spin();
    MyBlogApp.request('POST', '/user/login', { email: email, password: password }, (status, data) => {
        console.log(status, data);
        MyBlogApp.spinStop();
        if (status === 200) {
            MyBlogApp.login(data.data);
            document.location.href = '/users/welcome?name=' + data.data.username;
            const localToken = localStorage.setItem('token', data.data.token);
            const localUser = localStorage.setItem('userId', 'random');
        } else if (status === 404) {
            MyBlogApp.toast('danger', data.message);
        } else {
            MyBlogApp.toast('danger', 'An error occurred, please try again.');
        }
    });
}

// setup the event handler
window.onload = function() {
    document.querySelector("form#login-form").addEventListener('submit', MyBlogApp.loginHandler);
}