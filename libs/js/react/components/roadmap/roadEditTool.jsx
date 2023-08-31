"use strict";

var RoadEditToolComponent = React.createClass({
  getInitialState: function () {
    return {
        refid: 0,
        id: 0,
        toolname: "",
        createdby: "",
        quarter: "",
        description: "",
        developby: "",
        categories: [],
        catname: "",
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
    this.serverRequestProd = $.post(
      "api/roadmap/read_one_toolonly.php",
      { prod_id: productId },
      function (product) {
          var p = JSON.parse(product)[0];
          this.setState({
              id: p.id,
              toolname: p.toolname,
              createdby: p.createdby,
              quarter: p.quarter,
              description: p.description,
              developby: p.developby
          });
      }.bind(this));
      
      this.serverRequest = $.get('api/roadmap/read_all_roadcategories.php', function(results) {
        this.setState({
            categories: JSON.parse(results)
        });
    }.bind(this));
    // this.serverRequestProd = $.post(
    //   "api/roadmap/read_one_toolonly.php",
    //   { prod_id: productId },
    //   function (product) {
    //     var p = JSON.parse(product)[0];
    //     this.setState({ id: p.id });
    //     this.setState({ refid: p.refid });
    //     this.setState({ ref: p.refid });
    //     this.setState({ quarter: p.quarter });
    //     this.setState({ description: p.description });
    //     this.setState({ year: p.year });
    //     this.setState({ developby: p.developby });
    //   }.bind(this));

    //   this.serverRequestProd = $.post(
    //     "api/roadmap/read_one_road.php",
    //     { prod_id: p.refid },
    //     function (road) {
    //       var r = JSON.parse(road)[0];
    //       this.setState({ createdby: r.createdby });
    //       this.setState({ toolname: r.toolname });
    //     }.bind(this));


  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
    //this.serverRequestCat.abort();
    this.serverRequestProd.abort();
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


ondevelopbyChange: function(e) {
    this.setState({
        developby: e.target.value
    });
},

  onSave: function (e) {
    $.post(
      "api/roadmap/update_roadtool.php",
      {
        id: this.props.productId,
        description: this.state.description,
        developby: this.state.developby,
      },
      function (res) {
        
        this.setState({ successUpdate: res });
       
      }.bind(this)
    );
    e.preventDefault();
  },

  render: function () {

    var categoriesOptions = this.state.categories.map(function(category) {
      return (
          <option key={category.categoryname} value={category.categoryname}>{category.categoryname}</option>
      );
  });

    $(".page-header h1").text(this.state.toolname);
    return (
      <div>
      <h3>Created by: {this.state.createdby}</h3>
        {this.state.successUpdate == "true" ? (
          <div className="alert alert-success">Succesfully updated.</div>
        ) : null}
        {this.state.successUpdate != "true" &&
        this.state.successUpdate != null ? (
          <div className="alert alert-danger">Update Failed</div>
        ) : null}

        <a href={"#roadShowTool?toolname=" + encodeURIComponent(this.state.toolname)} className="btn btn-primary margin-bottom-1em">
          Go Back
        </a>
        <form onSubmit={this.onSave}>
          <table className="table table-bordered table-hover">
            <tbody>

            <tr>
            <td>Category</td>
            <td>
                <select disabled
                    onChange={this.onquarterChange}
                    className="form-control"
                    value={this.state.quarter}
                >
                    <option value="" disabled>Please Select Quarter</option>
                    {categoriesOptions}
                </select>
            </td>
            </tr>
            <tr>
                <td>Description</td>
                <td>
                  <textarea
                    type="text"
                    className="form-control"
                    value={this.state.description}
                    onChange={this.ondescriptionChange}
                    title="description	"
                    ></textarea>
                </td>
              </tr>


              <tr>
                <td >Develop By</td>
                <td>
                  <input
                    className="form-control"
                    value={this.state.developby}
                    onChange={this.ondevelopbyChange}
                    title="developby"
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
