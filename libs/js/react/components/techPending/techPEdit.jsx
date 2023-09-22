"use strict";

var TechpEditComponent = React.createClass({
  getInitialState: function () {
    return {
        id: 0,
        Team: "",
        Publiher: "",
        ProjectDetails: "",
        ReceivedDate: "",
        DueDate: "",
        CurrentStatus: "",
        type:'',
      successUpdate: null,
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

    // load form values
    this.serverRequestProd = $.post(
      "api/techpAPI/read_one_pending.php",
      { prod_id: productId },
      function (product) {
        var p = JSON.parse(product)[0];
        this.setState({ Team: p.Team });
        this.setState({ id: p.id });
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
    //this.serverRequestCat.abort();
    this.serverRequestProd.abort();
  },

onTeamChange: function(e) {
    this.setState({
        Team: e.target.value
    });
},

onPublisherChange: function(e) {
    this.setState({
        Publisher: e.target.value
    });
},

onProjectDetailsChange: function(e) {
    this.setState({
        ProjectDetails: e.target.value
    });
},

onReceivedDateChange: function(e) {
    this.setState({
        ReceivedDate: e.target.value
    });
},
onDueDateChange: function(e) {
    this.setState({
        DueDate: e.target.values
    });
},
onCurrentStatusChange: function(e) {
    this.setState({
        CurrentStatus: e.target.value
    });
},
onRemarksChange: function(e) {
    this.setState({
        Remarks: e.target.value
    });
},


  onSave: function (e) {
    $.post(
      "api/techpAPI/update_pending.php",
      {
        id: this.state.id,
        Team: this.state.Team,
        Publisher: this.state.Publisher,
        ProjectDetails: this.state.ProjectDetails,
        ReceivedDate: this.state.ReceivedDate,
        DueDate: this.state.DueDate,
        CurrentStatus: this.state.CurrentStatus,
        Remarks: this.state.Remarks,
         
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

        <a href="#techPIndex" className="btn btn-primary margin-bottom-1em">
          Back
        </a>
        <form onSubmit={this.onSave}>
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <td>Team</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.Team}
                    onChange={this.onTeamChange}
                    title="Team"
                  />
                </td>
              </tr>

              <tr>
                <td>Publisher</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.Publisher}
                    onChange={this.onPublisherChange}
                    title="Publisher"
                  />
                </td>
              </tr>
              <tr>
                <td>Project Details</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.ProjectDetails}
                    onChange={this.onProjectDetailsChange}
                    title="ProjectDetails"
                  />
                </td>
              </tr>

              <tr>
                <td>Recieved Date</td>
                <td>
                  <input
                    type="date"
                    className="form-control"
                    value={this.state.ReceivedDate}
                    onChange={this.onReceivedDateChange}
                    title="ReceivedDate	"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Due Date</td>
                <td>
                  <input
                    type="date"
                    className="form-control"
                    value={this.state.DueDate}
                    onChange={this.onDueDateChange}
                    title="DueDate"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Current Status</td>
                <td>
                  <textarea
                    className="form-control"
                    value={this.state.CurrentStatus}
                    onChange={this.onCurrentStatusChange}
                    title="CurrentStatus"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>Remarks</td>
                <td>
                  <textarea
                    className="form-control"
                    value={this.state.Remarks}
                    onChange={this.onRemarksChange}
                    title="Remarks"
                  ></textarea>
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
