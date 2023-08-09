"use strict";

var TPcreateComponent = React.createClass({
    getInitialState: function() {
        return {
            Team:'',
            Purpose: '',
            SoftwareName: '',
            Details: '',
            License: '',
            description: '',
            site: null
        };
    },

    componentDidMount: function() {
        this.serverRequest = $.get('api/is_logged_in.php', function(result) {
            // if(result == 'true')
            //     // this.setState({
                    
            //     // });
            // else
            //     window.location.href = '';

        }.bind(this));

        $('.page-header h1').text('Create Third Party Tool');
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    

    onTeamChange: function(e) {
        this.setState({
            Team: e.target.value
        });
    },

    onPurposeChange: function(e) {
        this.setState({
            Purpose: e.target.value
        });
    },

    onSoftwareNameChange: function(e) {
        this.setState({
            SoftwareName: e.target.value
        });
    },

    onDetailsChange: function(e) {
        this.setState({
            Details: e.target.value
        });
    },

    
    
    onLicenseChange: function(e) {
        this.setState({
            License: e.target.value
        });
    },
    onsiteChange: function(e) {
        this.setState({
            site: e.target.value
        });
    },
    onSave: function(e) {
        $.post('api/create_thirdparty.php', {
            Team: this.state.Team,
            Purpose: this.state.Purpose,
            SoftwareName: this.state.SoftwareName,
            Details: this.state.Details,
            License: this.state.License,
            site: this.state.site
            },
            function(res) {
                this.setState({successCreation: res});
                if(res == 'true') {
                    this.setState({Team: ''});
                    this.setState({toolname: ''});
                    this.setState({SoftwareName: ''});
                    this.setState({Details: ''});
                    this.setState({License: ''});
                    this.setState({site: ''});
                }
            }.bind(this));
        e.preventDefault();
    },

    // THE FORM
    render: function() {
        return (
            <div>
                {
                    this.state.successCreation == "true" ?
                        <div className="alert alert-success">
                            Tool was saved.
                        </div>
                        : null
                }
                {
                    this.state.successCreation != "true" && this.state.successCreation != null ?
                        <div className="alert alert-danger">
                            {this.state.successCreation}
                        </div>
                        : null
                }

                <a href="#TTools"
                   className="btn btn-primary margin-bottom-1em">
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
                                    required
                                    onChange={this.onTeamChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Purpose</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.Purpose}
                                        required
                                        onChange={this.onPurposeChange}
                                       />
                            </td>
                        </tr>

                        <tr>
                            <td>SoftwareName</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.SoftwareName}
                                        required
                                        onChange={this.onSoftwareNameChange}
                                        />
                            </td>
                        </tr>
                        <tr>
                            <td>Details</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.Details}
                                        required
                                        onChange={this.onDetailsChange}
                                        />
                            </td>
                        </tr>
                        <tr>
                            <td>License</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.License}
                                        required
                                        onChange={this.onLicenseChange}
                                        />
                            </td>
                        </tr>
                        <tr>
                            <td>site</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.site}
                                        required
                                        onChange={this.onsiteChange}>
                                    </textarea>
                            </td>
                        </tr>


                        <tr>
                            <td></td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={this.onSave}>
                                    Save
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});