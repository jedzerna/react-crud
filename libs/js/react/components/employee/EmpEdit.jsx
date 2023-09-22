"use strict";

var EmpEditComponent = React.createClass({
  getInitialState: function () {
    return {
        id: 0,
        EmployeeID: "",
        EmployeeName: "",
        PrimarySkillsets: "",
        SecondarySkillsets: "",
        
      successUpdate: null,
    };
  },

  componentDidMount: function () {
    var productId = this.props.productId;

    // load form values
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
      }.bind(this)
    );
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
    //this.serverRequestCat.abort();
    this.serverRequestProd.abort();
  },

  onEmployeeIDChange: function(e) {
    this.setState({
      EmployeeID: e.target.value
    });
},


  onEmployeeNameChange: function(e) {
    this.setState({
      EmployeeName: e.target.value
    });
},

onPrimarySkillsetsChange: function(e) {
    this.setState({
      PrimarySkillsets: e.target.value
    });
},

onSecondarySkillsetsChange: function(e) {
    this.setState({
      SecondarySkillsets: e.target.value
    });
},
  onSave: function (e) {
    $.post(
      "api/employeeAPI/update_employee.php",
      {
        id: this.state.id,
        EmployeeID: this.state.EmployeeID,
        EmployeeName: this.state.EmployeeName,
        PrimarySkillsets: this.state.PrimarySkillsets,
        SecondarySkillsets: this.state.SecondarySkillsets,
      },
      function (res) {
        this.setState({ successUpdate: res });
      }.bind(this)
    );
    e.preventDefault();
  },

  render: function () {
    return (
      <div>
        {this.state.successUpdate == "true" ? (
          <div className="alert alert-success">Data was updated.</div>
        ) : null}
        {this.state.successUpdate != "true" &&
        this.state.successUpdate != null ? (
          <div className="alert alert-danger">{this.state.successUpdate}</div>
        ) : null}

        <a href="#EmpIndex" className="btn btn-primary margin-bottom-1em">
          Back
        </a>
        <form onSubmit={this.onSave}>
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <td>Employee ID</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.EmployeeID}
                    onChange={this.onEmployeeIDChange}
                    title="EmployeeID"
                  />
                </td>
              </tr>

              <tr>
                <td>Employee Name</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.EmployeeName}
                    onChange={this.onEmployeeNameChange}
                    title="EmployeeName"
                  />
                </td>
              </tr>

              <tr>
                <td>Primary Skillsets</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.PrimarySkillsets}
                    onChange={this.onPrimarySkillsetsChange}
                    title="PrimarySkillsets"
                  />
                </td>
              </tr>

              <tr>
                <td>Secondary Skillsets</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.SecondarySkillsets}
                    onChange={this.onSecondarySkillsetsChange}
                    title="SecondarySkillsets"
                  />
                </td>
              </tr>

             
              <tr>
                <td></td>
                <td>
                  <button className="btn btn-primary" onClick={this.onSave}>
                    Save Changes
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  },
});
