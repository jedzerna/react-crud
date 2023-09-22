"use strict";

var LoginComponent = React.createClass({
    getInitialState: function() {
        return {
            id: null,
            email: '',
            password: '',
            remember: null,
            user: null,
            successLogin: null,
            isLoggedIn: '',
            isFocused: false,
            value: '',
            passisFocused: false,
            passvalue: '',
        };
    },
    componentDidMount: function() {
        this.serverRequest = $.get('api/is_logged_in.php', function(result) {
            this.setState({
                isLoggedIn: result
            });

            if(result == 'true')
                window.location.href = '#';
        }.bind(this));
        $('.page-header h1').text('');
        document.title = "Nova Techset | Login";
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
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

    login: function(e) {
        $.post('api/login.php', {
                email: this.state.value,
                password: this.state.passvalue
            },
            function(result) {
                var res = JSON.parse(result);
                this.setState({
                    successLogin: res.message
                });
                if(res.user != null) {
                    this.setState({id: res.user.id});
                    this.setState({email: res.user.email});  
                    window.location.reload();
                }
            }.bind(this));
        e.preventDefault();
    },

    handleFocus() {
        this.setState({ isFocused: true });
      },
    
      handleBlur() {
        this.setState({ isFocused: false });
      },
    
      handleChange(event) {
        this.setState({ value: event.target.value });
      },


      passhandleFocus() {
        this.setState({ passisFocused: true });
      },
    
      passhandleBlur() {
        this.setState({ passisFocused: false });
      },
    
      passhandleChange(event) {
        this.setState({ passvalue: event.target.value });
      },

    render: function() {
        const { isFocused, value } = this.state;
        const { passisFocused, passvalue } = this.state;
        return (
            <div style={{width:'100%',height:'80vh'}}>
                

                    {/* <div class="row">
                        <div class="col-md-4">
                            <div class="bg-info p-3">
                                <input type="email" className="form-control" placeholder="Email address" name="email" value={this.state.email} onChange={this.onEmailChanged} style={{width:'30%',height:'45px'}}/>
                            </div>
                                            <br/>
                            <div class="bg-info p-3">
                                <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.onPasswordChanged} style={{width:'30%',height:'45px'}}/>
                            </div>
                                            <br/>
                            <div class="bg-info p-3">
                            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login} style={{width:'30%'}}>Sign in</button>
                                            </div>
                                            <br/>
                            <div class="bg-info p-3">
                                <a
                                href={"#register"}
                                className="btn btn-lg btn btn-success btn-block"
                                style={{width:'30%',margin:'0px'}}
                                >
                                    Register
                                </a>
                            </div>
                        </div>
                    </div> */}
                    <div class="container">
                        
                        <div class="row">
                            <div className="logininputleft">
                                <div className="logininput text-center">
                                    
                                    <img src="img/novatechsetlogo.png" alt="Logo"/>
                   
                                    <h1 className="">Nova Techset</h1>
            
                                    {
                                    this.state.successLogin == 'true' ?
                                        <div className="alert alert-success"  style={{width:'70%'}}>
                                            Successfully log in. 
                                        </div>
                                        : null
                                    }
                                    {
                                    this.state.successLogin != 'true' &&  this.state.successLogin != null?
                                        <div className="alert alert-danger"  style={{width:'70%',marginBottom:'3%'}}>
                                            {this.state.successLogin}
                                        </div>
                                        : null
                                    }
                                 
                               
                                 
                                 <div className="custom-floating-label-input">
                                    <label className={isFocused || value ? 'active' : ''}>Email Address</label>
                                    <input
                                    type="email"
                                    name="email"
                                    onFocus={this.handleFocus}
                                    onBlur={this.handleBlur}
                                    onChange={this.handleChange}
                                    value={value}
                                    />
                                </div>
                                
                                <div className="custom-floating-label-input">
                                    <label className={passisFocused || passvalue ? 'active' : ''}>Password</label>
                                    <input
                                    type="password"
                                    name="password"
                                    onFocus={this.passhandleFocus}
                                    onBlur={this.passhandleBlur}
                                    onChange={this.passhandleChange}
                                    value={passvalue}
                                    />
                                </div>
                                    <br/>
                                    <a href={"#register"} className="pull-left">Create New Account</a>
                                                    <br/>
                                    <div class="bg-info p-3">
                                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login} style={{width:'70%',marginTop:'2%'}}>Sign in</button>
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