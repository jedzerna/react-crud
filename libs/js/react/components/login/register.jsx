

var RegisterComponent = React.createClass({
    getInitialState: function() {
        return {
            email: '',
            password: '',
            passwordConfirmation: '',
            user: null,
            successRegister: null,
            isLoggedIn: '',
            userFocused: false,
            passFocused:false,
            confirmFocused: false,

        };
    },

    componentDidMount: function() {
        this.serverRequest = $.get('api/is_logged_in.php', function(result) {
            this.setState({
                isLoggedIn: result
            });
        }.bind(this));
        $('.page-header h1').text('');
        document.title = "Nova Techset | Register";
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

    handleFocus() {
        this.setState({ userFocused: true });
      },
    
      handleBlur() {
        this.setState({ userFocused: false });
      },


      passhandleFocus() {
        this.setState({ passFocused: true });
      },
    
      passhandleBlur() {
        this.setState({ passFocused: false });
      },

     confirmhandleFocus() {
        this.setState({ confirmFocused: true });
      },
    
      confirmhandleBlur() {
        this.setState({ confirmFocused: false });
      },

    render: function() {
        if(this.state.isLoggedIn == 'true')
            window.location.href = '#';

            const { userFocused } = this.state;
            const { passFocused } = this.state;
            const { confirmFocused } = this.state;
        return (

           
            <div style={{width:'100%',height:'80vh'}}>
                    <div class="container">
                        <div class="row">
                            
                        <div className="logininputleft">
                        <div className="logininput text-center">
                            
                        <img src="img/novatechsetlogo.png" alt="Logo"/>
                   
                   <h1 className="">Sign up</h1>
                            {
                            this.state.successRegister == "true" ?
                                <div className="alert alert-success"  style={{width:'70%'}}>
                                    You have been registered successfully. You may now log in. 
                                    <a href="#login">Click Here</a>
                                </div>
                                : null
                            }
                            {
                            this.state.successRegister != "true" && this.state.successRegister != null ?
                                <div className="alert alert-danger"  style={{width:'70%'}}>
                                    {this.state.successRegister}
                                </div>
                                : null
                            }

                                    <div className="custom-floating-label-input">
                                        <label className={userFocused || this.state.email ? 'active' : ''}>Email Address</label>
                                        <input
                                        type="email"
                                        name="email"
                                        onFocus={this.handleFocus}
                                        onBlur={this.handleBlur}
                                        onChange={this.onEmailChanged}
                                        value={this.state.email}
                                        />
                                    </div>



                                    <div className="custom-floating-label-input">
                                        <label className={passFocused || this.state.password ? 'active' : ''}>Password</label>
                                        <input
                                        type="password"
                                        name="password"
                                        onFocus={this.passhandleFocus}
                                        onBlur={this.passhandleBlur}
                                        onChange={this.onPasswordChanged}
                                        value={this.state.password}
                                        />
                                    </div>


                                    <div className="custom-floating-label-input">
                                        <label className={confirmFocused || this.state.passwordConfirmation ? 'active' : ''}>Confirm Password</label>
                                        <input
                                        type="password"
                                        name="password_confirmation"
                                        onFocus={this.confirmFocused}
                                        onBlur={this.confirmhandleBlur}
                                        onChange={this.onConfirmPasswordChanged}
                                        value={this.state.passwordConfirmation}
                                        />
                                    </div>

                                    {/* <div class="bg-info p-3">
                                        <input type="email" className="form-control-forlogin" placeholder="Email address" name="email" value={this.state.email} onChange={this.onEmailChanged}/>
                                    </div>
                                        <br/>
                                    <div class="bg-info p-3">
                                        <input type="password" className="form-control-forlogin" placeholder="Password" name="password" value={this.state.password} onChange={this.onPasswordChanged}/>
                                    </div>
                                        <br/>
                                    <div class="bg-info p-3">
                                        <input type="password" className="form-control-forlogin" placeholder="Confirm Password" name="password_confirmation" value={this.state.passwordConfirmation} onChange={this.onConfirmPasswordChanged} />
                                    </div> */}
                                        <br/>
                                    <a href={"#login"} className="pull-left">Already have an account?</a>
                                    <div class="bg-info p-3">
                                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login} style={{width:'70%',marginTop:'5%'}}>Register</button>
                                    </div>
                        </div>
                        </div>
                        
                        <div className="logininputright">
                              <div className="logininfoborder">
                                <div className="logininfo"> 
                                    <h1 style={{color:'#e71e4a'}}>Quality</h1>
                                    <h1 style={{color:'#737170'}}>Service</h1>
                                    <h1 style={{color:'#e71e4a'}}>Excellence</h1>
                                </div>
                              </div>
                               
                            </div>
                    </div>
                </div>
            </div>
        );
    }
});