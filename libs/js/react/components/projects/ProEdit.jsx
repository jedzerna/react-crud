"use strict";

var ProEditComponent = React.createClass({
  getInitialState: function () {
    return {
        id: 0,
        SkillSets: "",
        SrEngineers: "",
        Intermediates: "",
        JrEngineers: "",
        SubTeam: "",
        Team: "",
      successUpdate: null,
    };
  },

  componentDidMount: function () {
    var productId = this.props.productId;

    // load form values
    this.serverRequestProd = $.post(
      "api/projectsAPI/read_one_projects.php",
      { prod_id: productId },
      function (product) {
        var p = JSON.parse(product)[0];
        this.setState({ SkillSets: p.SkillSets });
        this.setState({ id: p.id });
        this.setState({ SrEngineers: p.SrEngineers });
        this.setState({ Intermediates: p.Intermediates });
        this.setState({ JrEngineers: p.JrEngineers });
        this.setState({ SubTeam: p.SubTeam });
        this.setState({ Team: p.Team });
        $(".page-header h1").text(p.SkillSets);
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

  onSkillSetsChange: function(e) {
    this.setState({
        SkillSets: e.target.value
    });
},

onSrEngineersChange: function(e) {
    this.setState({
        SrEngineers: e.target.value
    });
},

onIntermediatesChange: function(e) {
    this.setState({
        Intermediates: e.target.value
    });
},

onJrEngineersChange: function(e) {
    this.setState({
        JrEngineers: e.target.value
    });
},



onSubTeamChange: function(e) {
    this.setState({
        SubTeam: e.target.value
    });
},
onTeamChange: function(e) {
    this.setState({
        Team: e.target.value
    });
},

  onSave: function (e) {
    $.post(
      "api/projectsAPI/update_projects.php",
      {
        id: this.state.id,
        SkillSets: this.state.SkillSets,
        SrEngineers: this.state.SrEngineers,
        Intermediates: this.state.Intermediates,
        JrEngineers: this.state.JrEngineers,
        SubTeam: this.state.SubTeam,
        Team: this.state.Team,
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
          <div className="alert alert-success">Project was updated.</div>
        ) : null}
        {this.state.successUpdate != "true" &&
        this.state.successUpdate != null ? (
          <div className="alert alert-danger">{this.state.successUpdate}</div>
        ) : null}

        <a href="#ProIndex" className="btn btn-primary margin-bottom-1em">
          All Projects
        </a>
        <form onSubmit={this.onSave}>
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <td>Skill Sets</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.SkillSets}
                    onChange={this.onSkillSetsChange}
                    title="SkillSets"
                  />
                </td>
              </tr>

              <tr>
                <td>Sr. Engineers</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.SrEngineers}
                    onChange={this.onSrEngineersChange}
                    title="SrEngineers"
                  />
                </td>
              </tr>

              <tr>
                <td>Intermediates</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.Intermediates}
                    onChange={this.onIntermediatesChange}
                    title="Intermediates"
                  />
                </td>
              </tr>

              <tr>
                <td>Jr. Engineers	</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.JrEngineers}
                    onChange={this.onJrEngineersChange}
                    title="JrEngineers	"
                  />
                </td>
              </tr>

              <tr>
                <td>Sub Team</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.SubTeam}
                    onChange={this.onSubTeamChange}
                    title="SubTeam"
                  />
                </td>
              </tr>

              <tr>
                <td>Team</td>
                <td>
                  <textarea
                    className="form-control"
                    value={this.state.Team}
                    onChange={this.onTeamChange}
                    title="Team"
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
