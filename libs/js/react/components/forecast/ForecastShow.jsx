"use strict";

var ForecastShowComponent = React.createClass({
  getInitialState: function () {
    return {
      id: 0,
      products: [],
      isLoggedIn: "",
      productids: 0,
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "", // Initial search query is empty
      selectedRows: [], // Array to store selected products
      selectAll: false, 

      

      createdby: "",
      title: "",
      tool: '',
      description: '',
      addedby: '',
      categories: [],
      catname: "",
      toolnamedistinct: [],
      toolnamew:'',



      toolsnameste: "",
      highestid:0,
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
    this.populateProducts();
    this.anotherpopulate();
    this.populateDistinctToolName();
  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
  },
  
  populateDistinctToolName: function(){

    this.serverRequest = $.get('api/forecast/readToolNameDistinct.php', function(results) {
      this.setState({
        toolnamedistinct: JSON.parse(results)
      });
  }.bind(this));

  },
  populateProducts: function () {
    var toolname = (this.props.toolname);

      this.serverRequestProd = $.post(
        "api/forecast/read_one_road.php",
        { prod_toolname:  (toolname) },
        function (product) {
          var p = JSON.parse(product)[0];
          this.setState({ createdby: p.createdby });
          this.setState({ title: decodeURI(toolname) });
        }.bind(this));
        this.serverRequest = $.get('api/forecast/read_all_roadcategories.php', function(results) {
          this.setState({
              categories: JSON.parse(results)
          });
      }.bind(this));
      $(".page-header").css('border-bottom','1px solid #eeeeee'); 
  },

  anotherpopulate:function(){

    var toolname = (this.props.toolname);
    this.serverRequest = $.post(
      "api/forecast/read_one_tool.php",
      { prod_toolname: (toolname) },
      function (products) {
        if (this.isMounted()) {
            this.setState({products: JSON.parse(products) });
        }
      }.bind(this));
  },

  handleSearchChange: function (event) {
    const searchQuery = event.target.value;
    this.setState({
      searchQuery,
      currentPage: 1, // Reset current page when changing search query
    });
  },

  renderTableData: function () {
    const { products, currentPage, itemsPerPage, searchQuery } = this.state;
    const filteredProducts = products.filter((product) => {
      return product.tool.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedProducts = filteredProducts.slice(startIndex, endIndex);

    return displayedProducts.map((product, index) => {
      return (


        
        <tr key={index}>
          <td>{product.tool}</td>
          <td>{product.description}</td>
          <td>{product.addedby}</td>
          {this.state.isLoggedIn == "false" ? (
            <td>
              <a
                href={"#roadEditTool?id=" + product.id}
                className="btn btn-primary m-r-1em"
                style={{ width: "100px", margin: "5px" }}
              >
                Edit
              </a>
            </td>
          ) : (
            // This is the one
            <td>
               <a
                // href={"#roadEditTool?id=" + product.id}
                onClick={(event) => this.handleItemClick(event, product.id,"editing")}
                className=" m-r-1em"
                style={{ margin: "5px" }}
                title="Edit"
              >
              <img src="ico/edit.ico" alt="Logo" style={{width:'30px',height:'30px'}}/>
              </a>
              <a
                // href={"#roadDeleteTool?id=" + product.id}
                
                onClick={(event) => this.handleItemClick(event, product.id,"delete")}
                className="m-r-1em"
                style={{margin: "5px" }}
                title="Delete this row"
              >
              <img src="ico/delete.ico" alt="Logo" style={{width:'30px',height:'30px'}}/>
              </a>
            </td>
            
          )}
        </tr>
      );
    });
  },

  renderPagination: function () {
    const { products, currentPage, itemsPerPage } = this.state;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={currentPage === i ? 'active' : ''}
          onClick={() => this.handlePageClick(i)}
        >
          {i}
        </li>
      );
    }

    return (
      <div className="my-pagination-container">
      <button
        onClick={this.handleFirstPage}
        disabled={currentPage === 1}
      >
        First Page
      </button>
      <button
        onClick={this.handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous Page
      </button>
      <ul className="my-pagination">
        {pageNumbers}
      </ul>
      <button
        onClick={this.handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next Page
      </button>
      <button
        onClick={this.handleLastPage}
        disabled={currentPage === totalPages}
      >
        Last Page
      </button>
      <div className="items-per-page">
        Items per Page:
        <select
          value={this.state.itemsPerPage}
          onChange={this.handleItemsPerPageChange}
        >
          <option value="10">10</option>
          <option value="25">25</option>
        </select>
      </div>
    </div>
    );
  },

  handlePageClick: function (pageNumber) {
    this.setState({
      currentPage: pageNumber
    });
  },

  handlePreviousPage: function () {
    const { currentPage } = this.state;
    const prevPage = Math.max(currentPage - 1, 1);

    this.setState({
      currentPage: prevPage,
    });
  },

  handleNextPage: function () {
    const { currentPage, products, itemsPerPage } = this.state;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const nextPage = Math.min(currentPage + 1, totalPages);

    this.setState({
      currentPage: nextPage,
    });
  },

  handleItemsPerPageChange: function (event) {
    this.setState({
      itemsPerPage: parseInt(event.target.value, 10),
      currentPage: 1, // Reset current page when changing items per page
    });
  },

  ontoolnamedistinctChange: function(e) {
    const toolname = e.target.value;
    this.setState({
      toolnamew: toolname,
    });
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

ontoolnamewChange: function(e) {
  this.setState({
      toolnamew: e.target.value
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
        $.post('api/forecast/create_newdataroad.php', {
            title: this.state.title,
            createdby: this.state.createdby,
            tool: this.state.toolnamew,
            description: this.state.description,
            addedby: this.state.developby
            },
            function(res) {
                this.setState({successUpdate: res});
                console.log(res);
                if(res == 'true') {
                    this.setState({quarter: ''});
                    this.setState({description: ''});
                    this.setState({developby: ''});
                }
                this.anotherpopulate();
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
      var productId = this.state.id;
      
    
        $.post('api/forecast/delete_roadonly.php',
            {del_ids: [productId]},
            function(res) {
              this.anotherpopulate();
              this.closeForm();
            }.bind(this));
      
    },


    handleSubmitUpdate:function (e) {
      console.log(this.state.id);
      var productId = this.state.id;

     
     $.post(
      "api/forecast/update_roadtool.php",
      {
        id: productId,
        description: this.state.description,
        addedby: this.state.developby,
        tool: this.state.toolnamew,
      },
         function (res) {
           this.setState({ successUpdate: res });
           this.anotherpopulate();
         }.bind(this)
       );
       e.preventDefault();
     
     },


    handleItemClick: function (event, id,types) {
      event.preventDefault();
      if(id!= null){
        // console.log(id);
        var productId = id;
        this.serverRequestProd = $.post(
          "api/forecast/read_one_toolonly.php",
          { prod_id: productId },
          function (product) {
              var p = JSON.parse(product)[0];
              console.log(p);
              this.setState({
                  id: productId,
                  toolnamew: p.tool,
                  description: p.description,
                  developby: p.addedby
              });
          }.bind(this));
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
      this.setState({ quarter: '' });
      this.setState({ description: '' });
      this.setState({ developby: '' });
      this.setState({ id: 0 });
    },
  render: function () {
    $(".page-header h1").text(this.state.title);

    var categoriesOptions = this.state.categories.map(function(category) {
      return (
          <option key={category.categoryname} value={category.categoryname}>{category.categoryname}</option>
      );
  });


  var toolnameOptions = this.state.toolnamedistinct.map(function(toolnames) {
    return (
        <option key={toolnames.toolname} value={toolnames.toolname}>{toolnames.toolname}</option>
    );
});

    return (
      <div>
      <h3>Created by: {this.state.createdby}</h3>
        <form>

        <a href="#ForecastIndex" className="btn btn-primary" style={{marginRight:'2px'}}>
              <span className="glyphicon glyphicon-chevron-left"></span>&nbsp; 
              Go Back
            </a>
            <a 
            // href={"#roadCreateTool?toolname=" + (this.state.toolname)} 
            
            onClick={(event) => this.handleItemClick(event, null,"create")}
            className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>&nbsp; 
              Add New Data
            </a>
            <a 
            onClick={(event) => this.handleItemClick(event, null,"createnewtool")}
            className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>&nbsp; 
              Create New Tool
            </a>
            
        </form>
           

<h2 className="centered-container text-center">Records</h2>
     
          
        <div className="input-group col-md-3 margin-bottom-1em pull-left">
              <span className="input-group-addon">
                <i className="glyphicon glyphicon-search"></i>
              </span>
              <input
              type="text"
              className="form-control searchbox"
              placeholder="Search by product..."
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
              />
            </div>
        <table className="table table-bordered table-hover">
          <thead>
            <tr> 
              <th  style={{ width: "15%" }}>Product</th>
              <th  style={{ width: "50%" }}>Description</th>
              <th  style={{ width: "20%" }}>Added By</th>
              <th  style={{ width: "6%" }}>Actions</th>
              {/* Add more table headers for other columns */}
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
        {this.renderPagination()}

        {this.state.isFormOpen && (
          <div className={`form-popup ${this.state.isFormOpen ? "open" : "close"}`}>

                            {/* {this.state.successUpdate == "true" ? (
                              <div className="alert alert-success" style={{marginBottom:'-15px'}}>Data was saved.</div>
                            ) : null}
                            {this.state.successUpdate != "true" && this.state.successUpdate != null ? (
                              <div className="alert alert-danger">{this.state.successUpdate}</div>
                            ) : null} */}

                            {
                            this.state.successUpdate == 'true' ?
                                <div className="alert alert-success"  style={{marginBottom:'-15px'}}>
                                    Data was saved.
                                </div>
                                : null
                            }
                            {
                            this.state.successUpdate != 'true' && this.state.successUpdate != null ?
                                <div className="alert alert-danger"  style={{marginBottom:'-15px'}}>
                                    {this.state.successUpdate}
                                </div>
                                : null
                            }
                            {this.state.type == "editing" ?
                              <form onSubmit={this.handleSubmit}>
                              <h2>Update: {this.state.toolsnameste}</h2>
                              
                              <br/>
                              <label>
                               
                               Tool Name:
                                  <select
                                  disabled
                                   onChange={this.ontoolnamedistinctChange}
                                   className="form-control"
                                   value={this.state.toolnamew}
                               >
                                   <option value="" disabled>Select Toolname</option>
                                   {toolnameOptions}
                               </select>
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
                                <div className="form-group" style={{display:'flex',justifyContent:'center'}}>
                              <button onClick={this.handleSubmitUpdate} className="btn btn-primary" style={{width:'48%',float:'left',margin:'3px'}}>Update</button>
                              <button onClick={this.closeForm} className="btn btn-custom-gray" style={{width:'48%',float:'right',margin:'3px'}}>Close</button>
                              </div>
                            </form>
                                : null
                            }
                            {
                            this.state.type == "delete" ?
                            <form onSubmit={this.handleSubmit}>
                              <h2>Delete
                                <br/><br/> "{this.state.quarter}"?</h2>
                                <h4>{this.state.description}</h4>
                                 <br/><br/>
                                
                                 <div className="form-group" style={{display:'flex',justifyContent:'center'}}>
                              <button onClick={this.handleSubmitDelete} className="btn btn-danger" style={{width:'48%',float:'left',margin:'3px'}}>Delete</button>
                              <button onClick={this.closeForm} className="btn btn-custom-gray" style={{width:'48%',float:'right',margin:'3px'}}>Close</button>
                              </div>
                            </form>
                                : null
                            }
                            {this.state.type == "create" ?
                              <form onSubmit={this.handleSubmit}>
                              <h2>{this.state.title}</h2>
                              <br/>
                              <label>
                               
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
        </div>
      )}





      </div>
    );
  },
});
