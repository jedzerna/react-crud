"use strict";

var TechpShowComponent = React.createClass({
  getInitialState: function () {
    return {
      id: 0,
      Team: "",
      Publisher: "",
      ProjectDetails: "",
      ReceivedDate: "",
      DueDate: "",
      CurrentStatus: "",
      Remarks: ""
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
      "api/techAPI/read_one_pending.php",
      { prod_id: productId },
      function (product) {
        var p = JSON.parse(product)[0];
        
        this.setState({ id: p.id });
        this.setState({ Team: p.Team });
        this.setState({ Publisher: p.Publisher });
        this.setState({ ProjectDetails: p.ProjectDetails });
        this.setState({ ReceivedDate: p.ReceivedDate });
        this.setState({ DueDate: p.DueDate });
        this.setState({ CurrentStatus: p.CurrentStatus });
        this.setState({ Remarks: p.Remarks });
        $(".page-header h1").text(p.Team);
      }.bind(this)
    );
  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
    this.serverRequestProd.abort();
  },

  render: function () {
    return (
      <div>
        <a href="#techPIndex" className="btn btn-primary margin-bottom-1em">
          Technology Pending Project List
        </a>

        <table className="table table-bordered table-responsive">
          <tbody>
            {/* <tr>
              <td>Serial No</td>
              <td>{this.state.Sno}</td>
            </tr> */}
            <tr>
              <td>Team</td>
              <td>{this.state.Team}</td>
            </tr>
            <tr>
              <td>Publisher</td>
              <td>{this.state.Publisher}</td>
            </tr>
            <tr>
              <td>Project Details</td>
              <td>{this.state.ProjectDetails}</td>
            </tr>
            <tr>
              <td>Received Date</td>
              <td>{this.state.ReceivedDate}</td>
            </tr>
            <tr>
              <td>Due Date</td>
              <td>{this.state.DueDate}</td>
            </tr>
            <tr>
              <td>Current Status</td>
              <td>{this.state.CurrentStatus}</td>
            </tr>
            <tr>
              <td>Remarks</td>
              <td>{this.state.Remarks}</td>
            </tr>
         
          </tbody>
        </table>
      </div>
    );
  },
});