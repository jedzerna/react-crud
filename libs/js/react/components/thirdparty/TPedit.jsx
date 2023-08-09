"use strict";

var TPeditComponent = React.createClass({
    getInitialState: function() {
        return {
            Team:'',
            Purpose: '',
            SoftwareName: '',
            Details: '',
            License: '',
            site: null,
            successUpdate: null
        };
    },

    componentDidMount: function() {
        var productId = this.props.productId;


        // load form values
        this.serverRequestProd = $.post('api/read_one_thirdparty.php',
            {prod_id: productId},
            function(product) {
                var p = JSON.parse(product)[0];
                this.setState({Team: p.Team});
                this.setState({Purpose: p.Purpose});
                this.setState({SoftwareName: p.SoftwareName});
                this.setState({Details: p.Details});
                this.setState({License: p.License});
                this.setState({site: p.site});
                $('.page-header h1').text(p.Team);
            }.bind(this));

        // this.serverRequest = $.get('api/is_logged_in.php', function(result) {
        //     // if(result == 'true')
        //     //     this.setState({
        //     //         isLoggedIn: result
        //     //     });
        //     // else
        //     //     window.location.href = '#';
        // }.bind(this));
    },

    componentWillUnmount: function() {
        // this.serverRequest.abort();
        //this.serverRequestCat.abort();
        this.serverRequestProd.abort();
    },

    onTeamChange: function(e) {
        this.setState({Team: e.target.value});
    },

    onPurposeChange: function(e) {
        this.setState({Purpose: e.target.value});
    },

    onSoftwareNameChange: function(e) {
        this.setState({SoftwareName: e.target.value});
    },

    onDetailsChange: function(e) {
        this.setState({Details: e.target.value});
    },
    onLicenseChange: function(e) {
        this.setState({License: e.target.value});
    },

    onsiteChange: function(e) {
        this.setState({site: e.target.value});
    },


    onSave: function(e) {
        $.post('api/update_thirdparty.php', {
                id: this.state.id,
                Team: this.state.Team,
                Purpose: this.state.Purpose,
                SoftwareName: this.state.SoftwareName,
                Details: this.state.Details,
                License: this.state.License,
                site: this.state.site
            },
            function(res) {
                this.setState({successUpdate: res});
            }.bind(this)
            );
        e.preventDefault();
    },

    render: function() {
       
        return (
            <div>
                {
                    this.state.successUpdate == "true" ?
                        <div className="alert alert-success">
                            Tool was updated.
                        </div>
                        : null
                }
                {
                    this.state.successUpdate != "true" && this.state.successUpdate != null ?
                        <div className="alert alert-danger">
                            {this.state.successUpdate}
                        </div>
                        : null
                }

                <a href="#"
                   className="btn btn-primary margin-bottom-1em"
                >
                    All Tools
                </a>
                <form onSubmit={this.onSave}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                        <tr>
                            <td>Team</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.Team}
                                    onChange={this.onTeamChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Purpose</td>
                            <td>
                                <input
                                    type="text"
                                        className="form-control"
                                        value={this.state.Purpose}
                                        onChange={this.onPurposeChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>Software Name</td>
                            <td>
                                <input
                                    type="text"
                                        className="form-control"
                                        value={this.state.SoftwareName}
                                        onChange={this.onSoftwareNameChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>Details</td>
                            <td>
                                <input
                                    type="text"
                                        className="form-control"
                                        value={this.state.Details}
                                        onChange={this.onDetailsChange}/>
                            </td>
                        </tr>

                        <tr>
                            <td>License</td>
                            <td>
                                <input
                                    type="text"
                                        className="form-control"
                                        value={this.state.License}
                                        onChange={this.onLicenseChange}/>
                            </td>
                        </tr>
                        
                        <tr>
                            <td>Site</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.site}
                                        onChange={this.onsiteChange}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button className="btn btn-primary"
                                        onClick={this.onSave}>Save Changes</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});