"use strict";

var EmpIndexComponent = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      selectedProductIds: [],
      isLoggedIn: "",
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "", // Initial search query is empty
      isFormOpen: false, // New state variable for form visibility
   
      id: 0,
      EmployeeIDste: "",
      EmployeeID: "",
      EmployeeName: "",
      PrimarySkillsets: "",
      SecondarySkillsets: "",
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
      "api/employeeAPI/read_all_emloyee.php",
      function (products) {
        if (this.isMounted()) {
          this.setState({
            products: JSON.parse(products),
          });
        }
      }.bind(this)
    );
    $(".page-header").css('border-bottom','1px solid #eeeeee'); 

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

    var r = confirm(
      "Are you sure you want to delete the selected product(s)?"
    );
    if (r == true) {
      $.post(
        'api/employeeAPI/delete_employee.php',
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


  deleteProductById: function (productId) {
    const updatedProducts = this.state.products.filter((product) => product.id !== productId);
  
    this.setState({
      products: updatedProducts,
    });
  },

  handleSearchChange: function (event) {
    const searchQuery = event.target.value;
    this.setState({
      searchQuery,
      currentPage: 1, // Reset current page when changing search query
    });
  },
  handleItemClick: function (event, id,types) {
    event.preventDefault();
    
    if(id!= null){
      var productId = id;
      this.serverRequestProd = $.post(
        "api/employeeAPI/read_one_employee.php",
        { prod_id: productId },
        function (product) {
          var p = JSON.parse(product)[0];
          this.setState({ id: p.id });
          this.setState({ EmployeeIDste: p.EmployeeID });
          this.setState({ EmployeeID: p.EmployeeID });
          this.setState({ EmployeeName: p.EmployeeName });
          this.setState({ PrimarySkillsets: p.PrimarySkillsets });
          this.setState({ SecondarySkillsets: p.SecondarySkillsets });
        }.bind(this)
      ); 
    }
    this.setState({ type: types });
    this.openForm();
  },
  renderTableData: function () {
    const { products, currentPage, itemsPerPage, searchQuery } = this.state;
    const filteredProducts = products.filter((product) => {
      return product.EmployeeID.toLowerCase().includes(searchQuery.toLowerCase());
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
        <td>{product.EmployeeID}</td>
          <td>{product.EmployeeName}</td>
          <td>{product.PrimarySkillsets}</td>
          <td>{product.SecondarySkillsets}</td>
    
          {this.state.isLoggedIn == "false" ? (
            <td className="actiontablecenter">
           
            </td>
          ) : (
            // This is the one
            <td className="actiontablecenter">

            <a 
                // href={"#EmpShow?id=" + product.id}
                className="aactionfontcustom"
                onClick={(event) => this.handleItemClick(event, product.id,"view")}
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
            <a
                onClick={(event) => this.handleItemClick(event, product.id,"delete")}
                className="aactionfontcustom"
              title="Delete"
            >
              <img src="ico/delete.ico" alt="Logo" className="imgcustom"/>
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

  handleLastPage: function () {
    const { products, itemsPerPage } = this.state;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    this.handlePageClick(totalPages);
  },
  handleFirstPage: function () {
    this.handlePageClick(1);
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
  handleFormChange: function (event) {
    const { name, value } = event.target;
    const formData = { ...this.state.formData, [name]: value };
    this.setState({ formData });
  },

  
  onEmployeeIDChange: function(e) {
    this.setState({
      EmployeeID: e.target.value
    });
},


  onEmployeeNameChange: function(e) {
    this.setState({
      EmployeeName: e.target.value
    });
},

onPrimarySkillsetsChange: function(e) {
    this.setState({
      PrimarySkillsets: e.target.value
    });
},

onSecondarySkillsetsChange: function(e) {
    this.setState({
      SecondarySkillsets: e.target.value
    });
},

handleSubmitUpdate:function (e) {

 const updatedData = {
  EmployeeID: this.state.EmployeeID,
  EmployeeName: this.state.EmployeeName,
  PrimarySkillsets: this.state.PrimarySkillsets,
  SecondarySkillsets: this.state.SecondarySkillsets,
  // Add other properties you want to update
};

  $.post(
    "api/employeeAPI/update_employee.php",
    {
      id: this.state.id,
      EmployeeID: this.state.EmployeeID,
      EmployeeName: this.state.EmployeeName,
      PrimarySkillsets: this.state.PrimarySkillsets,
      SecondarySkillsets: this.state.SecondarySkillsets,
    },
    function (res) {
      this.setState({ successUpdate: res });
      
  console.log(this.state.id);
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
  console.log(updatedProducts);
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

    $.post('api/employeeAPI/delete_employee.php',
        {del_ids: [productId]},
        function(res) {
          this.deleteProductById(productId);
          this.closeForm();
        }.bind(this));
  }
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
    this.setState({ EmployeeID: null });
    this.setState({ id: null });
    this.setState({ EmployeeName: null });
    this.setState({ PrimarySkillsets: null });
    this.setState({ SecondarySkillsets: null });
    this.setState({ EmployeeIDste: null });
  },
  onSave: function(e) {
    e.preventDefault();
  
    $.post('api/employeeAPI/create_employee.php', {
      EmployeeID: this.state.EmployeeID,
      EmployeeName: this.state.EmployeeName,
      PrimarySkillsets: this.state.PrimarySkillsets,
      SecondarySkillsets: this.state.SecondarySkillsets,
    }, (res) => {
      this.setState({ successUpdate: res });
  
      if (res === 'true') {
        // After successfully saving the data, retrieve the highest ID
        $.get('api/employeeAPI/gethighestid.php', (products) => {
          this.setState({
            highestid: JSON.parse(products),
          });

          const productsWithNewProduct = [...this.state.products]; 
          productsWithNewProduct.unshift({
            id: this.state.highestid,
            EmployeeID: this.state.EmployeeID,
            EmployeeName: this.state.EmployeeName,
            PrimarySkillsets: this.state.PrimarySkillsets,
            SecondarySkillsets: this.state.SecondarySkillsets,
          });
          console.log(this.state.highestid);

          this.setState({
            products: productsWithNewProduct
          });
          console.log(productsWithNewProduct);
  
          // Clear the input fields
          this.setState({
            EmployeeID: '',
            EmployeeName: '',
            PrimarySkillsets: '',
            SecondarySkillsets: '',
          });
        });
      }
    });
  },
  render: function () {
    $(".page-header h1").text("Welcome to Employees Page!");
    return (
      <div>
        <form>
		      <p>The provided information comprises a tabular representation of employees, including their unique Employee IDs and corresponding Employee Names. The "Primary Skillsets" column highlights the main areas of expertise possessed by each employee, while the "Secondary Skillsets" column denotes additional skill areas they are competent in. The "Actions" column likely indicates potential tasks, decisions, or options related to the employees' profiles. </p>
          
          <div className="input-group col-md-3 margin-bottom-1em pull-left">
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-search"></i>
          </span>
          <input
              type="text"
              className="form-control searchbox"
              placeholder="Search by employee ID..."
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
          />
        </div>
           <a style={{marginLeft:'5px'}} 
                onClick={(event) => this.handleItemClick(event, null,"create")}
            className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>&nbsp; Create New Employee
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
              <th style={{ width: "1%" }}></th>
              <th style={{ width: "7%" }}>Empl ID</th>
              <th style={{ width: "15%" }}>Employee Name</th>
              <th style={{ width: "30%" }}>Primary Skillsets</th>
              <th style={{ width: "30%" }}>Secondary Skillsets</th>
              <th className="empactionsizestable">Actions</th>
              {/* Add more table headers for other columns */}
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
        {this.renderPagination()}



      {this.state.isFormOpen && (
          <div className={`form-popup ${this.state.isFormOpen ? "open" : ""}`}>


                            {/* {this.state.type == "view" ?
                            <div class="btn-group" style={{paddingBottom:'25px'}}>
                            <button type="button" class="btn btn-default btn-xs">
                            Small button <span class="caret"></span></button>
                            <button type="button" class="btn btn-default btn-xs">Middle</button>
                            <button type="button" class="btn btn-xs">Right</button>
                          </div>
                              // <div className="form-group" style={{paddingBottom:'25px'}}>
                              //   <a onClick={(event) => this.handleItemClick(event, this.state.id,"delete")} className="btn btn-danger" style={{width:'48%',height:'30px',float:'left',fontWeight:'Regular'}}>Delete</a>
                              // <button onClick={(event) => this.handleItemClick(event, this.state.id,"editing")} className="btn btn-primary" style={{width:'48%',height:'30px',float:'right'}}>Update</button>
                              // </div>
                              : null
                            } 
                            {this.state.type == "editing" ?
                            <div className="form-group" style={{paddingBottom:'25px'}}>
                            <button onClick={(event) => this.handleItemClick(event, this.state.id,"delete")} className="btn btn-danger" style={{width:'48%',height:'30px',float:'left'}}>Delete</button>
                            <button onClick={(event) => this.handleItemClick(event, this.state.id,"view")} className="btn btn-primary" style={{width:'48%',height:'30px',float:'right'}}>View</button>
                            </div>
                            : null
                            }
                            {this.state.type == "delete" ?
                            <div className="form-group" style={{paddingBottom:'25px'}}>
                            <button onClick={(event) => this.handleItemClick(event, this.state.id,"view")} className="btn btn-success" style={{width:'48%',height:'30px',float:'left'}}>View</button>
                            <button onClick={(event) => this.handleItemClick(event, this.state.id,"editing")} className="btn btn-primary" style={{width:'48%',height:'30px',float:'right'}}>Update</button>
                            </div>
                            : null
                            }
                            */}
                            {this.state.successUpdate == "true" ? (
                              <div className="alert alert-success" style={{marginBottom:'-15px'}}>Data was updated.</div>
                            ) : null}
                            {this.state.successUpdate != "true" &&
                            this.state.successUpdate != null ? (
                              <div className="alert alert-danger">{this.state.successUpdate}</div>
                            ) : null} 


                            {this.state.type == "editing" ?
                              <form onSubmit={this.handleSubmit}>
                              <h2>Update: {this.state.EmployeeIDste}</h2>
                                <label>
                                  Employee ID:
                                  <input
                                    type="text"
                                    name="EmployeeID"
                                    className="form-control"
                                    value={this.state.EmployeeID}
                                    onChange={this.onEmployeeIDChange}
                                  />
                                </label>
                                <label>
                                  Employee Name:
                                  <input
                                    type="text"
                                    name="EmployeeName"
                                    className="form-control"
                                    value={this.state.EmployeeName}
                                    onChange={this.onEmployeeNameChange}
                                  />
                                </label>
                                <label>
                                  Primary Skillsets:
                                  <input
                                    type="text"
                                    name="PrimarySkillsets"
                                    className="form-control"
                                    value={this.state.PrimarySkillsets}
                                    onChange={this.onPrimarySkillsetsChange}
                                  />
                                </label>
                                <label>
                                  Secondary Skillsets:
                                            <textarea
                                    type="text"
                                    name="SecondarySkillsets"
                                    className="form-control"
                                    value={this.state.SecondarySkillsets}
                                    onChange={this.onSecondarySkillsetsChange}
                                    style={{ resize: "none" ,height: '120px'}}
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
                              <h2>{this.state.EmployeeName}</h2>
                              <p style={{width: '350px'}}>
                                <b>Employee ID:  </b>{this.state.EmployeeID}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Primary Skillsets:  </b>{this.state.PrimarySkillsets}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Secondary Skillsets:  </b>{this.state.SecondarySkillsets}
                              </p>
                              <button onClick={this.closeForm} className="btn btn-custom-gray" style={{maxWidth:'200px'}}>Close</button>
                            </form>
                                : null
                            }
                            {
                            this.state.type == "delete" ?
                            <form onSubmit={this.handleSubmit}>
                              <h2>Delete
                                <br/><br/> "{this.state.EmployeeName}"?</h2> <br/><br/>
                              
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
                                  Employee ID:
                                  <input
                                    type="text"
                                    name="EmployeeID"
                                    className="form-control"
                                    value={this.state.EmployeeID}
                                    onChange={this.onEmployeeIDChange}
                                    required
                                  />
                                </label>
                                <label>
                                  Employee Name:
                                  <input
                                    type="text"
                                    name="EmployeeName"
                                    className="form-control"
                                    value={this.state.EmployeeName}
                                    onChange={this.onEmployeeNameChange}
                                    required
                                  />
                                </label>
                                <label>
                                  Primary Skillsets:
                                  <input
                                    type="text"
                                    name="PrimarySkillsets"
                                    className="form-control"
                                    value={this.state.PrimarySkillsets}
                                    onChange={this.onPrimarySkillsetsChange}
                                    required
                                  />
                                </label>
                                <label>
                                  Secondary Skillsets:
                                            <textarea
                                    type="text"
                                    name="SecondarySkillsets"
                                    className="form-control"
                                    value={this.state.SecondarySkillsets}
                                    onChange={this.onSecondarySkillsetsChange}
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
