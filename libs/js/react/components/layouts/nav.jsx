"use strict";

var NavComponent = React.createClass({
    getInitialState: function() {
        return {
            isLoggedIn: '',
            user: ''
        };
    },

    logout: function() {
        $.get('api/logout.php', function(result) {
            if(result == 'ok')
                this.setState({
                    isLoggedIn: 'false'
                });

            window.location.href = "#login";
        }.bind(this));
    },

    componentDidMount: function() {
        this.serverRequest = $.get('api/is_logged_in.php', function(result) {
            this.setState({
                isLoggedIn: result
            });
        }.bind(this));

        this.serverRequest = $.get('api/get_current_user.php', function(result) {
            if(result != '') {
                var u = JSON.parse(result)[0];
                this.setState({
                    user: u
                });
            }
        }.bind(this));
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        return(
            <div>
            {
                (this.state.isLoggedIn == 'false') ?
                <div>
                </div>
                :
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div id="navbar" className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Tools<span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#">Master Tools</a></li>
                                        <li><a href="#TTools">Third Party Tools</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Synergy<span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#">Employee</a></li>
                                        <li><a href="#ProIndex">Projects</a></li>
                                        <li><a href="#PosIndex">Open Positions</a></li>
                                    </ul>
                                </li>
                                {
                                    (this.state.user != '') ?
                                    <li><a>Welcome, {this.state.user.email}</a></li>
                                    : null
                                }
                                <li><a href="#logout" onClick={this.logout}>Sign Out</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            }
            </div>
        );
    }
});