"use strict";

var RoadCreateToolComponent = React.createClass({
    getInitialState: function() {
        return {
            id:0,
            toolname:'',
            createdby: '',
            quarter: '',
            description: '',
            developby: '',
            categories: [],
            catname: "",
            user: ''
        };
    },

    componentDidMount: function() {
        this.serverRequest = $.get('api/is_logged_in.php', function(result) {
            if(result == 'true')
            this.setState({
                isLoggedIn: result
            });
        else
            window.location.href = '#login';

        }.bind(this));

        this.serverRequest = $.get('api/get_current_user.php', function(result) {
            if(result != '') {
                var u = JSON.parse(result)[0];
                this.setState({
                    user: u
                });
            }
        }.bind(this));

        var toolname = this.props.toolname;


            this.serverRequest = $.get('api/roadmap/read_all_roadcategories.php', function(results) {
                this.setState({
                    categories: JSON.parse(results)
                });
            }.bind(this));


            this.serverRequestProd = $.post(
                "api/roadmap/read_one_road.php",
                { prod_toolname:  (toolname) },
                function (product) {
                  var p = JSON.parse(product)[0];
                  this.setState({ createdby: p.createdby });
                  this.setState({ toolname: p.toolname });
                }.bind(this));

    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    

    onCategoryChange: function(e) {
        this.setState({
            selectedCategoryId: e.target.value
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

    
    ondevelopbyChange: function(e) {
        this.setState({
            developby: e.target.value
        });
    },
    onSave: function(e) {
        $.post('api/roadmap/create_newdataroad.php', {
            refid: this.state.id,
            toolname: this.state.toolname,
            createdby: this.state.createdby,
            quarter: this.state.quarter,
            description: this.state.description,
            developby: this.state.developby
            },
            function(res) {
                this.setState({successCreation: res});
                if(res == 'true') {
                    this.setState({toolname: ''});
                    this.setState({createdby: ''});
                    this.setState({quarter: ''});
                    this.setState({description: ''});
                    this.setState({developby: ''});
                }
            }.bind(this));
        e.preventDefault();
    },

    // THE FORM
    render: function() {
        $(".page-header h1").text(this.state.toolname);

        var categoriesOptions = this.state.categories.map(function(category) {
            return (
                <option key={category.categoryname} value={category.categoryname}>{category.categoryname}</option>
            );
        });

        return (
          <div>
          <h3>Created by: {this.state.createdby}</h3>
              <br/>
                {
                    this.state.successCreation == "true" ?
                        <div className="alert alert-success">
                            Project was saved.
                        </div>
                        : null
                }
                {
                    this.state.successCreation != "true" && this.state.successCreation != null ?
                        <div className="alert alert-danger">
                        Your quarter has been added. Please pick another quarter.
                        </div>
                        : null
                }
            <a href={"#roadShowTool?toolname=" + this.props.toolname} className="btn btn-primary" style={{marginRight:'10px'}}>
              <span className="glyphicon glyphicon-chevron-left"></span>&nbsp; 
              Go Back
            </a>
              

            <br/>
              <br/>
                <form onSubmit={this.onSave}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                  
                        
                        <tr>
                            <td>Category</td>
                            <td>
                                <select
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
                                        className="form-control"
                                        value={this.state.description}
                                        onChange={this.ondescriptionChange}>
                                        </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>Develop By</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.developby}
                                        required
                                        onChange={this.ondevelopbyChange}
                                        />
                            </td>
                        </tr>


                        <tr>
                            <td></td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={this.onSave}>
                                    Save
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});