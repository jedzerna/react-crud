"use strict";
var TechpIndexComponent = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      isLoggedIn: "",
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "", // Initial search query is empty

      id: 0,
      Team: "",
      Publisher: "",
      ProjectDetails: "",
      ReceivedDate: "",
      DueDate: "",
      CurrentStatus: "",
      Remarks: "",
      type:'',
      successUpdate: null,
      highestid:0,

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
      "api/techpAPI/read_all_pending.php",
      function (products) {
        if (this.isMounted()) {
          this.setState({
            products: JSON.parse(products),
          });
        }
      }.bind(this)
    );
  },

  handleSearchChange: function (event) {
    const searchQuery = event.target.value;
    this.setState({
      searchQuery,
      currentPage: 1, // Reset current page when changing search query
    });
  },
  handleItemClick: function (event, id, types) {
    event.preventDefault();
    // Update the component's state with the clicked ID
    if ( id !=''){

    var productId = id;
    this.serverRequestProd = $.post(
      "api/techpAPI/read_one_pending.php",
      { prod_id: productId },
      function (product) {
        var p = JSON.parse(product)[0];
        this.setState({ id: p.id});
        this.setState({ Team: p.Team });
        this.setState({ Publisher: p.Publisher });
        this.setState({ ProjectDetails: p.ProjectDetails });
        this.setState({ ReceivedDate: p.ReceivedDate });
        this.setState({ DueDate: p.DueDate	 });
        this.setState({ CurrentStatus: p.CurrentStatus });
        this.setState({ Remarks: p.Remarks });
      }.bind(this)
    ); }
    this.setState({ type: types });
    this.openForm();
    // You can also add additional logic here to perform any desired actions
    
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
          <td>{product.Publisher}</td>
          <td>{product.ProjectDetails}</td>
          <td>{product.ReceivedDate}</td>
          <td>{product.DueDate}</td>
          <td>{product.CurrentStatus}</td>
          <td>{product.Remarks}</td>

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
//   onSnoChange: function(e) {
//     this.setState({
//         Sno: e.target.value
//     });
// },
onTeamChange: function(e) {
  this.setState({
    Team: e.target.value
  });
},
onPublisherChange: function(e) {
  this.setState({
    Publisher: e.target.value
  });
},
onProjectDetailsChange: function(e) {
  this.setState({
    ProjectDetails: e.target.value
  });
},
onReceivedDateChange: function(e) {
  this.setState({
    ReceivedDate: e.target.value
  });
},
onDueDateChange: function(e) {
  this.setState({
    DueDate: e.target.value
  });
},
onCurrentStatusChange: function(e) {
    this.setState({
        CurrentStatus: e.target.value
    });
  },
  onRemarksChange: function(e) {
    this.setState({
        Remarks: e.target.value
    });
  },

handleSubmitUpdate:function (e) {

  const updatedData = {
    
    Team: this.state.Team,
    Publisher: this.state.Publisher,
    ProjectDetails: this.state.ProjectDetails,
    ReceivedDate: this.state.ReceivedDate,
    DueDate: this.state.DueDate,
    CurrentStatus: this.state.CurrentStatus,
    Remarks: this.state.Remarks,
   
   // Add other properties you want to update
 };
 $.post(
 "api/techpAPI/update_pending.php", 
  {
    id: this.state.id,
    Team: this.state.Team,
    Publisher: this.state.Publisher,
    ProjectDetails: this.state.ProjectDetails,
    ReceivedDate: this.state.ReceivedDate,
    DueDate: this.state.DueDate,
    CurrentStatus: this.state.CurrentStatus,
    Remarks: this.state.Remarks,
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

    $.post('api/techpAPI/delete_pending.php',
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
  this.setState({ Team	: null });
  this.setState({ Publisher: null });
  this.setState({ ProjectDetails: null });
  this.setState({ ReceivedDate: null });
  this.setState({ DueDate: null });
  this.setState({ CurrentStatus: null });
  this.setState({ Remarks: null });
  
  
},
onSave: function(e) {
  e.preventDefault();

  $.post('api/techpAPI/create_pending.php', {
    // Sno: this.state.Sno,
    Team: this.state.Team,
    Publisher: this.state.Publisher,
    ProjectDetails: this.state.ProjectDetails,
    ReceivedDate: this.state.ReceivedDate,
    DueDate: this.state.DueDate,
    CurrentStatus: this.state.CurrentStatus,
    Remarks: this.state.Remarks,
  }, (res) => {
    this.setState({ successUpdate: res });

    if (res === 'true') {
      // After successfully saving the data, retrieve the highest ID
      $.get('api/techpAPI/pgethighestid.php', (products) => {
        this.setState({
          highestid: JSON.parse(products),
        });

        const productsWithNewProduct = [...this.state.products]; 
        productsWithNewProduct.unshift({
          id: this.state.highestid,
          Team: this.state.Team,
          Publisher: this.state.Publisher,
          ProjectDetails: this.state.ProjectDetails,
          ReceivedDate: this.state.ReceivedDate,
          DueDate: this.state.DueDate,
          CurrentStatus: this.state.CurrentStatus,
          Remarks: this.state.Remarks,
        
        });
        console.log(this.state.highestid);

        this.setState({
          products: productsWithNewProduct
        });
        console.log(productsWithNewProduct);

        // Clear the input fields
        this.setState({
        
        Team: '',
        Publisher: '',
        ProjectDetails: '',
        ReceivedDate: '',
        DueDate: '',
        CurrentStatus: '',
        Remarks: '',
        });
      });
    }
  });
},

  

  render: function () {
    $(".page-header h1").text("Technology Pending Project!");
    return (
      <div>
        <form>
		{/* <p>The table presents an overview of skill sets, categorized into Senior Engineers,Intermediate-level professionals, </p>
            <p>and Junior Engineers, within distinct sub-teams and the overarching team, accompanied by an "Actions" column.</p>
     */}
          <div className="input-group col-md-5 margin-bottom-1em pull-left">
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
           onClick={(event) => this.handleItemClick(event, '',"create")}
            className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>&nbsp; Create New Pending Project
            </a>
          
        </form>

        <table className="table tablse-bordered table-hover">
        <thead>
            <tr>
              <th style={{ width: "15%" }}>Team</th>
              <th style={{ width: "7%" }}>Publisher</th>
              <th style={{ width: "20%" }}>Project Details</th>
              <th style={{ width: "12%" }}>Received Date</th>
              <th style={{ width: "12%" }}>Due Date</th>
              <th style={{ width: "7%" }}>Current Status</th>
              <th style={{ width: "16%" }}>Remarks</th>
              
              <th className="posactionsizestable">Actions</th>
              {/* Add more table headers for other columns */}
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
        {this.renderPagination()}

        {this.state.isFormOpen && (
          <div className={`form-popup ${this.state.isFormOpen ? "open" : ""}`}>

                            {this.state.successUpdate == "true" ? (
                              <div className="alert alert-success" style={{marginBottom:'-15px'}}>Data was updated.</div>
                            ) : null}
                            {this.state.successUpdate != "true" &&
                            this.state.successUpdate != null ? (
                              <div className="alert alert-danger">{this.state.successUpdate}</div>
                            ) : null}
                            {
                            this.state.type == "editing" ?
                            <form onSubmit={this.handleSubmit}>
                            <h2>Update: {this.state.Team}</h2>
                            
                        <label style={{width:'92%',float:'left'}}>
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

                              <div className="form-group" >
                              <label style={{width:'41%',float:'left'}}>
                            
                              Publisher:
                                <input
                                  type="character"
                                  name="Publisher"
                                  className="form-control"
                                  value={this.state.Publisher}
                                  onChange={this.onPublisherChange}
                                  rows={2}
                                  style={{ resize: "none"}}
                                  required
                                />
                              </label>
                              <label style={{width:'50%',float:'left'}}>
                              Project Details:
                                <input
                                  type="text"
                                  name="ProjectDetails"
                                  className="form-control"
                                  value={this.state.ProjectDetails}
                                  onChange={this.onProjectDetailsChange}
                                  rows={2}
                                  style={{ resize: "none"}}
                                  required
                                />
                              </label>
                              </div>
                                <div className="form-group" style={{marginLeft:'75px',marginTop:'',height:'70px',width:'83%'}}>
                              <label style={{width:'35%',float:'left'}}>
                              Recieved Date:
                             <br/>
                             <br/>
                                <input
                                  type="date"
                                  name="ReceivedDate"
                                  className="form-control"
                                  value={this.state.ReceivedDate}
                                  onChange={this.onReceivedDateChange}
                                  required                             
                                />
                              </label>
                              
                              <label style={{width:'36%',float:'left'}}>
                              Due Date:
                             <br/>
                             <br/>
                                <input
                                  type="date"
                                  name="DueDate"
                                  className="form-control"
                                  value={this.state.DueDate}
                                  onChange={this.onDueDateChange}
                                 
                                />
                              </label>
                              </div>
                               
                              <label style={{width:'92%',float:'left'}}>
                              Current Status:
                                <input
                                  type="text"
                                  name="CurrentStatus"
                                  className="form-control"
                                  value={this.state.CurrentStatus}
                                  onChange={this.onCurrentStatusChange}
                                  required
                                  rows={2}
                                  style={{ resize: "none"}}

                                />
                              </label>
                            
                            <label>
                              Remarks:
                                          <textarea

                                  type="text"
                                  name="Remarks"
                                  className="form-control"
                                  value={this.state.Remarks}
                                  onChange={this.onRemarksChange}
                                  style={{ resize: "none" ,height: '115px', width:'92%'}}
                                 // required
                                ></textarea>
                              </label>
                              <div className="form-group">
                              <button onClick={this.handleSubmitUpdate} className="btn btn-primary" style={{width:'48%',float:'left'}}>Update</button>
                              <button onClick={this.closeForm} className="btn btn-custom-gray" style={{width:'48%',float:'right'}}>Close</button>
                              </div>
                            </form>
                                : null
                          }
                          {
                            this.state.type == "view" ?
                            <form onSubmit={this.handleSubmit}>
                              <h2>{this.state.Team}</h2>
                              <p>
                                <b>Team:  </b>{this.state.Team}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Publisher:  </b>{this.state.Publisher}
                              </p>
                              <p style={{width: '450px'}}>
                                <b>Project Details:  </b>{this.state.ProjectDetails}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Received Date	:  </b>{this.state.ReceivedDate}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Due Date:  </b>{this.state.DueDate}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Current Status:  </b>{this.state.CurrentStatus}
                              </p>
                              <p style={{width: '450px'}}>
                                <b>Remarks:  </b>{this.state.Remarks}
                              </p>
                              <button onClick={this.closeForm} className="btn btn-custom-gray">Close</button>
                            </form>
                                : null
                              }
                              {
                              this.state.type == "delete" ?
                              <form onSubmit={this.handleSubmit}>
                                <h2>Delete
                                  <br/><br/> "{this.state.Team}"?</h2> <br/><br/>
                                <div className="form-group">
                                <button onClick={this.handleSubmitDelete} className="btn btn-danger" style={{width:'48%',float:'left'}}>Delete</button>
                                <button onClick={this.closeForm} className="btn btn-custom-gray" style={{width:'48%',float:'right'}}>Close</button>
                                </div>
                              </form>
                                  : null
                              }
                              {this.state.type == "create" ?
                            <form onSubmit={this.handleSubmit}>
                            <h2>Create New</h2>
                     
                          <div className="form-group" >
                            <label style={{width:'48%',float:'left'}}>
                                Team:
                                  <input
                                    type="text"
                                    name="Team"
                                    className="form-control"
                                    value={this.state.Team}
                                    onChange={this.onTeamChange}
                                    required
                                    rows={2}
                                    style={{ resize: "none"}}
                                 />
                                 </label>
                                 
                                <label style={{width:'50%',float:'left'}}>
                                Publisher:
                                <input
                                    type="character"
                                    name="Publisher"
                                    className="form-control"
                                    value={this.state.Publisher}
                                    onChange={this.onPublisherChange}
                                    required
                                    rows={2}
                                    style={{resize:"none"}}
                               />
                            </label>
                            </div>

                                <label>
                                Project Details	:
                                            <input
                                    type="text"
                                    name="ProjectDetails"
                                    className="form-control"
                                    value={this.state.ProjectDetails}
                                    onChange={this.onProjectDetailsChange}
                                    //style={{ resize: "none" ,height: '120px'}}
                                    required
                                 />
                                </label>

                                <div className="form-group" style={{marginLeft:'75px',marginTop:'',height:'70px',width:'83%'}}>
                                <label style={{width:'35%',float:'left'}}>
                                Received Date:
                                  <br/>
                                  <br/>
                                <input
                                    type="date"
                                    name="ReceivedDate"
                                    className="form-control"
                                    value={this.state.ReceivedDate}
                                    onChange={this.onReceivedDateChange}
                                  //==style={{ resize: "none" ,height: '120px'}}
                                  rows={2}
                                    style={{ resize: "none" }}
                                    required
                                 />   
                              </label>
                                <label style={{width:'37%',float:'left'}}>   
                                Due Date: 
                              
                                <br/>
                                  <br/>
                                <input type="date"
                                    name="DueDate"
                                    className="form-control"
                                    value={this.state.DueDate}
                                    onChange={this.onDueDateChange}
                                    rows={2}
                                    style={{ resize: "none"}}
                                  />
                                </label>
                        </div>
                        
                        <div className="form-group" >
                        <label style={{width:'50%',float:'left'}}>
                                Current Status:
                                <input
                                    type="text"
                                    name="CurrentStatus"
                                    className="form-control"
                                    value={this.state.CurrentStatus}
                                    onChange={this.onCurrentStatusChange}
                                  //={{ resize: "none" ,height: '30px'}}
                                    required
                                    
                                  />
                                </label>
                                <label style={{width:'50%',float:'left'}}>
                                Remarks:
                                <input
                                    type="text"
                                    name="Remarks"
                                    className="form-control"
                                    value={this.state.Remarks}
                                    onChange={this.onRemarksChange}
                                 // style={{ resize: "none" ,height: '30px'}}
                                  //  required
                                  />
                                </label>
                                </div>
                            <div className="form-group">
                            <button onClick={this.onSave} className="btn btn-primary" style={{width:'48%',float:'left'}}>Save</button>
                            <button onClick={this.closeForm} className="btn btn-custom-gray" style={{width:'48%',float:'right'}}>Close</button>
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
  