"use strict";

var ProCreateComponent = React.createClass({
    getInitialState: function() {
        return {
            SkillSets:'',
            SrEngineers: '',
            Intermediates: '',
            JrEngineers: '',
            SubTeam: '',
            Team: ''
        };
    },

    componentDidMount: function() {
        this.serverRequest = $.get('api/is_logged_in.php', function(result) {
            if(result == 'true')
            this.setState({
                isLoggedIn: result
            });
        else
            window.location.href = '#login';

        }.bind(this));

        $('.page-header h1').text('Create Project');
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    

    onSkillSetsChange: function(e) {
        this.setState({
            SkillSets: e.target.value
        });
    },

    onSrEngineersChange: function(e) {
        this.setState({
            SrEngineers: e.target.value
        });
    },

    onIntermediatesChange: function(e) {
        this.setState({
            Intermediates: e.target.value
        });
    },

    onJrEngineersChange: function(e) {
        this.setState({
            JrEngineers: e.target.value
        });
    },

    
    
    onSubTeamChange: function(e) {
        this.setState({
            SubTeam: e.target.value
        });
    },
    onTeamChange: function(e) {
        this.setState({
            Team: e.target.value
        });
    },
    onSave: function(e) {
        $.post('api/projectsAPI/create_projects.php', {
            SkillSets: this.state.SkillSets,
            SrEngineers: this.state.SrEngineers,
            Intermediates: this.state.Intermediates,
            JrEngineers: this.state.JrEngineers,
            SubTeam: this.state.SubTeam,
            Team: this.state.Team
            },
            function(res) {
                this.setState({successCreation: res});
                if(res == 'true') {
                    this.setState({SkillSets: ''});
                    this.setState({SrEngineers: ''});
                    this.setState({Intermediates: ''});
                    this.setState({JrEngineers: ''});
                    this.setState({SubTeam: ''});
                    this.setState({Team: ''});
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
                            Project was saved.
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

                <a href="#ProIndex"
                   className="btn btn-primary margin-bottom-1em">
                    All Project
                </a>

                <form onSubmit={this.onSave}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                        <tr>
                            <td>SkillSets</td>
                            <td>
                                    <textarea
                                    type="text"
                                    className="form-control"
                                    value={this.state.SkillSets}
                                    required
                                    onChange={this.onSkillSetsChange}>
                                    </textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Sr. Engineers</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.SrEngineers}
                                        onChange={this.onSrEngineersChange}
                                       />
                            </td>
                        </tr>

                        <tr>
                            <td>Intermediates</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.Intermediates}
                                        onChange={this.onIntermediatesChange}
                                        />
                            </td>
                        </tr>
                        <tr>
                            <td>Jr. Engineers</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.JrEngineers}
                                        onChange={this.onJrEngineersChange}
                                        />
                            </td>
                        </tr>
                        <tr>
                            <td>Sub Team</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.SubTeam}
                                        required
                                        onChange={this.onSubTeamChange}
                                        />
                            </td>
                        </tr>
                        <tr>
                            <td>Team</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.Team}
                                        required
                                        onChange={this.onTeamChange}
                                        />
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