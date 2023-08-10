"use strict";

var TPshowComponent = React.createClass({
  getInitialState: function () {
    return {
      id: 0,
      Team: "",
      Purpose: "",
      SoftwareName: "",
      Details: "",
      License: "",
      site: "",
    };
  },

  componentDidMount: function () {
    var productId = this.props.productId;

    this.serverRequestProd = $.post(
      "api/read_one_product.php",
      { prod_id: productId },
      function (product) {
        var p = JSON.parse(product)[0];
        console.log(p);
        this.setState({ Purpose: p.Purpose });
        this.setState({ id: p.id });
        this.setState({ Team: p.Team });
        this.setState({ SoftwareName: p.SoftwareName });
        this.setState({ Details: p.Details });
        this.setState({ License: p.License });
        this.setState({ site: p.site });
        $(".page-header h1").text(p.Team);
      }.bind(this)
    );
  },

  componentWillUnmount: function () {
    this.serverRequestProd.abort();
  },

  render: function () {
    return (
      <div>
        <a href="#TPtools" className="btn btn-primary margin-bottom-1em">
          All Tools
        </a>

        <table className="table table-bordered table-responsive">
          <tbody>
            <tr>
              <td>Team</td>
              <td>{this.state.Team}</td>
            </tr>
            <tr>
              <td>Purpose</td>
              <td>{this.state.Purpose}</td>
            </tr>
            <tr>
              <td>Software Name</td>
              <td>{this.state.SoftwareName}</td>
            </tr>
            <tr>
              <td>Details</td>
              <td>{this.state.Details}</td>
            </tr>
            <tr>
              <td>License</td>
              <td>{this.state.License}</td>
            </tr>
            <tr>
              <td><Script></Script>ite</td>
              <td>{this.state.site}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
});
"use strict";

var ReadOneProductComponent = React.createClass({
  getInitialState: function () {
    return {
      id: 0,
      Team: "",
      Purpose: "",
      SoftwareName: "",
      Details: "",
      License: "",
      site: "",
    };
  },

  componentDidMount: function () {
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
      }.bind(this)
    );
  },

  componentWillUnmount: function () {
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
