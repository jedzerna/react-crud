"use strict";

var EmpShowComponent = React.createClass({
  getInitialState: function () {
    return {
      id: 0,
      EmployeeID: "",
      EmployeeName: "",
      PrimarySkillsets: "",
      SecondarySkillsets: "",
    };
  },

  componentDidMount: function () {
    var productId = this.props.productId;
    this.serverRequestProd = $.post(
      "api/employeeAPI/read_one_employee.php",
      { prod_id: productId },
      function (product) {
        var p = JSON.parse(product)[0];
        this.setState({ id: p.id });
        this.setState({ EmployeeID: p.EmployeeID });
        this.setState({ EmployeeName: p.EmployeeName });
        this.setState({ PrimarySkillsets: p.PrimarySkillsets });
        this.setState({ SecondarySkillsets: p.SecondarySkillsets });
        
        $(".page-header h1").text(p.EmployeeName);
      }.bind(this));
    this.serverRequest = $.get('api/is_logged_in.php', function(result) {
      if(result == 'true')
          this.setState({
              isLoggedIn: result
          });
      else
          window.location.href = '#login';
  }.bind(this));
  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
    this.serverRequestProd.abort();
  },

  render: function () {
    return (
      <div>
        <a href="#EmpIndex" className="btn btn-primary margin-bottom-1em">
          All Positions
        </a>

        <table className="table table-bordered table-responsive">
          <tbody>
            <tr>
              <td>Employee ID</td>
              <td>{this.state.EmployeeID}</td>
            </tr>
            <tr>
              <td>Employee Name</td>
              <td>{this.state.EmployeeName}</td>
            </tr>
            <tr>
              <td>Primary Skillsets</td>
              <td>{this.state.PrimarySkillsets}</td>
            </tr>
            <tr>
              <td>Secondary Skillsets</td>
              <td>{this.state.SecondarySkillsets}</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    );
  },
});