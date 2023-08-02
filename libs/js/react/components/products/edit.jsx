"use strict";

var UpdateProductComponent = React.createClass({
    getInitialState:function() {
        return {
            id: 0,
            department: '',
            toolname: '',
            productname: '',
            publishers: '',
            activities: '',
            description: '',
            successUpdate: null,
            isLoggedIn: ''
        };
    },

    componentDidMount: function() {
        var productId = this.props.productId;


        // load form values
        this.serverRequestProd = $.post('api/read_one_product.php',
            {prod_id: productId},
            function(product) {
                var p = JSON.parse(product)[0];
                this.setState({publishers: p.publishers});
                this.setState({id: p.id});
                this.setState({department: p.department});
                this.setState({productname: p.productname});
                this.setState({toolname: p.toolname});
                this.setState({activities: p.activities});
                this.setState({description: p.description});
                $('.page-header h1').text(p.department);
            }.bind(this));

        this.serverRequest = $.get('api/is_logged_in.php', function(result) {
            if(result == 'true')
                this.setState({
                    isLoggedIn: result
                });
            else
                window.location.href = '#';
        }.bind(this));
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
        //this.serverRequestCat.abort();
        this.serverRequestProd.abort();
    },

    ondepartmentChange: function(e) {
        this.setState({department: e.target.value});
    },

    onpublishersChange: function(e) {
        this.setState({publishers: e.target.value});
    },

    ontoolnameChange: function(e) {
        this.setState({toolname: e.target.value});
    },

    onproductnameChange: function(e) {
        this.setState({productname: e.target.value});
    },
    onactivitiesChange: function(e) {
        this.setState({activities: e.target.value});
    },

    ondescriptionChange: function(e) {
        this.setState({description: e.target.value});
    },


    onSave: function(e) {
        $.post('api/update_product.php', {
                id: this.state.id,
                department: this.state.department,
                toolname: this.state.toolname,
                productname: this.state.productname,
                publishers: this.state.publishers,
                activities: this.state.activities,
                description: this.state.description
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
                            Product was updated.
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
                    All Products
                </a>
                <form onSubmit={this.onSave}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                        <tr>
                            <td>department</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.department}
                                    onChange={this.ondepartmentChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>toolname</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.toolname}
                                        onChange={this.ontoolnameChange}></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>productname</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.productname}
                                        onChange={this.onproductnameChange}></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>publishers</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.publishers}
                                        onChange={this.onpublishersChange}></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Activies</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.activities}
                                        onChange={this.onactivitiesChange}></textarea>
                            </td>
                        </tr>
                        
                        <tr>
                            <td>Description</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.description}
                                        onChange={this.ondescriptionChange}></textarea>
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