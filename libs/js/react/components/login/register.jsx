

var RegisterComponent = React.createClass({
    getInitialState: function() {
        return {
            email: '',
            password: '',
            passwordConfirmation: '',
            user: null,
            successRegister: null,
            isLoggedIn: ''
        };
    },

    componentDidMount: function() {
        this.serverRequest = $.get('api/is_logged_in.php', function(result) {
            this.setState({
                isLoggedIn: result
            });
        }.bind(this));
        $('.page-header h1').text('Sign Up');
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    login: function(e) {
        $.post('api/register.php', {
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.passwordConfirmation
            },
            function(res) {
                this.setState({successRegister: res});
                if(res == 'true') {
                    this.setState({email: ''});
                    this.setState({password: ''});
                    this.setState({passwordConfirmation: ''});
                }
            }.bind(this));
        e.preventDefault();
    },

    onEmailChanged: function(e) {
        this.setState({
            email: e.target.value
        });
    },

    onPasswordChanged: function(e) {
        this.setState({
            password: e.target.value
        });
    },

    onConfirmPasswordChanged: function(e) {
        this.setState({
            passwordConfirmation: e.target.value
        });
    },

    render: function() {
        if(this.state.isLoggedIn == 'true')
            window.location.href = '#';

        return (

           

        //     <div class="container" style={{width:'100%',backgroundColor:'red'}}>
        //     <div class="row">
        //       <div class="col-md-1">
        //         <h2>Login</h2>
        //         <div class="form-group">
        //           <input type="text" class="form-control" placeholder="Username"/>
        //         </div>
        //         <div class="form-group">
        //           <input type="password" class="form-control" placeholder="Password"/>
        //         </div>
        //       </div>
        //       <div class="col-md-6">
        //         <div class="logo">
        //           {/* <!-- You can place an actual logo image here --> */}
        //                     <img src="img/novatechsetlogo.png" alt="Logo" style={{width:'40px',height:'40px'}}/>
        //           Logo
        //         </div>
        //         <p>Welcome to our website!</p>
        //       </div>
        //     </div>
        //   </div>






            <div style={{width:'100%'}}>
                  <div class="container mt-5">
                    <form>
                        {
                            this.state.successRegister == "true" ?
                                <div className="alert alert-success"  style={{width:'30%'}}>
                                    You have been registered successfully. You may now log in. 
                                    <a href="#login">Click Here</a>
                                </div>
                                : null
                        }
                        {
                            this.state.successRegister != "true" && this.state.successRegister != null ?
                                <div className="alert alert-danger"  style={{width:'30%'}}>
                                    {this.state.successRegister}
                                </div>
                                : null
                        }

                    <div class="row">
                        <div class="col-md-4">
                            <div class="bg-info p-3">
                                <input type="email" className="form-control" placeholder="Email address" name="email" value={this.state.email} onChange={this.onEmailChanged} style={{width:'30%',height:'45px'}}/>
                            </div>
                                <br/>
                            <div class="bg-info p-3">
                                <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.onPasswordChanged} style={{width:'30%',height:'45px'}}/>
                            </div>
                                <br/>
                            <div class="bg-info p-3">
                                <input type="password" className="form-control" placeholder="Confirm Password" name="password_confirmation" value={this.state.passwordConfirmation} onChange={this.onConfirmPasswordChanged} style={{width:'30%',height:'45px'}}/>
                            </div>
                                <br/>
                            <div class="bg-info p-3">
                                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login} style={{width:'30%'}}>Register</button>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        );
    }
});