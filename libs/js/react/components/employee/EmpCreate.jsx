"use strict";

var EmpCreateComponent = React.createClass({
    getInitialState: function() {
        return {
            EmployeeID:'',
            EmployeeName:'',
            PrimarySkillsets: '',
            SecondarySkillsets: '',
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

        $('.page-header h1').text('Create New');
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    
    onEmployeeIDChange: function(e) {
        this.setState({
            EmployeeID: e.target.value
        });
    },

    onEmployeeNameChange: function(e) {
        this.setState({
            EmployeeName: e.target.value
        });
    },

    onPrimarySkillsetsChange: function(e) {
        this.setState({
            PrimarySkillsets: e.target.value
        });
    },

    onSecondarySkillsetsChange: function(e) {
        this.setState({
            SecondarySkillsets: e.target.value
        });
    },

    
    onSave: function(e) {
        $.post('api/employeeAPI/create_employee.php', {
            EmployeeID: this.state.EmployeeID,
            EmployeeName: this.state.EmployeeName,
            PrimarySkillsets: this.state.PrimarySkillsets,
            SecondarySkillsets: this.state.SecondarySkillsets,
           
            },
            function(res) {
                this.setState({successCreation: res});
                if(res == 'true') {
                    this.setState({EmployeeID: ''});
                    this.setState({EmployeeName: ''});
                    this.setState({PrimarySkillsets: ''});
                    this.setState({SecondarySkillsets: ''});
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

                <a href="#EmpIndex"
                   className="btn btn-primary margin-bottom-1em">
                    Back
                </a>

                <form onSubmit={this.onSave}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                            
                        <tr>
                            <td>Employee ID</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.EmployeeID}
                                    required
                                    onChange={this.onEmployeeIDChange}
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td>EmployeeName</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.EmployeeName}
                                    required
                                    onChange={this.onEmployeeNameChange}
                                     />
                            </td>
                        </tr>

                        <tr>
                            <td>PrimarySkillsets</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.PrimarySkillsets}
                                        onChange={this.onPrimarySkillsetsChange}
                                       />
                            </td>
                        </tr>

                        <tr>
                            <td>SecondarySkillsets</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.SecondarySkillsets}
                                        onChange={this.onSecondarySkillsetsChange}
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