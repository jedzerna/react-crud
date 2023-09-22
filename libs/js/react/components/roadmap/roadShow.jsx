"use strict";

var RoadShowComponent = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      isLoggedIn: "",
      currentPage: 1,
      itemsPerPage: 4,  
      rowData: [],  
      toolData: {
        categories: [],
        tools: []
      },
      searchQuery: "",

      id:0,
      toolname:"",
      createdby:"",
      quarter:"",
      description:"",
      developby:"",

      categories: [],
      highestid:0,
      type:'',
      successUpdate: null,
      user: '',
      toolIndexs:0,
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

  this.populate();

      this.serverRequest = $.get('api/get_current_user.php', function(result) {
        if(result != '') {
            var u = JSON.parse(result)[0];
            this.setState({
                user: u
            });
        }
    }.bind(this));
      
      this.serverRequest = $.get('api/roadmap/read_all_roadcategories.php', function(results) {
        this.setState({
            categories: JSON.parse(results)
        });
    }.bind(this));
    $(".page-header").css('border-bottom','1px solid #eeeeee'); 
    
  },

  populate: function(){
    
    this.serverRequest = $.get("api/roadmap/read_road_hori.php", function (data) {
      if (this.isMounted()) {
        const parsedData = JSON.parse(data);
        this.setState({
          toolData: parsedData,
        });
      }
      
    }.bind(this));
  },
  calculateTotalPages: function (category) {
    const { toolData, itemsPerPage } = this.state;
    const totalItems = Object.keys(toolData).filter(tool => toolData[tool][category] !== undefined).length;
    return Math.ceil(totalItems / itemsPerPage);
  },
  componentWillUnmount: function () {
    this.serverRequest.abort();
  },

  handleSearchChange: function (event) {
    const searchQuery = event.target.value;
    this.setState({
      searchQuery,
      currentPage: 1, // Reset current page when changing search query
    });
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

  ondevelopbyChange: function(e) {
      this.setState({
          developby: e.target.value
      });
  },

  handleItemClick: function (event, toolname,types,toolIndex) {
    event.preventDefault();
    this.setState({ toolIndexs: toolIndex });
    var toolnames = toolname;
    if(toolname!= null){


      this.serverRequestProd = $.post(
          "api/roadmap/read_one_road.php",
          { prod_toolname:  (toolnames) },
            function (product) {
              var p = JSON.parse(product)[0];
              this.setState({ createdby: p.createdby });
              this.setState({ toolname: p.toolname });
            }.bind(this));

            
            this.serverRequest = $.post(
              "api/roadmap/read_one_tool.php",
              { prod_toolname: (toolnames) },
              function (products) {
                if (this.isMounted()) {
                    this.setState({products: JSON.parse(products) });
                }
              }.bind(this));
    }
    console.log(toolnames);
    this.setState({ toolname: toolnames });
    this.setState({ type: types });
    this.openForm();
  },
  
    handleSubmit: function (event) {
      event.preventDefault();
      this.closeForm();
    },
    openForm: function () {
      this.setState({ isFormOpen: true });
      
    },
    
    closeForm: function () {
      console.log(this.state.toolname);
      this.setState({ isFormOpen: false });
      this.setState({ successUpdate: null });
      this.setState({ toolname: '' });
      this.setState({ id: '' });
      this.setState({ quarter: '' });
      this.setState({ createdby: '' });
      this.setState({ developby: '' });
      this.setState({ description: '' });
      this.setState({ products: null });
    },

    onSave: function(e) {
      $.post('api/roadmap/create_road.php', {
          toolname: this.state.toolname,
          createdby: this.state.user.email,
          quarter: this.state.quarter,
          description: this.state.description,
          developby: this.state.developby
          },
          function(res) {
              this.setState({successUpdate: res});
              if(res == 'true') {

                const existingTitle = this.state.toolname;
                const existingcat = this.state.quarter;
                const newData = {
                  [existingcat]: this.state.description,
                };
                this.setState(prevState => ({
                  toolData: {
                    [existingTitle]: newData, // Add the new data
                    ...prevState.toolData, // Preserve existing data by spreading it
                  },
                }));
                console.log(this.state.toolData);

                  this.setState({toolname: ''});
                  this.setState({quarter: ''});
                  this.setState({description: ''});
                  this.setState({developby: ''});
              }
          }.bind(this));
      e.preventDefault();
  },

  handleSubmitDelete:function(e){
    var r = confirm(
      "Are you sure you want to delete this record?"
    );
    if (r == true) {
      var del_ids = this.state.products.map(product => product.id);
      $.post(
        'api/roadmap/delete_road.php',
        { del_ids: del_ids },
        function (res) {
          if (res == "true") {
            this.populate();
            // this.deleteProductById(this.state.toolname,this.state.toolIndexs);
            this.closeForm();
          } else {
            alert("Unable to delete product(s).");
          }
        }.bind(this)
      );
    }
  },

  onDelete: function(e) {
    
},
    render() {
      var categoriesOptions = this.state.categories.map(function(category) {
        return (
            <option key={category.categoryname} value={category.categoryname}>{category.categoryname}</option>
        );
    });

      const { toolData, searchQuery } = this.state;
      const tools = Object.keys(toolData);

      // Collect all unique categories
      const uniqueCategoriesSet = new Set();
      tools.forEach(tool => {
        Object.keys(toolData[tool]).forEach(category => {
          uniqueCategoriesSet.add(category);
        });
      });
      const uniqueCategories = Array.from(uniqueCategoriesSet);

      uniqueCategories.sort((a, b) => a.localeCompare(b));
      $(".page-header h1").text("Welcome to Road Map!");

      // Filter tools based on the search query
      const filteredTools = tools.filter(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <br/>
        <form>
        <div className="input-group col-md-3 margin-bottom-1em pull-left">
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-search"></i>
          </span>
          <input
            type="text"
            className="form-control searchbox"
            placeholder="Search by tool name..."
            value={searchQuery}
            onChange={this.handleSearchChange}
          />
        </div>
           <a style={{marginLeft:'5px'}} 
            onClick={(event) => this.handleItemClick(event, null,"create")} 
           className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>&nbsp; Create
              New Tools/Project
            </a>
        </form>
      <br/>

      {filteredTools.length === 0 ? (
        <div>
          <p>No tools found.</p>
          {/* You can add a link to create new tools here */}
        </div>
      ) : (
        
      <div className="table-responsive" style={{ overflowX: 'auto', width: '100%' }}>
  <table className="table table-bordered table-hover" style={{ minWidth: '300px' }}>
    <thead>
      <tr>
        <th style={{ width: '100px' ,minWidth:'100px' , maxWidth:'100px' }}>Actions</th>
        <th style={{ width: '200px' ,minWidth:'200px', maxWidth:'200px'}}><b>Products/Tools</b></th>
        {uniqueCategories.map((category, index) => (
          <th key={index} style={{ width: '390px',minWidth:'390px' }}>{category}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {filteredTools.map((tool, toolIndex) => (
        <tr key={toolIndex}>
          <td>
            <a href={`#roadShowTool?toolname=${encodeURIComponent(tool)}`}
              className="m-r-1em"
              style={{ margin: "5px" }}
              title="Show More"
            >
              <img src="ico/view.ico" alt="Logo" style={{ width: '30px', height: '30px' }} />
            </a>
            <a
              // href={`#roadDelete?toolname=${encodeURIComponent(tool)}`}
              
              onClick={(event) => this.handleItemClick(event, encodeURIComponent(tool),"delete",toolIndex)}
              className="m-r-1em"
              style={{ margin: "5px" }}
              title="Delete this Project Tool"
            >
              <img src="ico/delete.ico" alt="Logo" style={{ width: '30px', height: '30px' }} />
            </a>
          </td>
          <td><b>{tool}</b></td>
          {uniqueCategories.map((category, categoryIndex) => (
            <td key={categoryIndex}>
              {toolData[tool][category] || ''}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
    </table>
        </div>
      )}
    </div>
  );
}
});



