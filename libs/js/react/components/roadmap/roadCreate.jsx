"use strict";

var RoadCreateComponent = React.createClass({
    getInitialState: function() {
        return {
            toolname:'',
            createdby: '',
            quarter: '',
            description: '',
            developby: '',
            categories: [],
            catname: "",
            user: ''
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

        this.serverRequest = $.get('api/get_current_user.php', function(result) {
            if(result != '') {
                var u = JSON.parse(result)[0];
                this.setState({
                    user: u
                });
            }
        }.bind(this));

        this.serverRequest = $.get('api/roadmap/read_all_roadcategories.php', function(results) {
            this.setState({
                categories: JSON.parse(results)
            });
        }.bind(this));

        $('.page-header h1').text('Create New Project');
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    

    ontoolnameChange: function(e) {
        this.setState({
            toolname: e.target.value
        });
    },

    oncreatedbyChange: function(e) {
        this.setState({
            createdby: e.target.value
        });
    },

    onquarterChange: function(e) {
        this.setState({
            quarter: e.target.value
        });
    },

    ondescriptionChange: function(e) {
        this.setState({
            description: e.target.value
        });
    },

    ondevelopbyChange: function(e) {
        this.setState({
            developby: e.target.value
        });
    },
    onSave: function(e) {
        $.post('api/roadmap/create_road.php', {
            toolname: this.state.toolname,
            createdby: this.state.user.email,
            quarter: this.state.quarter,
            description: this.state.description,
            developby: this.state.developby
            },
            function(res) {
                this.setState({successCreation: res});
                if(res == 'true') {
                    this.setState({toolname: ''});
                    this.setState({quarter: ''});
                    this.setState({description: ''});
                    this.setState({developby: ''});
                }
            }.bind(this));
        e.preventDefault();
    },

    // THE FORM
    render: function() {

        var categoriesOptions = this.state.categories.map(function(category) {
            return (
                <option key={category.categoryname} value={category.categoryname}>{category.categoryname}</option>
            );
        });

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
                            {/* {this.state.successCreation} */}
                            Your toolname has been added. Please pick another toolname.
                        </div>
                        : null
                }

                <a style={{marginBottom:'20px'}} href="#roadIndex" className="btn btn-primary">
                <span className="glyphicon glyphicon-chevron-left"></span>&nbsp; 
                Go Back
                </a>
                <form onSubmit={this.onSave}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                        <tr>
                            <td>Tool Name</td>
                            <td>
                                    <textarea
                                    type="text"
                                    className="form-control"
                                    value={this.state.toolname}
                                    required
                                    onChange={this.ontoolnameChange}>
                                    </textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Created By</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.user.email}
                                        onChange={this.oncreatedbyChange}
                                        disabled
                                       />
                            </td>
                        </tr>

                            <tr>
                            <td>Category</td>
                            <td>
                                <select
                                    onChange={this.onquarterChange}
                                    className="form-control"
                                    value={this.state.quarter}
                                >
                                    <option value="" disabled>Please Select Quarter</option>
                                    {categoriesOptions}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.description}
                                        onChange={this.ondescriptionChange}>
                                        </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>Develop By</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.developby}
                                        required
                                        onChange={this.ondevelopbyChange}
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