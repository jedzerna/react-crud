"use strict";

var CreateProductComponent = React.createClass({
    getInitialState: function() {
        return {
            publishers:'',
            department: '',
            toolname: '',
            productname: '',
            activities: '',
            description: '',
            successCreation: null,
            isLoggedIn: ''
        };
    },

    componentDidMount: function() {
        this.serverRequest = $.get('api/is_logged_in.php', function(result) {
            if(result == 'true')
                this.setState({
                    isLoggedIn: result
                });
            else
                window.location.href = '#';

        }.bind(this));

        $('.page-header h1').text('Create product');
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    

    ondepartmentChange: function(e) {
        this.setState({
            department: e.target.value
        });
    },

    ontoolnameChange: function(e) {
        this.setState({
            toolname: e.target.value
        });
    },

    onproductnameChange: function(e) {
        this.setState({
            productname: e.target.value
        });
    },

    onpublishersChange: function(e) {
        this.setState({
            publishers: e.target.value
        });
    },

    
    
    onactivitiesChange: function(e) {
        this.setState({
            activities: e.target.value
        });
    },
    ondescriptionChange: function(e) {
        this.setState({
            description: e.target.value
        });
    },
    onSave: function(e) {
        $.post('api/create_product.php', {
            department: this.state.department,
            toolname: this.state.toolname,
            publishers: this.state.publishers,
                productname: this.state.productname,
                activities: this.state.activities,
                description: this.state.description
            },
            function(res) {
                this.setState({successCreation: res});
                if(res == 'true') {
                    this.setState({department: ''});
                    this.setState({toolname: ''});
                    this.setState({publishers: ''});
                    this.setState({productname: ''});
                    this.setState({activities: ''});
                    this.setState({description: ''});
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
                            Product was saved.
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

                <a href="#"
                   className="btn btn-primary margin-bottom-1em">
                    All Products
                </a>

                <form onSubmit={this.onSave}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                        <tr>
                            <td>Department</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.department}
                                    required
                                    onChange={this.ondepartmentChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Tool Name</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.toolname}
                                        required
                                        onChange={this.ontoolnameChange}>
                                    </textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Product Name</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.productname}
                                        required
                                        onChange={this.onproductnameChange}>
                                    </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>All Customers</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.publishers}
                                        required
                                        onChange={this.onpublishersChange}>
                                    </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>Activities</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.activities}
                                        required
                                        onChange={this.onactivitiesChange}>
                                    </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>Descriptions</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.description}
                                        required
                                        onChange={this.ondescriptionChange}>
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