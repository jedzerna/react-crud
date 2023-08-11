"use strict";

var PosShowComponent = React.createClass({
  getInitialState: function () {
    return {
      id: 0,
      Position: "",
      Experience: "",
      PositionCount: "",
      SkillSets: "",
      Budget: "",
      ReplacementAditional:  ""
    };
  },

  componentDidMount: function () {
    var productId = this.props.productId;
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
  },

  componentWillUnmount: function () {
    this.serverRequestProd.abort();
  },

  render: function () {
    return (
      <div>
        <a href="#PosIndex" className="btn btn-primary margin-bottom-1em">
          All Positions
        </a>

        <table className="table table-bordered table-responsive">
          <tbody>
            <tr>
              <td>Position</td>
              <td>{this.state.Position}</td>
            </tr>
            <tr>
              <td>Experience</td>
              <td>{this.state.Experience}</td>
            </tr>
            <tr>
              <td>Position Count</td>
              <td>{this.state.PositionCount}</td>
            </tr>
            <tr>
              <td>Skill Sets</td>
              <td>{this.state.SkillSets}</td>
            </tr>
            <tr>
              <td>Budget</td>
              <td>{this.state.Budget}</td>
            </tr>
            <tr>
              <td>Replacement/Aditional</td>
              <td>{this.state.ReplacementAditional}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
});