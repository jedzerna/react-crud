"use strict";

var RoadEditComponent = React.createClass({
  getInitialState: function () {
    return {
        id: 0,
        toolname: "",
        createdby: "",
        quarter: "",
        description: "",
        year: "",
        developby: "",
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
      "api/roadmap/read_one_road.php",
      { prod_id: productId },
      function (product) {
        var p = JSON.parse(product)[0];
        this.setState({ toolname: p.toolname });
        this.setState({ id: p.id });
        this.setState({ createdby: p.createdby });
        this.setState({ quarter: p.quarter });
        this.setState({ description: p.description });
        this.setState({ year: p.year });
        this.setState({ developby: p.developby });
        $(".page-header h1").text(p.toolname);
      }.bind(this)
    );
  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
    //this.serverRequestCat.abort();
    this.serverRequestProd.abort();
  },

  ontoolnameChange: function(e) {
    this.setState({
        toolname: e.target.value
    });
},

oncreatedbyChange: function(e) {
    this.setState({
        createdby: e.target.value
    });
},

onquarterChange: function(e) {
    this.setState({
        quarter: e.target.value
    });
},

ondescriptionChange: function(e) {
    this.setState({
        description: e.target.value
    });
},



onyearChange: function(e) {
    this.setState({
        year: e.target.value
    });
},
ondevelopbyChange: function(e) {
    this.setState({
        developby: e.target.value
    });
},

  onSave: function (e) {
    $.post(
      "api/roadmap/update_road.php",
      {
        id: this.state.id,
        toolname: this.state.toolname,
        createdby: this.state.createdby,
        quarter: this.state.quarter,
        description: this.state.description,
        year: this.state.year,
        developby: this.state.developby,
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

        <a href="#roadIndex" className="btn btn-primary margin-bottom-1em">
          All Projects
        </a>
        <form onSubmit={this.onSave}>
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <td>Tool Name</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.toolname}
                    onChange={this.ontoolnameChange}
                    title="toolname"
                  />
                </td>
              </tr>

              <tr>
                <td>Created By</td>
                <td>
                  <input 
                  disabled
                    type="text"
                    className="form-control"
                    value={this.state.createdby}
                    onChange={this.oncreatedbyChange}
                    title="createdby"
                  />
                </td>
              </tr>

              <tr>
                <td>Quarter</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.quarter}
                    onChange={this.onquarterChange}
                    title="quarter"
                  />
                </td>
              </tr>

              <tr>
                <td>Description</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.description}
                    onChange={this.ondescriptionChange}
                    title="description	"
                  />
                </td>
              </tr>

              <tr>
                <td>Year</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.year}
                    onChange={this.onyearChange}
                    title="year"
                  />
                </td>
              </tr>

              <tr>
                <td>Develop By</td>
                <td>
                  <textarea
                    className="form-control"
                    value={this.state.developby}
                    onChange={this.ondevelopbyChange}
                    title="developby"
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
