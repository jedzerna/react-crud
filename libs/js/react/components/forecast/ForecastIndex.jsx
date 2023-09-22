"use strict";

var ForecastIndexComponent = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      isLoggedIn: "",
      currentPage: 1,
      itemsPerPage: 5,
      rowData: [],  
      toolData: {
        categories: [],
        tools: []
      },
      searchQuery:'',

      id:0,
      toolname:'',
      createdby:'',
      quarter:'',
      description:'',
      developby:'',

      type:'',
      successUpdate: null,
      user: '',
      toolIndexs:0,


      toolnamedistinct: [],
      toolnamew:'',
      toolnameeachproducts: [],
      selectedItem: null,

      idw:0,

      allidtodelete:[],
      selectedDate: new Date(),
      isOpen: false,

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

  
  this.populatemostdata();
    
    $(".page-header").css('border-bottom','1px solid #eeeeee'); 
    
  },
  populatemostdata:function(){
    this.populate();

    this.serverRequest = $.get('api/get_current_user.php', function(result) {
      if(result != '') {
          var u = JSON.parse(result)[0];
          this.setState({
              user: u
          });
      }
  }.bind(this));
    
  this.populateDistinctToolName();
  },
  populateDistinctToolName: function(){

    this.serverRequest = $.get('api/forecast/readToolNameDistinct.php', function(results) {
      this.setState({
        toolnamedistinct: JSON.parse(results)
      });
  }.bind(this));

  },


  populate: function(){
    
    this.serverRequest = $.get("api/forecast/read_road_hori.php", function (data) {
      if (this.isMounted()) {
        const parsedData = JSON.parse(data);
        this.setState({
          toolData: parsedData,
        });
      }
      
    }.bind(this));
  },
  toggleDatePicker: function() {
    this.setState({ isOpen: !this.state.isOpen });
  },

  handleDateChange: function(date) {
    this.setState({
      selectedDate: date,
      isOpen: false,
    });
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

  ontoolnamedescritionChange: function(e) {
      this.setState({
          developby: e.target.value
      });
  },

  
  ontoolnamedistinctChange: function(e) {
    const toolname = e.target.value;
    this.setState({
      toolnamew: toolname,
    });
  },

  
  ontoolnamedistinctColChange: function(e) {
    const toolname = e.target.value;
    this.setState({
      toolnamew: toolname,
    });
    this.serverRequest = $.post(
      'api/forecast/read_columntool.php',
      { prod_toolname: toolname },
      (product) => {
        var p= JSON.parse(product);
    
        var idArray = p.map(item => item.id);
    
        this.setState({
          allidtodelete: idArray,
        });
      }
    );
  },

  handleItemClickSelected(toolnameSQLs) {
    // Update the selected item in the state
    this.setState({ selectedItem: toolnameSQLs });
  },
  handleItemClick: function (event, toolname,types,toolIndex) {
    event.preventDefault();
    this.setState({ toolIndexs: toolIndex });
    var toolnames = decodeURIComponent(toolname);
    if(toolnames!= ''){
      this.serverRequestProd = $.post(
          "api/forecast/read_one_road.php",
          { prod_toolname:  decodeURIComponent(toolnames) },
            function (product) {
              var p = JSON.parse(product)[0];
              this.setState({ createdby: p.createdby });
              this.setState({ toolname: p.title });
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
    if(types == 'delete'){
      this.serverRequest = $.post(
        'api/forecast/delete_all_rowforecast.php',
        { prod_toolname: toolnames },
        (product) => {
          var p= JSON.parse(product);
      
          var idArray = p.map(item => item.id);
      
          this.setState({
            allidtodelete: idArray,
          });
        }
      );
    }
    if(types == 'deletecolumn'){
      this.serverRequest = $.post(
        'api/forecast/read_columntool.php',
        { prod_toolname: toolnames },
        (product) => {
          var p= JSON.parse(product);
      
          var idArray = p.map(item => item.id);
      
          this.setState({
            allidtodelete: idArray,
          });
        }
      );
    }
    this.setState({ type: types });
    this.openForm();
  },
  
    handleSubmit: function (event) {
      event.preventDefault();
    
      // Handle form submission here, e.g., send a request to create an employee
    
      // Close the form after successful submission
      this.closeForm();
    },
    openForm: function () {
      this.setState({ isFormOpen: true });
      
    },
    
    closeForm: function () {
    
      this.setState({ isFormOpen: false });
      this.setState({ successUpdate: null });
      this.setState({ toolname: '' });
      this.setState({ id: '' });
      this.setState({ idw: '' });
      this.setState({ quarter: '' });
      this.setState({ createdby: '' });
      this.setState({ developby: '' });
      this.setState({ description: '' });
      this.setState({ toolnamew: '' });
      this.setState({ toolname: '' });
      this.setState({ products: null });
      this.setState({ allidtodelete: null });
    },

    onSave: function(e) {
      $.post('api/forecast/create_road.php', {
          title: this.state.toolname,
          createdby: this.state.user.email,
          tool: this.state.toolnamew,
          description: this.state.description,
          addedby: this.state.developby
          },
          function(res) {
              this.setState({successUpdate: res});
              if(res == 'true') {

                this.populate();
                // const existingTitle = this.state.toolname;
                // const existingcat = this.state.toolnamew;
                // const newData = {
                //   [existingcat]: this.state.description,
                // };
                // this.setState(prevState => ({
                //   toolData: {
                //     [existingTitle]: newData, // Add the new data
                //     ...prevState.toolData, // Preserve existing data by spreading it
                //   },
                // }));

                //   this.setState({toolnamew: ''});
                //   this.setState({description: ''});
              }
          }.bind(this));
      e.preventDefault();
  },


  onSaveTool: function(e) {
    $.post('api/forecast/create_newtool.php', {
        tool: this.state.toolnamew,
        },
        function(res) {
            this.setState({successUpdate: res});
            if(res == 'true') {
                this.setState({toolnamew: ''});
            }
            this.populateDistinctToolName();
        }.bind(this));
    e.preventDefault();
},

  handleSubmitDelete:function(e){

      $.post(
        'api/forecast/delete_road.php',
        { del_ids: this.state.allidtodelete },
        function (res) {
          if (res == "true") {
            this.populatemostdata();
            // this.deleteProductById(this.state.toolname,this.state.toolIndexs);
            this.closeForm();
          } 
        }.bind(this)
      );
  },
  handleSubmitDeleteColumn:function(){

    $.post(
      'api/forecast/delete_column.php',
      { del_ids: this.state.allidtodelete },
      function (res) {
        if (res == "true") {
        } 
      }.bind(this)
    );
    this.handleSubmitDeleteColumnSec();
},
handleSubmitDeleteColumnSec:function(){
  $.post(
    'api/forecast/delete_columnbytool.php',
    { prod_toolname: this.state.toolnamew },
    function (res) {
      if (res == "true") {
        this.populatemostdata();
        // this.populateDistinctToolName();
        // this.deleteProductById(this.state.toolname,this.state.toolIndexs);
        this.closeForm();
      } 
    }.bind(this)
  );

  
const updatedProducts = this.state.toolnamedistinct.filter((product) => product.toolname !== this.state.toolnamew);
   
this.setState({
  toolnamedistinct: updatedProducts,
});
},


handleCategoryClick: function (toolname,category,description, rowindexes, colindexes) {
  // Handle the click event for the category cell
  // alert(`Clicked on Tool Name: ${toolname}`);
  // alert(`Clicked on Category: ${category}`);
  // alert(`Clicked on Desc: ${description}`);
  // alert(`Clicked on Rowindex: ${rowindexes}`);
  // alert(`Clicked on Rowindex: ${colindexes}`);
  // Add your logic for handling the category click here
},


    render() {

    
    var toolnameOptions = this.state.toolnamedistinct.map(function(toolnames) {
      return (
          <option key={toolnames.toolname} value={toolnames.toolname}>{toolnames.toolname}</option>
      );
  });

      const { toolData, searchQuery , toolnamedistinct} = this.state;
      const tools = Object.keys(toolData);

      

      const uniqueCategoriesSetsec = new Set();

      // Iterate through each row in toolnamedistinct
      toolnamedistinct.forEach(row => {
        if (row.toolname) {
          // Assuming toolname is a single value, not an array
          uniqueCategoriesSetsec.add(row.toolname);
        }
      });
      
      // Convert the set to an array if needed
      const uniqueCategoriesArray = Array.from(uniqueCategoriesSetsec);
      
      const filteredTools = tools.filter(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()));

      $(".page-header h1").text("Projects Forecast");
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
            onClick={(event) => this.handleItemClick(event, '',"create")} 
           className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>&nbsp; <b>Add
              New Data</b>
            </a>
            <a 
            onClick={(event) => this.handleItemClick(event, '',"createnewtool")}
            className="btn btn-info">
              <span className="glyphicon glyphicon-plus"></span>&nbsp; 
              Create New Tool
            </a>
            <a 
            onClick={(event) => this.handleItemClick(event, '',"deletecolumn")}
            className="btn btn-warning">
              <span className="glyphicon glyphicon-trash"></span>&nbsp; 
              Delete Column
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
        <th style={{ width: '200px' ,minWidth:'200px', maxWidth:'200px'}}><b></b></th>
        {uniqueCategoriesArray.map((category, index) => (
          <th key={index} style={{ width: '190px',minWidth:'190px' }}>{category}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {filteredTools.map((tool, toolIndex) => (
        <tr key={toolIndex}>
          <td>
            <a href={`#ForecastShow?toolname=${encodeURIComponent(tool)}`}
              className="m-r-1em"
              style={{ margin: "5px" }}
              title="Show More"
            >
              <img src="ico/view.ico" alt="Logo" style={{ width: '30px', height: '30px' }} />
            </a>
            <a
              // href={`#roadDelete?toolname=${encodeURIComponent(tool)}`}event, toolname,types,toolIndex
              
              onClick={(event) => this.handleItemClick(event, encodeURIComponent(tool),"delete",toolIndex)}
              className="m-r-1em"
              style={{ margin: "5px" }}
              title="Delete this Project Tool"
            >
              <img src="ico/delete.ico" alt="Logo" style={{ width: '30px', height: '30px' }} />
            </a>
          </td>
          <td><b>{tool}</b></td>
          {uniqueCategoriesArray.map((category, categoryIndex) => (
            <td key={categoryIndex}
            onClick={() => this.handleCategoryClick(tool,category,toolData[tool][category] || '',toolIndex,categoryIndex)}
            style={{ cursor: 'pointer' }} 
            >
              {toolData[tool][category] || ''}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
    </table>

    {this.state.isFormOpen && (
          <div className={`form-popup ${this.state.isFormOpen ? "open" : "close"}`}>

                            {this.state.successUpdate == "true" ? (
                              <div className="alert alert-success" style={{marginBottom:'-15px'}}>Data was saved.</div>
                            ) : null}
                            {this.state.successUpdate != "true" &&
                            this.state.successUpdate != null ? (
                              <div className="alert alert-danger">{this.state.successUpdate}</div>
                            ) : null}
                            
                            {
                            this.state.type == "delete" ?
                            <form onSubmit={this.handleSubmit}>
                              <div className="alert alert-danger" style={{marginBottom:'-15px'}}>Deleting this cannot be undone</div>
                              <h2>Delete
                                <br/><br/> "{this.state.toolname}"?</h2>
                                <br/> <br/>
                                
                             
                            <div className="form-group" style={{display:'flex',justifyContent:'center'}}>
                              <button onClick={this.handleSubmitDelete} className="btn btn-danger" style={{width:'48%',float:'left',margin:'3px'}}>Delete</button>
                              <button onClick={this.closeForm} className="btn btn-custom-gray" style={{width:'48%',float:'right',margin:'3px'}}>Close</button>
                              </div>
                            </form>
                                : null
                            }
                            {this.state.type == "create" ?
                              <form onSubmit={this.handleSubmit}>
                              <h2>Create New</h2>
                              
                              <label>
                                Title:
                                  <input
                                    type="text"
                                    name="toolname"
                                    className="form-control"
                                    value={this.state.toolname}
                                    onChange={this.ontoolnameChange}
                                    required
                                  />
                                </label>
                                
                              
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Created By:
                                  <input
                                    type="text"
                                    name="createdby"
                                    className="form-control"
                                    value={this.state.user.email}
                                    onChange={this.oncreatedbyChange}
                                    disabled
                                    required
                                    
                                  />
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                               
                              Tool Name:
                                 <select
                                  onChange={this.ontoolnamedistinctChange}
                                  className="form-control"
                                  value={this.state.toolnamew}
                              >
                                  <option value="" disabled>Select Toolname</option>
                                  {toolnameOptions}
                              </select>
                              </label>
                                </div>
                                <label>
                                Develop By:
                                  <input
                                    type="text"
                                    name="developby"
                                    className="form-control"
                                    value={this.state.developby}
                                    onChange={this.ondevelopbyChange}
                                    required
                                  />
                                </label>
                                <label>
                                Description:
                                            <textarea
                                    type="text"
                                    name="description"
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={this.ondescriptionChange}
                                    style={{ resize: "none" ,height: '120px'}}
                                    required
                                  ></textarea>
                                </label>
                            <div className="form-group" style={{display:'flex',justifyContent:'center'}}>
                            <button onClick={this.onSave} className="btn btn-primary" style={{width:'48%',float:'left',margin:'3px'}}>Save</button>
                            <button onClick={this.closeForm} className="btn btn-custom-gray" style={{width:'48%',float:'right',margin:'3px'}}>Close</button>
                            </div>
                            </form>
                                : null
                            } 
                          {this.state.type == "createnewtool" ?
                            <form onSubmit={this.handleSubmit}>
                            <h2>Add New Tool</h2>
                            <br/>
                              <label>
                              Tool Name:
                                <input
                                  type="text"
                                  name="Tool"
                                  className="form-control"
                                  value={this.state.toolnamew}
                                  onChange={this.ontoolnamedistinctChange}
                                  required
                                />
                              </label>
                              <div className="form-group" style={{display:'flex',justifyContent:'center'}}>
                          <button onClick={this.onSaveTool} className="btn btn-primary" style={{width:'48%',float:'left',margin:'3px'}}>Save</button>
                          <button onClick={this.closeForm} className="btn btn-custom-gray" style={{width:'48%',float:'right',margin:'3px'}}>Close</button>
                          </div>
                          </form>
                              : null
                          }
                          {this.state.type == "deletecolumn" ?
                          <form onSubmit={this.handleSubmit}>
                            <div className="alert alert-danger" style={{marginBottom:'-15px'}}>Deleting this cannot be undone</div>
                            <h2>Delete "{this.state.toolnamew}"?</h2>
                              
                              <label>
                              Tool Name:
                                 <select
                                  onChange={this.ontoolnamedistinctColChange}
                                  className="form-control"
                                  value={this.state.toolnamew}
                              >
                                  <option value="" disabled>Select Toolname</option>
                                  {toolnameOptions}
                              </select>
                              </label>
                              <br/> 
                              
                           
                          <div className="form-group" style={{display:'flex',justifyContent:'center'}}>
                            <button onClick={this.handleSubmitDeleteColumn} className="btn btn-danger" style={{width:'48%',float:'left',margin:'3px'}}>Delete</button>
                            <button onClick={this.closeForm} className="btn btn-custom-gray" style={{width:'48%',float:'right',margin:'3px'}}>Close</button>
                            </div>
                          </form>
                              : null
                          }
        </div>
      )}
        </div>
      )}
    </div>
  );
}
});



