"use strict";

var MtIndexComponent = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      selectedProductIds: [],
      isLoggedIn: "",
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "", // Initial search query is empty

      id: 0,
      toolname: "",
      department: "",
      productname: "",
      activities: "",
      publishers: "",
      description: null,

      
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
  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
  },
  populateProducts: function () {
    this.serverRequest = $.get(
      "api/mastertools/mt_readall.php",
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


  handleCheckboxChange: function (checked,productId) {

    if (checked) {
      this.setState({
        selectedProductIds: this.state.selectedProductIds.concat([productId]),
      });
    } else {
      this.setState({
        selectedProductIds: this.state.selectedProductIds.filter((el) => el !== productId),
      });
    }
    console.log(this.state.selectedProductIds);
  },
  deleteSelected: function (e) {

    console.log(this.state.selectedProductIds);
    var r = confirm(
      "Are you sure you want to delete the selected product(s)?"
    );
    if (r == true) {
      $.post('api/mastertools/mt_delete.php',
        { del_ids: this.state.selectedProductIds },
        function (res) {
          if (res == "true") {
            this.setState({
              products: this.state.products.filter(
                (el) => this.state.selectedProductIds.indexOf(el.id) < 0
              ),
            });
            this.setState({ selectedProductIds: [] });

          } else {
            alert("Unable to delete product(s).");
          }
        }.bind(this)
      );
    }
  
    e.preventDefault();
  },

  toggleAll: function (e) {
    var selectedProducts = [];
    if (e.target.checked) {
      this.state.products.forEach(function (product) {
        selectedProducts.push(product.id);
      });
      this.setState({ selectedProductIds: selectedProducts });
    } else {
      this.setState({ selectedProductIds: [] });
    }
    console.log(selectedProducts);
  },
  renderTableData: function () {
    const { products, currentPage, itemsPerPage, searchQuery } = this.state;
    const filteredProducts = products.filter((product) => {
      return product.toolname.toLowerCase().includes(searchQuery.toLowerCase());
    });
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    const displayedProducts = filteredProducts.slice(startIndex, endIndex);
  
    return displayedProducts.map((product, index) => {
      return (
        <tr key={index}>
          <td>
          <input
            type="checkbox"
            onChange={(e) =>
              this.handleCheckboxChange(e.target.checked, product.id)
            }
            checked={
              (this.state.selectedProductIds &&
                this.state.selectedProductIds.indexOf(product.id)) >= 0
            }
          />
        </td>
          <td>{product.toolname}</td>
          <td>{product.department}</td>
          <td>{product.productname}</td>
          <td>{product.activities}</td>
          <td>{product.publishers}</td>
          <td>{product.description}</td>
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
        "api/mastertools/mt_readone.php",
        { prod_id: productId },
        function (product) {
          var p = JSON.parse(product)[0];
          this.setState({ toolname: p.toolname });
          this.setState({ id: p.id });
          this.setState({ department: p.department });
          this.setState({ productname: p.productname });
          this.setState({ toolsnameste: p.toolname });
          this.setState({ activities: p.activities });
          this.setState({ publishers: p.publishers });
          this.setState({ description: p.description });
        }.bind(this)
      ); 
    }
    this.setState({ type: types });
    this.openForm();
  },
  handleSubmitUpdate:function (e) {

    const updatedData = {
      toolname: this.state.toolname,
      department: this.state.department,
      productname: this.state.productname,
      activities: this.state.activities,
      publishers: this.state.publishers,
      description: this.state.description,
     // Add other properties you want to update
   };
   
     $.post(
      "api/mastertools/mt_update.php",
      {
        id: this.state.id,
        toolname: this.state.toolname,
        department: this.state.department,
        productname: this.state.productname,
        activities: this.state.activities,
        publishers: this.state.publishers,
        description: this.state.description,
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
   
       $.post('api/mastertools/mt_delete.php',
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
     console.log(this.state.products);
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
       this.setState({ toolname: null });
       this.setState({ id: null });
       this.setState({ department: null });
       this.setState({ productname: null });
       this.setState({ toolsnameste: null });
       this.setState({ activities: null });
       this.setState({ publishers: null });
       this.setState({ description: null });
     },

     ontoolnameChange: function (e) {
      this.setState({ toolname: e.target.value });
    },
  
    ondepartmentChange: function (e) {
      this.setState({ department: e.target.value });
    },
  
    onproductnameChange: function (e) {
      this.setState({ productname: e.target.value });
    },
  
    onactivitiesChange: function (e) {
      this.setState({ activities: e.target.value });
    },
    onpublishersChange: function (e) {
      this.setState({ publishers: e.target.value });
    },
  
    ondescriptionChange: function (e) {
      this.setState({ description: e.target.value });
    },
    onSave: function(e) {
      e.preventDefault();
    
      $.post('api/mastertools/mt_create.php', {
        toolname: this.state.toolname,
        department: this.state.department,
        productname: this.state.productname,
        activities: this.state.activities,
        publishers: this.state.publishers,
        description: this.state.description,
      }, (res) => {
        this.setState({ successUpdate: res });
    
        if (res === 'true') {
          // After successfully saving the data, retrieve the highest ID
          $.get('api/mastertools/mt_gethighestid.php', (products) => {
            this.setState({
              highestid: JSON.parse(products),
            });

            const productsWithNewProduct = [...this.state.products]; 
            productsWithNewProduct.unshift({
              id: this.state.highestid,
              toolname: this.state.toolname,
              department: this.state.department,
              productname: this.state.productname,
              activities: this.state.activities,
              publishers: this.state.publishers,
              description: this.state.description,
            });
            this.setState({
              products: productsWithNewProduct
            });
            // Clear the input fields
            this.setState({
              toolname: '',
              department: '',
              productname: '',
              activities: '',
              publishers: '',
              description: '',
            });
          });
        }
      });
    },

  render: function () {
    $(".page-header h1").text("Master Tools");
    return (
      <div>
            <form>
            <div className="input-group col-md-3 margin-bottom-1em pull-left">
              <span className="input-group-addon">
                <i className="glyphicon glyphicon-search"></i>
              </span>
              <input
              type="text"
              className="form-control searchbox"
              placeholder="Search by toolname..."
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
              />
            </div>
              <a style={{marginLeft:'5px'}} 
              onClick={(event) => this.handleItemClick(event, null,"create")} 
              className="btn btn-primary">
                  <span className="glyphicon glyphicon-plus"></span>&nbsp; Create
              Product
                </a>
          
          <button
              className="btn btn-danger margin-bottom-1em pull-right"
              onClick={this.deleteSelected}
              style={{ marginLeft: "60px" }}
            >
              <span className="glyphicon glyphicon-trash"></span>&nbsp; Delete
              Selected Products
            </button>
        </form>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center" style={{ width: "1%" }}>
              <input
                title="checkbox"
                type="checkbox"
                onChange={this.toggleAll}
              />
            </th>
              <th  style={{ width: "10%" }}>Tool Name</th>
              <th  style={{ width: "10%" }}>Department</th>
              <th style={{ width: "15%" }}>Product Name</th>
              <th style={{ width: "10%" }}>Activities</th>
              <th style={{ width: "10%" }}>Publishers</th>
              <th style={{ width: "20%" }}>Description</th>
              <th className="thirdactionsizestable">Actions</th>
              {/* Add more table headers for other columns */}
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
        {this.renderPagination()}


        {this.state.isFormOpen && (
          <div className={`form-popup ${this.state.isFormOpen ? "open" : "close"}`}>

                            {this.state.successUpdate == "true" ? (
                              <div className="alert alert-success" style={{marginBottom:'-15px'}}>Data was saved.</div>
                            ) : null}
                            {this.state.successUpdate != "true" &&
                            this.state.successUpdate != null ? (
                              <div className="alert alert-danger">{this.state.successUpdate}</div>
                            ) : null}
                            {this.state.type == "editing" ?
                              <form onSubmit={this.handleSubmit}>
                              <h2>Update: {this.state.toolsnameste}</h2>
                              
                              <label>
                                Tool Name:
                                  <input
                                    
                                    type="text"
                                    name="toolname"
                                    className="form-control"
                                    value={this.state.toolname}
                                    onChange={this.ontoolnameChange}
                                  />
                                </label>
                                
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Product Name:
                                  <input
                                    type="text"
                                    name="productname"
                                    className="form-control"
                                    value={this.state.productname}
                                    onChange={this.onproductnameChange}
                                    
                                  />
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                Department:
                                  <input
                                    type="text"
                                    name="department"
                                    className="form-control"
                                    value={this.state.department}
                                    onChange={this.ondepartmentChange}
                                  />
                                </label>
                                </div>
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Activities:
                                  <input
                                    type="text"
                                    name="activities"
                                    className="form-control"
                                    value={this.state.activities}
                                    onChange={this.onactivitiesChange}
                                  />
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                Publishers:
                                  <input
                                    type="text"
                                    name="publishers"
                                    className="form-control"
                                    value={this.state.publishers}
                                    onChange={this.onpublishersChange}
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
                              <h2>{this.state.toolsnameste}</h2>
                              <p style={{width: '350px'}}>
                                <b>Tool Name:  </b>{this.state.toolname}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Department:  </b>{this.state.department}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Product Name:  </b>{this.state.productname}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Activities:  </b>{this.state.activities}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Publishers:  </b>{this.state.publishers}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Description:  </b>{this.state.description}
                              </p>
                              <button onClick={this.closeForm} className="btn btn-custom-gray" style={{maxWidth:'200px'}}>Close</button>
                            </form>
                                : null
                            }
                            {
                            this.state.type == "delete" ?
                            <form onSubmit={this.handleSubmit}>
                              <h2>Delete
                                <br/><br/> "{this.state.toolsnameste}"?</h2> <br/><br/>
                                
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
                                Tool Name:
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
                                Product Name:
                                  <input
                                    type="text"
                                    name="productname"
                                    className="form-control"
                                    value={this.state.productname}
                                    onChange={this.onproductnameChange}
                                    required
                                    
                                  />
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                Department:
                                  <input
                                    type="text"
                                    name="department"
                                    className="form-control"
                                    value={this.state.department}
                                    onChange={this.ondepartmentChange}
                                    required
                                  />
                                </label>
                                </div>
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Activities:
                                  <input
                                    type="text"
                                    name="activities"
                                    className="form-control"
                                    value={this.state.activities}
                                    onChange={this.onactivitiesChange}
                                    required
                                  />
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                Publishers:
                                  <input
                                    type="text"
                                    name="publishers"
                                    className="form-control"
                                    value={this.state.publishers}
                                    onChange={this.onpublishersChange}
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
