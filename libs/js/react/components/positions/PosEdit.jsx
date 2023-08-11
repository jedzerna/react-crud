"use strict";

var PosEditComponent = React.createClass({
  getInitialState: function () {
    return {
        id: 0,
        Position: "",
        Experience: "",
        PositionCount: "",
        SkillSets: "",
        Budget: "",
        ReplacementAditional: "",
      successUpdate: null,
    };
  },

  componentDidMount: function () {
    var productId = this.props.productId;

    // load form values
    this.serverRequestProd = $.post(
      "api/positionAPI/read_one_position.php",
      { prod_id: productId },
      function (product) {
        var p = JSON.parse(product)[0];
        this.setState({ Position: p.Position });
        this.setState({ id: p.id });
        this.setState({ Experience: p.Experience });
        this.setState({ PositionCount: p.PositionCount });
        this.setState({ SkillSets: p.SkillSets });
        this.setState({ Budget: p.Budget });
        this.setState({ ReplacementAditional: p.ReplacementAditional });
        $(".page-header h1").text(p.Position);
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

  onPositionChange: function(e) {
    this.setState({
        Position: e.target.value
    });
},

onExperienceChange: function(e) {
    this.setState({
        Experience: e.target.value
    });
},

onPositionCountChange: function(e) {
    this.setState({
        PositionCount: e.target.value
    });
},

onSkillSetsChange: function(e) {
    this.setState({
        SkillSets: e.target.value
    });
},



onBudgetChange: function(e) {
    this.setState({
        Budget: e.target.value
    });
},
onReplacementAditionalChange: function(e) {
    this.setState({
        ReplacementAditional: e.target.value
    });
},

  onSave: function (e) {
    $.post(
      "api/positionAPI/update_position.php",
      {
        id: this.state.id,
        Position: this.state.Position,
        Experience: this.state.Experience,
        PositionCount: this.state.PositionCount,
        SkillSets: this.state.SkillSets,
        Budget: this.state.Budget,
        ReplacementAditional: this.state.ReplacementAditional,
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

        <a href="#PosIndex" className="btn btn-primary margin-bottom-1em">
          Back
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
                    value={this.state.Position}
                    onChange={this.onPositionChange}
                    title="Position"
                  />
                </td>
              </tr>

              <tr>
                <td>Experience</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.Experience}
                    onChange={this.onExperienceChange}
                    title="Experience"
                  />
                </td>
              </tr>

              <tr>
                <td>Position Count</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.PositionCount}
                    onChange={this.onPositionCountChange}
                    title="PositionCount"
                  />
                </td>
              </tr>

              <tr>
                <td>Skill Sets</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.SkillSets}
                    onChange={this.onSkillSetsChange}
                    title="SkillSets	"
                  />
                </td>
              </tr>

              <tr>
                <td>Budget</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.Budget}
                    onChange={this.onBudgetChange}
                    title="Budget"
                  />
                </td>
              </tr>

              <tr>
                <td>Replacement/Aditional</td>
                <td>
                  <textarea
                    className="form-control"
                    value={this.state.ReplacementAditional}
                    onChange={this.onReplacementAditionalChange}
                    title="ReplacementAditional"
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
