"use strict";

var TechpCreateComponent = React.createClass({
    getInitialState: function() {
        return {
            
            Team: '',
            Publisher: '',
            ProjectDetails: '',
            ReceivedDate: '',
            DueDate: '',
            CurrentStatus: '',
            Remarks: ''
        
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

        $('.page-header h1').text('Create New Technology Pending Project');
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    
    },

    onTeamChange: function(e) {
        this.setState({
            Team: e.target.value
        });
    },

    onPublisherChange: function(e) {
        this.setState({
            Publisher: e.target.value
        });
    },

    onProjectDetailsChange: function(e) {
        this.setState({
            ProjectDetails: e.target.value
        });
    },
    onReceivedDateChange: function(e) {
        this.setState({
            ReceivedDate: e.target.value
        });
    },
    onDueDateChange: function(e) {
        this.setState({
            DueDate: e.target.value
        });
    },
    onCurrentStatusChange: function(e) {
        this.setState({
            CurrentStatus: e.target.value
        });
    },
    onRemarksChange: function(e) {
        this.setState({
            Remarks: e.target.value
        });
    },
    onSave: function(e) {
        $.post('api/techpAPI/create_pending.php', {
           
            Team: this.state.Team,
            Publisher: this.state.Publisher,
            ProjectDetails: this.state.ProjectDetails,
            ReceivedDate: this.state.ReceivedDate,
            DueDate: this.state.DueDate,
            CurrentStatus: this.state.CurrentStatus,
            Remarks: this.state.Remarks
            },
            function(res) {
                this.setState({successCreation: res});
                if(res == 'true') {
                    
                    this.setState({Team: ''});
                    this.setState({Publisher: ''});
                    this.setState({ProjectDetails: ''});
                    this.setState({ReceivedDate: ''});
                    this.setState({DueDate: ''});
                    this.setState({CurrentStatus: ''});
                    this.setState({Remarks: ''});
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
                            Data was saved.
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

                <a href="#techPIndex"
                   className="btn btn-primary margin-bottom-1em">
                    Back
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
                                       required
                                       />
                            </td>
                        </tr>

                        <tr>
                            <td>Publisher</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.Pubslisher}
                                        onChange={this.onPubslisherChange}
                                        />
                            </td>
                        </tr>
                        <tr>
                            <td>Project Details</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.ProjectDetails}
                                        onChange={this.onProjectDetailsChange}
                                        />
                            </td>
                        </tr>
                        <tr>
                            <td>Received Date</td>
                            <td>
                                <input
                                type="date"
                                        className="form-control"
                                        value={this.state.ReceivedDate}
                                        required
                                        onChange={this.onReceivedDateChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Due Date</td>
                            <td>
                                <input
                                type="date"
                                        className="form-control"
                                        value={this.state.DueDate}
                                        //required
                                        onChange={this.onDueDateChange}
                                        />
                            </td>
                        </tr>
                        <tr>
                            <td>Current Status</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.CurrentStatus}
                                        required
                                        onChange={this.onCurrentStatusChange}
                                        />
                            </td>
                        </tr>
                        <tr>
                            <td>Remarks</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.Remarks}
                                        required
                                        onChange={this.onRemarksChange}
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