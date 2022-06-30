const URL = "https://forum2022.codeschool.cloud"

var app = new Vue ({
    el: '#app',
    data: {
        loginEmailInput: '',
        loginPasswordInput: '',

        newEmailInput: '',
        newPasswordInput: '',
        newFullnameInput: ''

    },

    methods: {
        //GET /Session - Ask the server if we are logged in
        getSession: async function () {
            let response = await fetch(`${URL}/session`, {
                method: 'GET',
                credentials: 'include'
            });
            //Are we logged in
            if (response.status == 200) {
                console.log("logged in");
                let data = await response.json();
                console.log(data);

            } else if (response.status == 400) {
                console.log("Not logged in");
                let data = await response.json();
                console.log(data);


            } else {
                console.log("Some sort of error when GETTING /session:")
            }
        },

        //Post /session - Attempt to login
        postSession: async function () {
            let loginCredentials = {username: this.loginEmailInput, password: this.loginPasswordInput};

            let response = await fetch (URL + "/session", {
                method: 'POST',
                body: JSON.stringify(loginCredentials),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            });

    

            // 1.parse response body
            let body = response.json();
            console.log(body);

            // 2.check - was the login successful?
            if (response.status == 201) {
                console.log("Successful login attempt");

                //clear inputs
                this.loginEmailInputs = "";
                this.loginpasswordInputs = "";

                // take user to a home page



            } else if (response.status == 401) {

                
                console.log("Unsuccessful login attempt");
                this.loginPasswordInput = '';

            } else {
                console.log("Some sort of error when POSTING /session", response.status, response);
            }


        },
        //Post /user - Creating a new account

        postUser: async function () {
            let newUser = {username: this.newEmailInput, fullname: this.newFullnameInput, password: this.newPasswordInput};

            let response = await fetch (URL + "/user", {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            });
            // 1.parse response body
            let body = response.json();
            console.log(body);

            // 2.check - was the login successful?
            if (response.status == 201) {
                console.log("successfully created account!");

                //clear inputs
                this.loginEmailInputs = "";
                this.loginpasswordInputs = "";

                // take user to a home page



            } else if (response.status == 401) {

                
                console.log("unsuccessfully created account!");
                this.loginPasswordInput = '';

            } else {
                console.log("Some sort of error when POSTING /user", response.status, response);
            }



        }   

    },

    created: function () {
        this.getSession();
    }
})