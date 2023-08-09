"use strict";

var TPshowComponent = React.createClass({
  getInitialState: function () {
    return {
      Team: "",
      Purpose: "",
      SoftwareName: "",
      Details: "",
      License: "",
      site: null,
    };
  },

  componentDidMount: function () {
    var productId = this.props.productId;
    this.serverRequestProd = $.post(
      "api/read_one_thirdparty.php",
      { prod_id: productId },
      function (product) {
        var p = JSON.parse(product)[0];
        this.setState({ Team: p.Team });
        this.setState({ Purpose: p.Purpose });
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
        <a href="#TTools" className="btn btn-primary margin-bottom-1em">
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
              <td>Site</td>
              <td>{this.state.site}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
});
