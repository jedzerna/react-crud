"use strict";


var HandleIndexComponent = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      isLoggedIn: "",
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "", // Initial search query is empty

      id: 0,
      action: "",
      actionste: "",
      dateraised: "",
      responsible: "",
      duedate: "",
      status: "",
      remarks: "",
      type:'',
      successUpdate: null,
      isChecked:false,


      selectedstatus:'',

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
      "api/handletask/read_all_tasks.php",
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

  handleSearchChange: function (event) {
    const searchQuery = event.target.value;
    this.setState({
      searchQuery,
      currentPage: 1, // Reset current page when changing search query
    });
  },
  // handleItemClick: function (event, id, types) {
  //   event.preventDefault();
  //   // Update the component's state with the clicked ID
  
  //   if ( id !=''){

  //   var productId = id;
  //   this.serverRequestProd = $.post(
  //     "api/handletask/read_one_task.php",
  //     { prod_id: productId },
  //     function (product) {
  //       var p = JSON.parse(product)[0];
  //       this.setState({
  //         id: p.id,
  //         action: p.action,
  //         actionste: p.action,
  //         dateraised: p.dateraised,
  //         responsible: p.responsible,
  //         duedate: p.duedate,
  //         status: p.status,
  //         remarks: p.remarks,
  //       });
        
        
  //     }.bind(this)
  //   ); 
  
  // if(this.state.duedate == null){
  //   // this.setState((prevState) => ({
  //   //   isChecked: !prevState.isChecked,
  //   // }));  
  //   this.setState({
  //     isChecked: 'true'
  //   });
  //   this.setState({
  //     duedate: ''
  //   });
  // }
  // }
  //   this.setState({ type: types });
  //   this.openForm();
    
  // },


  handleItemClick: function (event, id, types) {
    event.preventDefault();
    if (id !== '') {

      
      this.setState({
        isChecked: false, 
      });
      this.handleCheckboxChange();
      // Send a POST request to fetch the item data
      this.serverRequestProd = $.post(
        "api/handletask/read_one_task.php",
        { prod_id: id },
        (product) => {
          const p = JSON.parse(product)[0];
          // Update state using a single setState call for better performance
          this.setState({
            id: p.id,
            action: p.action,
            actionste: p.action,
            dateraised: p.dateraised,
            responsible: p.responsible,
            duedate: p.duedate,
            status: p.status,
            remarks: p.remarks,
          });
          // // Handle null duedate
          if (p.duedate === '' || p.duedate === null || typeof p.duedate === 'undefined') {
            this.setState({ isChecked: true });  
          }else{
            this.setState({ isChecked: false });  
          }
        }
      );
    }else{
      this.setState({ isChecked: false });  
    }
  
    this.setState({ type: types });
    this.openForm();
  },



  renderTableData: function () {
    const { products, currentPage, itemsPerPage, searchQuery } = this.state;
    const filteredProducts = products.filter((product) => {
      return product.action.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedProducts = filteredProducts.slice(startIndex, endIndex);

    return displayedProducts.map((product, index) => {
      return (
        <tr key={index}>
          <td>{product.action}</td>
          <td>{product.dateraised}</td>
          <td>{product.responsible}</td>
          <td>{product.duedate}</td>
          <td>{product.status}</td>
          <td>{product.remarks}</td>

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
  onactionChange: function(e) {
    this.setState({
      action: e.target.value
    });
},
ondateraisedChange: function(e) {
  this.setState({
    dateraised: e.target.value
  });
},
onresponsibleChange: function(e) {
  this.setState({
    responsible: e.target.value
  });
},
onduedateChange: function(e) {
  this.setState({
    duedate: e.target.value
  });
},
onstatusChange: function(e) {
  this.setState({
    status: e.target.value
  });
},
onselectedstatusChange: function(e) {
  this.setState({
    selectedstatus: e.target.value
  });
},
onremarksChange: function(e) {
  this.setState({
    remarks: e.target.value
  });
},


handleCheckboxChange: function() {
  if(this.state.type === 'editing'){

    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
    }));  
  }else{
    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
    }));  
    this.setState({
      duedate: ''
    });
  }
},

