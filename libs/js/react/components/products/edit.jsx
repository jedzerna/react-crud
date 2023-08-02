"use strict";

var UpdateProductComponent = React.createClass({
    getInitialState:function() {
        return {
            id: 0,
            department: '',
            toolname: '',
            productname: '',
            publishers: '',
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
        this.serverRequestCat.abort();
        this.serverRequestProd.abort();
    },

    onNameChange: function(e) {
        this.setState({department: e.target.value});
    },

    onCategoryChange: function(e) {
        this.setState({publishers: e.target.value});
    },

    onDescriptionChange: function(e) {
        this.setState({toolname: e.target.value});
    },

    onPriceChange: function(e) {
        this.setState({productname: e.target.value});
    },

    onSave: function(e) {
        $.post('api/update_product.php', {
                id: this.state.id,
                department: this.state.department,
                toolname: this.state.toolname,
                productname: this.state.productname,
                publishers: this.state.publishers
            },
            function(res) {
                this.setState({successUpdate: res});
            }.bind(this));
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
                                    onChange={this.onNameChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>toolname</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.toolname}
                                        onChange={this.onDescriptionChange}></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>productname</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.productname}
                                        onChange={this.onDescriptionChange}></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>publishers</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.publishers}
                                        onChange={this.onDescriptionChange}></textarea>
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