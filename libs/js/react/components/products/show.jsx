"use strict";

var ReadOneProductComponent = React.createClass({
  getInitialState: function () {
    return {
      id: 0,
      department: "",
      toolname: "",
      productname: "",
      publishers: "",
      activities: "",
      description: "",
    };
  },

  componentDidMount: function () {
    this.serverRequest = $.get('api/is_logged_in.php', function(result) {
      if(result == 'true')
          this.setState({
              isLoggedIn: result
          });
      else
          window.location.href = '#login';
  }.bind(this));
    var productId = this.props.productId;

    this.serverRequestProd = $.post(
      "api/read_one_product.php",
      { prod_id: productId },
      function (product) {
        var p = JSON.parse(product)[0];
        this.setState({ publishers: p.publishers });
        this.setState({ id: p.id });
        this.setState({ department: p.department });
        this.setState({ toolname: p.toolname });
        this.setState({ productname: p.productname });
        this.setState({ activities: p.activities });
        this.setState({ description: p.description });
        $(".page-header h1").text(p.department);
      }.bind(this));
  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
    this.serverRequestProd.abort();
  },

  render: function () {
    return (
      <div>
        <a href="#" className="btn btn-primary margin-bottom-1em">
          All Products
        </a>

        <table className="table table-bordered table-responsive">
          <tbody>
            <tr>
              <td>Department</td>
              <td>{this.state.department}</td>
            </tr>
            <tr>
              <td>Tool Name</td>
              <td>{this.state.toolname}</td>
            </tr>
            <tr>
              <td>Product Name</td>
              <td>{this.state.productname}</td>
            </tr>
            <tr>
              <td>Publishers</td>
              <td>{this.state.publishers}</td>
            </tr>
            <tr>
              <td>Activities</td>
              <td>{this.state.activities}</td>
            </tr>
            <tr>
              <td>Descriptions</td>
              <td>{this.state.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
});
