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
            isLoggedIn: ''
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
        $('.page-header h1').text('Sign In');
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
                email: this.state.email,
                password: this.state.password
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

    render: function() {
        return (
            <div style={{width:'100%'}}>
                <div class="container mt-5">
                    <div class="row">
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
                </div>
            </div>
                <div className="col-md-4"></div>
                {/* <div className="col-md-4"> */}
                  
                {/* </div> */}
                <div className="col-md-4"></div>
            </div>
        );
    }
});