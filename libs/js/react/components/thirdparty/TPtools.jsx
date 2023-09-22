"use strict";

var TPtoolsComponent = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      isLoggedIn: "",
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "", // Initial search query is empty

      id: 0,
      Team: "",
      Purpose: "",
      SoftwareName: "",
      Details: "",
      License: "",
      site: null,

      
      SoftwareNameste: "",
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
  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
  },
  populateProducts: function () {
    this.serverRequest = $.get(
      "api/read_all_thirdparty.php",
      function (products) {
        if (this.isMounted()) {
          this.setState({
            products: JSON.parse(products),
          });
        }
      }.bind(this));
      $(".page-header").css('border-bottom','1px solid #eeeeee'); 
    
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
      return product.Team.toLowerCase().includes(searchQuery.toLowerCase());
    });
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    const displayedProducts = filteredProducts.slice(startIndex, endIndex);
  
    return displayedProducts.map((product, index) => {
      return (
        <tr key={index}>
          <td>{product.Team}</td>
          <td>{product.Purpose}</td>
          <td>{product.SoftwareName}</td>
          <td>{product.Details}</td>
          <td>{product.License}</td>
          <td>{product.site}</td>
          {this.state.isLoggedIn == "false" ? (
            <td style={{ width: "120px" }}>
            <a 
                onClick={(event) => this.handleItemClick(event, product.id,"view")}
                className="aactionfontcustom"
              title="Read"
            >
              <img src="ico/view.ico" alt="Logo" className="imgcustom"/>
            </a>
            
            <a
                onClick={(event) => this.handleItemClick(event, product.id,"editing")}
                className="aactionfontcustom"
              title="Edit"
            >
              <img src="ico/edit.ico" alt="Logo" className="imgcustom"/>
            </a>
            
            </td>
          ) : (
            // This is the one
            <td className="actiontablecenter">
         
              <a 
                onClick={(event) => this.handleItemClick(event, product.id,"view")}
              className="aactionfontcustom"
              title="Read"
            >
              <img src="ico/view.ico" alt="Logo"  className="imgcustom"/>
            </a>
            
            <a
                onClick={(event) => this.handleItemClick(event, product.id,"editing")}
                className="aactionfontcustom"
              title="Edit"
            >
              <img src="ico/edit.ico" alt="Logo"  className="imgcustom"/>
            </a>
            <a
                onClick={(event) => this.handleItemClick(event, product.id,"delete")}
                className="aactionfontcustom"
              title="Delete"
            >
              <img src="ico/delete.ico" alt="Logo"  className="imgcustom"/>
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

  handleLastPage: function () {
    const { products, itemsPerPage } = this.state;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    this.handlePageClick(totalPages);
  },
  handleFirstPage: function () {
    this.handlePageClick(1);
  },
  handleItemsPerPageChange: function (event) {
    this.setState({
      itemsPerPage: parseInt(event.target.value, 10),
      currentPage: 1, // Reset current page when changing items per page
    });
  },

  handleItemClick: function (event, id,types) {
    event.preventDefault();
    if(id!= null){
      var productId = id;
      this.serverRequestProd = $.post(
        "api/read_one_thirdparty.php",
        { prod_id: productId },
        function (product) {
          var p = JSON.parse(product)[0];
          this.setState({ Team: p.Team });
          this.setState({ id: p.id });
          this.setState({ Purpose: p.Purpose });
          this.setState({ SoftwareName: p.SoftwareName });
          this.setState({ SoftwareNameste: p.SoftwareName });
          this.setState({ Details: p.Details });
          this.setState({ License: p.License });
          this.setState({ site: p.site });
        }.bind(this)
      ); 
    }
    this.setState({ type: types });
    this.openForm();
  },
  handleSubmitUpdate:function (e) {

    const updatedData = {
      Team: this.state.Team,
      Purpose: this.state.Purpose,
      SoftwareName: this.state.SoftwareName,
      Details: this.state.Details,
      License: this.state.License,
      site: this.state.site,
     // Add other properties you want to update
   };
   
     $.post(
      "api/update_thirdparty.php",
      {
        id: this.state.id,
        Team: this.state.Team,
        Purpose: this.state.Purpose,
        SoftwareName: this.state.SoftwareName,
        Details: this.state.Details,
        License: this.state.License,
        site: this.state.site,
      },
       function (res) {
         this.setState({ successUpdate: res });
         
         this.updateProductById(this.state.id,updatedData);
       }.bind(this)
     );
     e.preventDefault();
   
   },
   
   updateProductById: function (productId, updatedData) {
     const updatedProducts = this.state.products.map((product) => {
       if (product.id === productId) {
         return { ...product, ...updatedData };
       } else {
         return product;
       }
     });
     this.setState({
       products: updatedProducts,
     });
   },
     
   
   handleSubmitDelete:function(e){
     var r = confirm(
       "Are you sure you want to delete this record?"
     );
     if (r == true) {
       var productId = this.state.id;
   
       $.post('api/delete_thirdparty.php',
           {del_ids: [productId]},
           function(res) {
             this.deleteProductById(productId);
             this.closeForm();
           }.bind(this));
     }
   },
   
   deleteProductById: function (productId) {
     const updatedProducts = this.state.products.filter((product) => product.id !== productId);
   
     this.setState({
       products: updatedProducts,
     });
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
       this.setState({ Team: null });
       this.setState({ id: null });
       this.setState({ Purpose: null });
       this.setState({ SoftwareName: null });
       this.setState({ SoftwareNameste: null });
       this.setState({ Details: null });
       this.setState({ License: null });
       this.setState({ site: null });
     },

     onTeamChange: function (e) {
      this.setState({ Team: e.target.value });
    },
  
    onPurposeChange: function (e) {
      this.setState({ Purpose: e.target.value });
    },
  
    onSoftwareNameChange: function (e) {
      this.setState({ SoftwareName: e.target.value });
    },
  
    onDetailsChange: function (e) {
      this.setState({ Details: e.target.value });
    },
    onLicenseChange: function (e) {
      this.setState({ License: e.target.value });
    },
  
    onsiteChange: function (e) {
      this.setState({ site: e.target.value });
    },
    onSave: function(e) {
      e.preventDefault();
    
      $.post('api/create_thirdparty.php', {
        Team: this.state.Team,
        Purpose: this.state.Purpose,
        SoftwareName: this.state.SoftwareName,
        Details: this.state.Details,
        License: this.state.License,
        site: this.state.site,
      }, (res) => {
        this.setState({ successUpdate: res });
    
        if (res === 'true') {
          // After successfully saving the data, retrieve the highest ID
          $.get('api/thirdparty_getid.php', (products) => {
            this.setState({
              highestid: JSON.parse(products),
            });

            const productsWithNewProduct = [...this.state.products]; 
            productsWithNewProduct.unshift({
              id: this.state.highestid,
              Team: this.state.Team,
              Purpose: this.state.Purpose,
              SoftwareName: this.state.SoftwareName,
              Details: this.state.Details,
              License: this.state.License,
              site: this.state.site,
            });
            console.log(this.state.highestid);

            this.setState({
              products: productsWithNewProduct
            });
            console.log(productsWithNewProduct);
    
            // Clear the input fields
            this.setState({
              Team: '',
              Purpose: '',
              SoftwareName: '',
              Details: '',
              License: '',
              site: '',
            });
          });
        }
      });
    },

  render: function () {
    $(".page-header h1").text("Welcome to Third Party Tools!");
    return (
      <div>
        <form>
		      <p>This table provides a comprehensive depiction of different teams, 
            each serving a specific purpose, along with corresponding software names utilized for their functions. Detailed information about each team's role and responsibilities is outlined, complemented by the licensing arrangements for the software. Additionally, the respective site associated with each team's operations is specified, with an "Actions" column denoting possible next steps or tasks.</p>
          
        <div className="input-group col-md-3 margin-bottom-1em pull-left">
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-search"></i>
          </span>
          <input
              type="text"
              className="form-control searchbox"
              placeholder="Search by team..."
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
          />
        </div>
           <a style={{marginLeft:'5px'}} 
            onClick={(event) => this.handleItemClick(event, null,"create")} className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>&nbsp; Create New Data
            </a>
        </form>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th  style={{ width: "10%" }}>Team</th>
              <th  style={{ width: "10%" }}>Purpose</th>
              <th style={{ width: "15%" }}>Software Name</th>
              <th style={{ width: "10%" }}>Details</th>
              <th style={{ width: "10%" }}>License</th>
              <th style={{ width: "20%" }}>site</th>
              <th className="thirdactionsizestable">Actions</th>
              {/* Add more table headers for other columns */}
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
        {this.renderPagination()}


        {this.state.isFormOpen && (
          <div className={`form-popup ${this.state.isFormOpen ? "open" : ""}`}>

                            {/* {this.state.successUpdate == "true" ? (
                              <div className="alert alert-success" style={{marginBottom:'-15px'}}>Data was saved.</div>
                            ) : null}
                            {this.state.successUpdate != "true" &&
                            this.state.successUpdate != null ? (
                              <div className="alert alert-danger">{this.state.successUpdate}</div>
                            ) : null} */}

                            {
                            this.state.successUpdate == "true" ?
                                <div className="alert alert-success"  style={{marginBottom:'-15px'}}>
                                    Data was saved.
                                </div>
                                : null
                            }
                            {
                            this.state.successUpdate != "true" && this.state.successUpdate != null ?
                                <div className="alert alert-danger"  style={{marginBottom:'-15px'}}>
                                    {this.state.successUpdate}
                                </div>
                                : null
                            }


                            {this.state.type == "editing" ?
                              <form onSubmit={this.handleSubmit}>
                              <h2>Update: {this.state.SoftwareNameste}</h2>
                              
                              <label>
                                Software Name:
                                  <input
                                    type="text"
                                    name="SoftwareName"
                                    className="form-control"
                                    value={this.state.SoftwareName}
                                    onChange={this.onSoftwareNameChange}
                                  />
                                </label>
                                
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Team:
                                  <input
                                    type="text"
                                    name="Team"
                                    className="form-control"
                                    value={this.state.Team}
                                    onChange={this.onTeamChange}
                                    
                                  />
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                Purpose:
                                  <input
                                    type="text"
                                    name="Purpose"
                                    className="form-control"
                                    value={this.state.Purpose}
                                    onChange={this.onPurposeChange}
                                  />
                                </label>
                                </div>
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Details:
                                  <input
                                    type="text"
                                    name="Details"
                                    className="form-control"
                                    value={this.state.Details}
                                    onChange={this.onDetailsChange}
                                  />
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                License:
                                  <input
                                    type="text"
                                    name="License"
                                    className="form-control"
                                    value={this.state.License}
                                    onChange={this.onLicenseChange}
                                  />
                                </label>
                                </div>
                                <label>
                                Site:
                                            <textarea
                                    type="text"
                                    name="site"
                                    className="form-control"
                                    value={this.state.site}
                                    onChange={this.onsiteChange}
                                    style={{ resize: "none" ,height: '120px'}}
                                    required
                                  ></textarea>
                                </label>
                            <div className="form-group" style={{display:'flex',justifyContent:'center'}}>
                              <button onClick={this.handleSubmitUpdate} className="btn btn-primary" style={{width:'48%',float:'left',margin:'3px'}}>Update</button>
                              <button onClick={this.closeForm} className="btn btn-custom-gray" style={{width:'48%',float:'right',margin:'3px'}}>Close</button>
                              </div>
                            </form>
                                : null
                            }
                            {
                            this.state.type == "view" ?
                            <form onSubmit={this.handleSubmit}>
                              <h2>{this.state.SoftwareNameste}</h2>
                              <p style={{width: '350px'}}>
                                <b>Team:  </b>{this.state.Team}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Purpose:  </b>{this.state.Purpose}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Software Name:  </b>{this.state.SoftwareName}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Details:  </b>{this.state.Details}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>License:  </b>{this.state.License}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Site:  </b>{this.state.site}
                              </p>
                              <button onClick={this.closeForm} className="btn btn-custom-gray" style={{maxWidth:'200px'}}>Close</button>
                            </form>
                                : null
                            }
                            {
                            this.state.type == "delete" ?
                            <form onSubmit={this.handleSubmit}>
                              <h2>Delete
                                <br/><br/> "{this.state.SoftwareNameste}"?</h2> <br/><br/>
                             
                                
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
                                Software Name:
                                  <input
                                    type="text"
                                    name="SoftwareName"
                                    className="form-control"
                                    value={this.state.SoftwareName}
                                    onChange={this.onSoftwareNameChange}
                                    required
                                  />
                                </label>
                                
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Team:
                                  <input
                                    type="text"
                                    name="Team"
                                    className="form-control"
                                    value={this.state.Team}
                                    onChange={this.onTeamChange}
                                    required
                                    
                                  />
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                Purpose:
                                  <input
                                    type="text"
                                    name="Purpose"
                                    className="form-control"
                                    value={this.state.Purpose}
                                    onChange={this.onPurposeChange}
                                    required
                                  />
                                </label>
                                </div>
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Details:
                                  <input
                                    type="text"
                                    name="Details"
                                    className="form-control"
                                    value={this.state.Details}
                                    onChange={this.onDetailsChange}
                                    required
                                  />
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                License:
                                  <input
                                    type="text"
                                    name="License"
                                    className="form-control"
                                    value={this.state.License}
                                    onChange={this.onLicenseChange}
                                    required
                                  />
                                </label>
                                </div>
                                <label>
                                Site:
                                            <textarea
                                    type="text"
                                    name="site"
                                    className="form-control"
                                    value={this.state.site}
                                    onChange={this.onsiteChange}
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
        </div>
      )}
      </div>
    );
  },
});
