"use strict";

var RoadShowToolComponent = React.createClass({
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
      toolname: "",
      quarter: '',
      description: '',
      developby: '',
      categories: [],
      catname: "",



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
  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
  },
  populateProducts: function () {
    var toolname = (this.props.toolname);

      this.serverRequestProd = $.post(
        "api/roadmap/read_one_road.php",
        { prod_toolname:  (toolname) },
        function (product) {
          var p = JSON.parse(product)[0];
          this.setState({ createdby: p.createdby });
          this.setState({ toolname: p.toolname });
        }.bind(this));
        this.serverRequest = $.get('api/roadmap/read_all_roadcategories.php', function(results) {
          this.setState({
              categories: JSON.parse(results)
          });
      }.bind(this));
      $(".page-header").css('border-bottom','1px solid #eeeeee'); 
  },

  anotherpopulate:function(){

    var toolname = (this.props.toolname);
    this.serverRequest = $.post(
      "api/roadmap/readcatandsub.php",
      { prod_toolname: (toolname) },
      function (products) {
        if (this.isMounted()) {
            this.setState({products: JSON.parse(products) });
        }
      }.bind(this));

    //   this.serverRequest = $.get('api/roadmap/readcatandsub.php', function(results) {
    //     this.setState({
    //       products: JSON.parse(results)
    //     });
    // }.bind(this));

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
      return product.developby.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedProducts = filteredProducts.slice(startIndex, endIndex);

    return displayedProducts.map((product, index) => {
      return (


        
        <tr key={index}>
          <td>{product.quarter}</td>
          <td>{product.description}</td>
          <td>{product.developby}</td>
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
      console.log(this.state.toolname);
      console.log(this.state.createdby);
      console.log(this.state.quarter);
      console.log(this.state.description);
      console.log(this.state.developby);
        $.post('api/roadmap/create_newdataroad.php', {
            toolname: this.state.toolname,
            createdby: this.state.createdby,
            quarter: this.state.quarter,
            description: this.state.description,
            developby: this.state.developby
            },
            function(res) {
                this.setState({successUpdate: res});
                // console.log(res);
                if(res == 'true') {
                    this.setState({quarter: ''});
                    this.setState({description: ''});
                    this.setState({developby: ''});
                }
                this.anotherpopulate();
            }.bind(this));
        e.preventDefault();
    },

    handleSubmitDelete:function(e){
      var productId = this.state.id;
      
    
        $.post('api/roadmap/delete_roadonly.php',
            {del_ids: [productId]},
            function(res) {
              this.anotherpopulate();
              this.closeForm();
            }.bind(this));
      
    },


    handleSubmitUpdate:function (e) {
      // console.log(this.state.id);
      var productId = this.state.id;

     
     $.post(
      "api/roadmap/update_roadtool.php",
      {
        id: productId,
        description: this.state.description,
        developby: this.state.developby,
        quarter: this.state.quarter,
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
          "api/roadmap/read_one_toolonly.php",
          { prod_id: productId },
          function (product) {
              var p = JSON.parse(product)[0];
              // console.log(p);
              this.setState({
                  id: productId,
                  quarter: p.quarter,
                  description: p.description,
                  developby: p.developby
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

    
  toggleCategoryExpansion(categoryId) {
    this.setState((prevState) => ({
      products: prevState.products.map((category) =>
        category.id === categoryId
          ? { ...category, isExpanded: !category.isExpanded }
          : category
      ),
    }));
  },
  render: function () {
    $(".page-header h1").text(this.state.toolname);

    var categoriesOptions = this.state.categories.map(function(category) {
      return (
          <option key={category.categoryname} value={category.categoryname}>{category.categoryname}</option>
      );
  });


  const tableRows = [];

    this.state.products.forEach((category) => {
      tableRows.push(
        <tr onClick={() => this.toggleCategoryExpansion(category.id)} key={category.id}>
           <td style={{ cursor: category.weeklylist.length > 0 ?'pointer' : 'default' }} >
           {category.weeklylist.length > 0 ? (
          <b>{category.isExpanded ? "➖" : "➕"} {category.quarter_det}</b>
        ) : <b>{category.quarter_det}</b>}
            
          </td> 
        
          <td style={{ cursor: category.weeklylist.length > 0 ?'pointer' : 'default'  }} >
          <b> {category.description_det}</b>
          </td> 
          <td style={{ cursor: category.weeklylist.length > 0 ?'pointer' : 'default'  }} >
          <b>{category.developby_det}</b>
          </td> 
         
        
        </tr>
      );

      if (category.isExpanded) {
        category.weeklylist.forEach((subcategory) => {
          tableRows.push(
            <tr key={subcategory.id}>
              <td style={{ paddingLeft: '60px' }}>{subcategory.userstory}</td>
              <td>
                {subcategory.description}
              </td>
              <td>
                {subcategory.developby}
              </td>
              <td>
                {subcategory.startdate}
              </td>
              <td>
                {subcategory.enddate}
              </td>
              <td>
                {subcategory.status}
              </td>
              <td>
                {subcategory.createdby}
              </td>
            </tr>
          );
        });
      }
    });




    return (
      <div>
      <h3>Created by: {this.state.createdby}</h3>
        <form>

        <a href="#roadIndex" className="btn btn-primary" style={{marginRight:'2px'}}>
              <span className="glyphicon glyphicon-chevron-left"></span>&nbsp; 
              Go Back
            </a>
            <a 
            onClick={(event) => this.handleItemClick(event, null,"create")}
            className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>&nbsp; 
              Add New Data
            </a>
            <a style={{marginLeft:'5px'}} 
            // onClick={(event) => this.handleItemClick(event, null,"createweekly")} 
           className="btn btn-info">
              <span className="glyphicon glyphicon-plus"></span>&nbsp;  <b>Add Weekly Report (Coming Soon)</b>
            </a>
        </form>
           

<h2 className="centered-container text-center">Road Map List</h2>
     
          

<table className="table table-hover">
  <thead>
          <tr> 
              <th  style={{ width: "18%" }}>Quarter/User Story</th>
              <th  style={{ width: "40%" }}>Description</th>
              <th  style={{ width: "10%" }}>Develop By</th>
              <th  style={{ width: "10%" }}>Start Date</th>
              <th  style={{ width: "10%" }}>End Date</th>
              <th  style={{ width: "6%" }}>Status</th>
              <th  style={{ width: "10%" }}>Added By</th>
            </tr>
  </thead>
        <tbody>{tableRows}</tbody>
      </table>
        {/* {this.renderPagination()} */}

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
                                Category:
                                  <select
                                  disabled
                                      onChange={this.onquarterChange}
                                      className="form-control"
                                      value={this.state.quarter}
                                  >
                                      <option value="" disabled>Please Select Quarter</option>
                                      {categoriesOptions}
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
                              <h2>{this.state.toolname}</h2>
                              <br/>
                              <label>
                                Category:
                                  <select
                                      onChange={this.onquarterChange}
                                      className="form-control"
                                      value={this.state.quarter}
                                  >
                                      <option value="" disabled>Please Select Quarter</option>
                                      {categoriesOptions}
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
                             {this.state.type == "createweekly" ?
                            <form onSubmit={this.handleSubmit}>
                              
                              {this.state.id != 0 ? 
                          <div className="form-group" style={{display:'flex'}} >
                                <label style={{float:'left'}}>
                                <a className="btn btn-primary" style={{width:'40px',borderRadius:'13px',marginLeft:'-3px',marginRight:'10px'}}
                                onClick={() => this.handleCategoryClick(this.state.selectedTool,this.state.selectedQuarter,selectedDescription,'','')}
                                >
                                <span className="glyphicon glyphicon-chevron-left"></span>&nbsp;
                              </a>
                              </label>
                              <label style={{width:'60%',float:'right'}}>
                            <h2 style={{marginTop:'1px'}}>Weekly Report</h2>
                              </label>
                           </div>
                              : <h2>Weekly Report</h2>
                          }

                            <div className="form-group">
                                <label style={{width:'67%',float:'left'}}>
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
                              <label style={{width:'30%',float:'right'}}>
                              Status:
                                 <select
                                  onChange={this.onstatusChange}
                                  className="form-control"
                                  value={this.state.status}
                              >
                                  <option value="" disabled>Select Status</option>
                                  <option value="Pending" >Pending</option>
                                  <option value="Hold" >Hold</option>
                                  <option value="Completed" >Completed</option>
                              </select>
                              </label>
                                </div>


                              
                             
                              {filteredProducts.length === 0 ? (<div></div>) : <div>
                              <label>Please Select Which Quarter you wanna add</label>
                                </div>}
                              {filteredProducts.length === 0 ? (
                              <div className="alert alert-success">Please Select a Tool Name</div>
                                ) : 
                              <ul style={listStyle}>
                                    {filteredProducts.map((toolnameSQLs) => (
                                      <li key={toolnameSQLs.description}  
                                      
                                      style={
                                        toolnameSQLs.id == this.state.selectedItem ? selectedStyle : itemStyle
                                      }
                                      onClick={() => this.handleItemClickSelected(toolnameSQLs.id)}
                                      onChange={this.onselecteditemChange}
                                      >

                                      <b>{toolnameSQLs.quarter}:</b> <br/> <br/>
                                      {toolnameSQLs.description}
                                      </li>
                                    ))}
                              </ul>
                            }
                            <label>Pending</label>
                            <label className="switch">
                            <input type="checkbox" 
                            onChange={this.handleCheckboxChange}
                            checked = {isChecked? true:false}
                            />
                            <span className="slider"></span>
                           
                          </label>

                            <div className="form-group" style={{marginLeft:'75px',marginTop:'-60px',height:'70px',width:'83%'}}>
                              
                                <label style={{width:'48%',float:'left'}}>
                                
                                  Start Date
                                  <br/>
                                  <br/>
                                  <input 
                                  value={this.state.startdate}
                                  onChange={this.onstartdateChange}
                                  style={{height:'40px',float:'left'}} type="date"/>
                           
                                </label>

                                <label style={{width:'48%',float:'right'}}>
                                  End Date
                                  <br/>
                                  <br/>
                                    <input 
                                    value={isChecked? this.state.enddate :this.state.enddate}
                                    onChange={this.onenddateChange}
                                    disabled={this.state.isChecked}
                                    style={{ 
                                      height: '40px', 
                                      float: 'right' , 
                                      backgroundColor:isChecked ? 'lightgray' : '#0080ff'
                                      }} 
                                    type="date" />
                                </label>

                                
                                </div>
                              <div className="form-group">
                                <label style={{width:'55%',float:'left'}}>
                                User Story:
                                  <input
                                    type="text"
                                    name="story"
                                    className="form-control"
                                    value={this.state.userstory}
                                    onChange={this.onuserstoryChange}
                                    required
                                  />
                                </label>

                                
                                <label style={{width:'42%',float:'right'}}>
                              Develop By:
                              <input
                                    type="text"
                                    name="story"
                                    className="form-control"
                                    value={this.state.developby}
                                    onChange={this.ondevelopbyChange}
                                    required
                                  />
                              </label>
                                </div>
                                
                              <label>
                              Description:
                                          <textarea
                                  type="text"
                                  name="description"
                                  className="form-control"
                                  value={this.state.description}
                                  onChange={this.ondescriptionChange}
                                  style={{ resize: "none" ,height: '70px'}}
                                  required
                                />
                              </label>
                              {this.state.resultMessage == "true" ? (
                              <div className="alert alert-success" >Data was saved.</div>
                            ) : null}
                            {this.state.resultMessage != "true" &&
                            this.state.resultMessage != null ? (
                              <div className="alert alert-danger">{this.state.resultMessage}</div>
                            ) : null}
                          <div className="form-group" style={{display:'flex',justifyContent:'center'}}>
                          <button onClick={this.onsaveWeekly} className="btn btn-primary" style={{width:'48%',float:'left',margin:'3px'}}>Save</button>
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
