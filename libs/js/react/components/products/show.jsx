"use strict";

var ReadOneProductComponent = React.createClass({
    getInitialState: function() {
        return {
            id: 0,
            department: '',
            toolname: '',
            productname: '',
            publishers: ''
        };
    },

    componentDidMount: function() {
        var productId = this.props.productId;

        this.serverRequestProd = $.post('api/read_one_product.php',
            {prod_id: productId},
            function(product) {
                var p = JSON.parse(product)[0];
                this.setState({publishers: p.publishers});
                this.setState({id: p.id});
                this.setState({department: p.department});
                this.setState({toolname: p.toolname});
                this.setState({productname: p.productname});
                $('.page-header h1').text(p.department);
            }.bind(this)
        );
    },

    componentWillUnmount: function() {
        this.serverRequestProd.abort();
    },

    render: function() {
        return (
            <div>
                <a href="#"
                   className="btn btn-primary margin-bottom-1em"
                >
                    All Produscts
                </a>

                <table className="table table-bordered table-responsive">
                    <tbody>
                    <tr>
                        <td>department</td>
                        <td>{this.state.department}</td>
                    </tr>
                    <tr>
                        <td>toolname</td>
                        <td>{this.state.toolname}</td>
                    </tr>
                    <tr>
                        <td>productname</td>
                        <td>{this.state.productname}</td>
                    </tr>
                    <tr>
                        <td>publishers</td>
                        <td>{this.state.publishers}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
});