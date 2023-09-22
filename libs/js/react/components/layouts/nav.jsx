"use strict";

var NavComponent = React.createClass({
    getInitialState: function() {
        return {
            isLoggedIn: '',
            user: '',
            id:0,
            email:''
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

        this.serverRequest = $.get('api/get_current_user.php', 
        function(result) {
            if(result != '') {
                var u = JSON.parse(result)[0];
                this.setState({
                    user: u
                });
            }
        }.bind(this));
        
        this.serverRequest = $.post('api/get_current_user.php', 
        function(result) {
            if(result != '') {
                var u = JSON.parse(result)[0];
                this.setState({
                    user: u
                });
            }
        }.bind(this));

        
        // this.serverRequest = $.post('getuserinfo.php', {
        //     email: this.state.user.email
        // },
        // function(results) {
        //     var res = JSON.parse(results);
        //     this.setState({
        //         successLogin: res.message
        //     });
        //     if(res.user != null) {
        //         this.setState({id: res.user.id});
        //         this.setState({email: res.user.email});
                
        //     }
        // }.bind(this));
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        
      $(".page-header h1").text("Welcome to Road Map!");
        return(
              
            
            <div>
            {
                (this.state.isLoggedIn == 'false') ?
                <nav className="navbar navbar-default navbar-fixed-top" style={{ backgroundColor: 'white' }}>
                <div className="container" style={{ width: '85%' }}>
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle pull-left" data-toggle="collapse" data-target="#navbar" style={{  marginTop:'20px'}}>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand">
                      <img src="img/novatechsetlogo.png" alt="Logo" className="imgnavlogo"/>
                    </a>
                  </div>
                  <div id="navbar" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-left" style={{  paddingTop:'10px'}}> {/* Changed from 'navbar-right' to 'navbar-left' */}
                      <li>
                        <a href="#login">Sign In</a>
                      </li>
                      <li>
                        <a href="#register">Sign Up</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
                :
                <nav className="navbar navbar-default navbar-fixed-top" style={{backgroundColor:'white'}}>
                    <div className="container" style={{width:'85%',backgroundColor:'white'}}>


                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle pull-left" data-toggle="collapse" data-target="#navbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#MtIndex">
                            <img src="img/novatechsetlogo.png" className="imgnavlogo" alt="Logo"/>
                            </a>
                        </div>


                        <div id="navbar" className="collapse navbar-collapse" >
                            <ul className="nav navbar-nav navbar-left" style={{  paddingTop:'10px'}}> {/* Changed from 'navbar-right' to 'navbar-left' */}
                                <li className="dropdown">
                                 <a href="#MtIndex" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                 Tools<span className="caret"></span>
                                            
                                       
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#MtIndex">Master Tools</a></li>
                                        <li><a href="#TTools">Third Party Tools</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a href="#MtIndex" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">View<span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#EmpIndex">Employee</a></li>
                                        <li><a href="#ProIndex">Projects</a></li>
                                        <li><a href="#PosIndex">Open Positions</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a href="#MtIndex" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Product<span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#roadIndex">Product Road Map</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a href="#MtIndex" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">MRM<span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#achievementsindex">Technology Achievements & Challenges</a></li>
                                        <li><a href="#techPIndex">Tech-Pending Project</a></li>
                                        {/* <li><a href="#GanttIndex">Gantt Chart</a></li> */}
                                    </ul>
                                </li>
                                
                                <li><a href="#ForecastIndex">Projects Forecast</a></li>
                                <li><a href="#HandleIndex">Task In Handle</a></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right" style={{  paddingTop:'10px'}}> {/* Changed from 'navbar-right' to 'navbar-left' */}
                                <li className="dropdown">

                                    {
                                    (this.state.user != '') ?
                                    <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Welcome, {this.state.user.email} <span className="caret"></span></a>
                                    : null
                                    }

                                    <ul className="dropdown-menu">
                                        <li><a href="#logout" onClick={this.logout}>Sign Out</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            }
            </div>
        );
    }
});