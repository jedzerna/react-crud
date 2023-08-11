"use strict";

var ProShowComponent = React.createClass({
  getInitialState: function () {
    return {
      id: 0,
      SkillSets: "",
      SrEngineers: "",
      Intermediates: "",
      JrEngineers: "",
      SubTeam: "",
      Team:  ""
    };
  },

  componentDidMount: function () {
    var productId = this.props.productId;
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
    this.serverRequestProd.abort();
  },

  render: function () {
    return (
      <div>
        <a href="#ProIndex" className="btn btn-primary margin-bottom-1em">
          All Projects
        </a>

        <table className="table table-bordered table-responsive">
          <tbody>
            <tr>
              <td>Skill Sets</td>
              <td>{this.state.SkillSets}</td>
            </tr>
            <tr>
              <td>Sr. Engineers</td>
              <td>{this.state.SrEngineers}</td>
            </tr>
            <tr>
              <td>Intermediates</td>
              <td>{this.state.Intermediates}</td>
            </tr>
            <tr>
              <td>Jr. Engineers</td>
              <td>{this.state.JrEngineers}</td>
            </tr>
            <tr>
              <td>Sub Team</td>
              <td>{this.state.SubTeam}</td>
            </tr>
            <tr>
              <td>Team</td>
              <td>{this.state.Team}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
});