handleSubmitUpdate:function (e) {
  // alert(this.state.duedate);.

  var sduedate = null;
  if(this.state.duedate == "" ||this.state.duedate == '0000-00-00'){
    sduedate = null;
  }else{
    sduedate = this.state.duedate;
  }

  var sstatus = '';
  if(this.state.status == "None"){
    sstatus = '';
  }else{
    sstatus = this.state.status;
  }

  var checked = false;
if(this.state.isChecked == false){
  if(this.state.duedate == null || this.state.duedate == '0000-00-00' ){
    var res = 'Please add a due date';
    sduedate = this.state.duedate;
    this.setState({ successUpdate: res });
    return
  }
}else{
  sduedate = null;
}
  const updatedData = {
    action: this.state.action,
    dateraised: this.state.dateraised,
    responsible: this.state.responsible,
    duedate: sduedate,
    status: sstatus,
    remarks: this.state.remarks,
    
    // Add other properties you want to update
  };
  $.post(
   "api/handletask/update_handle.php",
   {
     id: this.state.id,
     action: this.state.action,
     dateraised: this.state.dateraised,
     responsible: this.state.responsible,
     duedate: sduedate,
     status: sstatus,
     remarks: this.state.remarks,
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

    $.post('api/handletask/delete_handle.php',
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
  this.setState({ action: null });
  this.setState({ dateraised: null });
  this.setState({ responsible: null });
  this.setState({ duedate: null });
  this.setState({ status: null });
  this.setState({ remarks: null });
  this.setState({ actionste: null });
},

filterStatus:function(){

 
  var stats = this.state.selectedstatus;
  if(stats != ''){
    
      if(stats == 'None'){
        stats = '';
      }
        if(stats == 'All'){
          this.populateProducts();
        }else{
        
          this.serverRequestProd = $.post(
            "api/handletask/filterbystatus.php",
            { prod_status: stats },
            (product) => {
              if (this.isMounted()) {
                this.setState({
                  products: JSON.parse(product),
                });
              }
            }
          );
        }
  }



},
onSave: function(e) {
  e.preventDefault();
  var sstatus = '';
  var sduedate = null;
  if(this.state.duedate == ""){
    sduedate = null;
  }else{
    sduedate = this.state.duedate;
  }

  
  if(this.state.status == "None"){
    sstatus = '';
  }else{
    sstatus = this.state.status;
  }
  $.post('api/handletask/create_handle.php', {
    action: this.state.action,
    dateraised: this.state.dateraised,
    responsible: this.state.responsible,
    
    duedate: sduedate,
    status: sstatus,
    remarks: this.state.remarks,
  }, (res) => {
    this.setState({ successUpdate: res });

    if (res === 'true') {
      // After successfully saving the data, retrieve the highest ID
      $.get('api/handletask/gethighestid.php', (products) => {
        this.setState({
          highestid: JSON.parse(products),
        });

        const productsWithNewProduct = [...this.state.products]; 
        productsWithNewProduct.unshift({
          id: this.state.highestid,
          action: this.state.action,
          dateraised: this.state.dateraised,
          responsible: this.state.responsible,
          duedate: sduedate,
          status: sstatus,
          remarks: this.state.remarks,
        });

        this.setState({
          products: productsWithNewProduct
        });

        // Clear the input fields
        this.setState({
          action: '',
          // dateraised: '',
          // responsible: '',
          duedate: '',
          status: '',
          remarks: '',
        });

      });
    }
  });
  if (sduedate === '' || sduedate === null || typeof sduedate === 'undefined') {
    this.setState({ isChecked: true });  
  }else{
    this.setState({ isChecked: false });  
  }
},

calculateLeft: function(startDate) {
  // Calculate left position based on the start date
  // You may need to implement your own logic here
  return 0;
},

calculateWidth: function(startDate, endDate) {
  // Calculate width based on the start and end date
  // You may need to implement your own logic here
  return 100;
},

  render: function () {
    
  const { isChecked } = this.state;
    $(".page-header h1").text("Technology Status");
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
              placeholder="Search by action team..."
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
          />
        </div>
           <a style={{marginLeft:'5px'}} 
           onClick={(event) => this.handleItemClick(event, '',"create")}
            className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>&nbsp;Add New Data
            </a>

           <a style={{marginLeft:'5px',float:'right'}} 
>  
  
<label style={{width:'200px'}}>
                                <select
                                 
                                      onChange={this.onselectedstatusChange}
                                      className="form-control"
                                      value={this.state.selectedstatus}
                                      onClick={this.filterStatus}
                                      required
                                  >
                                      <option value="All" disabled>Filter by Status</option>
                                      <option value="All" >All</option>
                                      <option value="In Progress" >In Progress</option>
                                      <option value="Pending" >Pending</option>
                                      <option value="On Hold" >On Hold</option>
                                      <option value="Comnpleted" >Completed</option>
                                      <option value="None" >None</option>
                                  </select>
                                </label>
    </a>

        </form>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th  style={{ width: "17%" }}>Action Team</th>
              <th  style={{ width: "5%" }}>Date Raised</th>
              <th style={{ width: "10%" }}>Responsible</th>
              <th style={{ width: "5%" }}>Due Date</th>
              <th style={{ width: "5%" }}>Status</th>
              <th style={{ width: "18%" }}>Remarks</th>
              <th className="handctionsizestable">Actions</th>
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
                              <h2>Update: {this.state.actionste}</h2>
                            <label>
                            Action Item:
                                  <input
                                    type="text"
                                    name="action"
                                    className="form-control"
                                    value={this.state.action}
                                    onChange={this.onactionChange}
                                    required
                                  />
                                </label>
                                
                                <label>Pending</label>
                            <label className="switch">
                            <input type="checkbox" 
                            checked = {isChecked? true:false}
                            onChange={this.handleCheckboxChange}
                            />
                            <span className="slider"></span>
                           
                          </label>

                            <div className="form-group" style={{marginLeft:'75px',marginTop:'-60px',height:'70px',width:'83%'}}>
                              
                                <label style={{width:'48%',float:'left'}}>
                                
                                  Date Raised
                                  <br/>
                                  <br/>
                                  <input  
                                  value={this.state.dateraised}
                                  onChange={this.ondateraisedChange}
                                  style={{height:'40px',float:'left'}} type="date"/>
                           
                                </label>

                                <label style={{width:'48%',float:'right'}}>
                                  Due Date
                                  <br/>
                                  <br/>
                                    <input 
                                    value={isChecked? this.state.duedate:this.state.duedate}
                                    onChange={this.onduedateChange}
                                    // disabled={this.state.isChecked}
                                    disabled={isChecked? true:false}
                                    style={{ 
                                      height: '40px', 
                                      float: 'right' , 
                                      backgroundColor:isChecked ? 'lightgray' : '#0080ff'
                                      }} 
                                    type="date" />
                                </label>

                                
                                </div>


                              <div className="form-group">
                                <label style={{width:'65%',float:'left'}}>
                                Responsible:
                                  <input
                                    type="text"
                                    name="responsible"
                                    className="form-control"
                                    value={this.state.isChecked}
                                    onChange={this.onresponsibleChange}
                                    required
                                    rows={2}
                                    style={{ resize: "none"}}
                                 />
                                </label>
                                <label style={{width:'32%',float:'right'}}>
                                Status:
                                <select
                                 
                                 onChange={this.onstatusChange}
                                 className="form-control"
                                 value={this.state.status}
                                 required
                             >
                                 <option value="" disabled>Filter by Status</option>
                                 <option value="In Progress" >In Progress</option>
                                 <option value="Pending" >Pending</option>
                                 <option value="On Hold" >On Hold</option>
                                 <option value="Comnpleted" >Completed</option>
                                 <option value="None" >None</option>
                             </select>
                                </label>
                                </div>
                                <label>
                                Remarks: 
                                <textarea
                                    type="text"
                                    name="remarks"
                                    className="form-control"
                                    value={this.state.remarks}
                                    onChange={this.onremarksChange}
                                    style={{ resize: "none" ,height: '100px'}}
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
                            this.state.type == "view" ?
                            <form onSubmit={this.handleSubmit}>
                              <h2>{this.state.actionste}</h2>
                              <p>
                                <b>Action:  </b>{this.state.action}

                              </p>
                              <p>
                                <b>Date Issued:  </b>{this.state.dateraised}
                              </p>
                              <p style={{width: '100%'}}>
                                <b>Responsible:  </b>{this.state.responsible}
                              </p>
                              <p style={{width: '100%'}}>
                                <b>Due Date:  </b>{this.state.duedate}
                              </p>
                              <p style={{width: '100%'}}>
                                <b>Status:  </b>{this.state.status}
                              </p>
                              <p style={{width: '100%'}}>
                                <b>Remarks:  </b>{this.state.remarks}
                              </p>
                              <button onClick={this.closeForm} className="btn btn-custom-gray" style={{maxWidth:'200px'}}>Close</button>
                            </form>
                                : null
                              }
                              {
                              this.state.type == "delete" ?
                              <form onSubmit={this.handleSubmit}>
                                <h2>Delete
                                  <br/><br/> "{this.state.actionste}"?</h2> <br/><br/>
                             
                                 
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
                            Action Item:
                                  <input
                                    type="text"
                                    name="action"
                                    className="form-control"
                                    value={this.state.action}
                                    onChange={this.onactionChange}
                                    required
                                  />
                                </label>
                                
                                <label>Pending</label>
                            <label className="switch">
                            <input type="checkbox" 
                            onChange={this.handleCheckboxChange}
                            />
                            <span className="slider"></span>
                           
                          </label>

                            <div className="form-group" style={{marginLeft:'75px',marginTop:'-60px',height:'70px',width:'83%'}}>
                              
                                <label style={{width:'48%',float:'left'}}>
                                
                                  Date Raised
                                  <br/>
                                  <br/>
                                  <input  
                                  value={this.state.dateraised}
                                  onChange={this.ondateraisedChange}
                                  style={{height:'40px',float:'left'}} 
                                  type="date"/>
                           
                                </label>

                                <label style={{width:'48%',float:'right'}}>
                                  Due Date
                                  <br/>
                                  <br/>
                                    <input 
                                    value={isChecked? this.state.duedate:null}
                                    onChange={this.onduedateChange}
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
                                <label style={{width:'65%',float:'left'}}>
                                Responsible:
                                  <input
                                    type="text"
                                    name="responsible"
                                    className="form-control"
                                    value={this.state.responsible}
                                    onChange={this.onresponsibleChange}
                                    required
                                    rows={2}
                                    style={{ resize: "none"}}
                                 />
                                </label>
                                <label style={{width:'32%',float:'right'}}>
                                Status:
                                <select
                                 
                                 onChange={this.onstatusChange}
                                 className="form-control"
                                 value={this.state.status}
                                 required
                             >
                                 <option value="" disabled>Filter by Status</option>
                                 <option value="In Progress" >In Progress</option>
                                 <option value="Pending" >Pending</option>
                                 <option value="On Hold" >On Hold</option>
                                 <option value="Comnpleted" >Completed</option>
                                 <option value="None" >None</option>
                             </select>
                                </label>
                                </div>
                                <label>
                                Remarks: 
                                <textarea
                                    type="text"
                                    name="remarks"
                                    className="form-control"
                                    value={this.state.remarks}
                                    onChange={this.onremarksChange}
                                    style={{ resize: "none" ,height: '100px'}}
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
                            
                  





                              
  
  
  
  
  
      
    </div>
  )}
        </div>
      );
    },
  });
  