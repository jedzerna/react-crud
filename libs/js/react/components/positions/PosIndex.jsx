"use strict";

var PosIndexComponent = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      isLoggedIn: "",
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "", // Initial search query is empty

      id: 0,
      Position: "",
      Positionste: "",
      Experience: "",
      PositionCount: "",
      SkillSets: "",
      Budget: "",
      ReplacementAditional: "",
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
      "api/positionAPI/read_all_position.php",
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
  handleItemClick: function (event, id,types) {
    event.preventDefault();
    // Update the component's state with the clicked ID
   if ( id !=''){
 
    var productId = id;
    this.serverRequestProd = $.post(
      "api/positionAPI/read_one_position.php",
      { prod_id: productId },
      function (product) {
        var p = JSON.parse(product)[0];
        
        this.setState({ id: p.id });
        this.setState({ Position: p.Position });
        this.setState({ Positionste: p.Position });
        this.setState({ Experience: p.Experience });
        this.setState({ PositionCount: p.PositionCount });
        this.setState({ SkillSets: p.SkillSets });
        this.setState({ Budget	: p.Budget	 });
        this.setState({ ReplacementAditional	: p.ReplacementAditional	 });
      }.bind(this)
    );}
    this.setState({ type: types });
    this.openForm();
    // You can also add additional logic here to perform any desired actions
  },
  renderTableData: function () {
    const { products, currentPage, itemsPerPage, searchQuery } = this.state;
    const filteredProducts = products.filter((product) => {
      return product.Position.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedProducts = filteredProducts.slice(startIndex, endIndex);

    return displayedProducts.map((product, index) => {
      return (
        <tr key={index}>
          <td>{product.Position}</td>
          <td>{product.Experience}</td>
          <td>{product.PositionCount}</td>
          <td>{product.SkillSets}</td>
          <td>{product.Budget}</td>
          <td>{product.ReplacementAditional}</td>
          
          {this.state.isLoggedIn == "false" ? (
            <td className="actiontablecenter">

              </td>

          ):(
            // This is the one
            <td className="actiontablecenter">

            <a 
                // href={"#PosShow?id=" + product.id}
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
onPositionChange: function(e) {
    this.setState({
      Position: e.target.value
    });
},
onExperienceChange: function(e) {
  this.setState({
    Experience: e.target.value
  });
},
onPositionCountChange: function(e) {
  this.setState({
    PositionCount: e.target.value
  });
},
onSkillSetsChange: function(e) {
  this.setState({
    SkillSets: e.target.value
  });
},
onBudgetChange: function(e) {
  this.setState({
    Budget: e.target.value
  });
},
onReplacementAditionalChange: function(e) {
  this.setState({
    ReplacementAditional: e.target.value
  });
},
handleSubmitUpdate:function (e) {

  const updatedData = {
    Position: this.state.Position,
    Experience: this.state.Experience,
    PositionCount: this.state.PositionCount,
    SkillSets: this.state.SkillSets,
    Budget: this.state.Budget,
    ReplacementAditional: this.state.ReplacementAditional,
   
   // Add other properties you want to update
 };
  $.post(
    "api/positionAPI/update_position.php",
    {
      id: this.state.id,
      Position: this.state.Position,
      Experience: this.state.Experience,
      PositionCount: this.state.PositionCount,
      SkillSets: this.state.SkillSets,
      Budget: this.state.Budget,
      ReplacementAditional: this.state.ReplacementAditional,
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

    $.post('api/positionAPI/delete_position.php',
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
    this.setState({ Position: null });
    this.setState({ Experience: null });
    this.setState({ PositionCount: null });
    this.setState({ SkillSets: null });
    this.setState({ Budget: null });
    this.setState({ Positionste: null });
    this.setState({ ReplacementAditional: null });
  },
  onSave: function(e) {
    e.preventDefault();
  
    $.post('api/positionAPI/create_position.php', {
      Position: this.state.Position,
      Experience: this.state.Experience,
      PositionCount: this.state.PositionCount,
      SkillSets: this.state.SkillSets,
      Budget: this.state.Budget,
      ReplacementAditional: this.state.ReplacementAditional,
    }, (res) => {
      this.setState({ successUpdate: res });
  
      if (res === 'true') {
        // After successfully saving the data, retrieve the highest ID
        $.get('api/positionAPI/gethighestid.php', (products) => {
          this.setState({
            highestid: JSON.parse(products),
          });

          const productsWithNewProduct = [...this.state.products]; 
          productsWithNewProduct.unshift({
            id: this.state.highestid,
            Position: this.state.Position,
            Experience: this.state.Experience,
            PositionCount: this.state.PositionCount,
            SkillSets: this.state.SkillSets,
            Budget: this.state.Budget,
            ReplacementAditional: this.state.ReplacementAditional,
          });
          console.log(this.state.highestid);

          this.setState({
            products: productsWithNewProduct
          });
          console.log(productsWithNewProduct);
  
          // Clear the input fields
          this.setState({
            Position: '',
            Experience: '',
            PositionCount: '',
            SkillSets: '',
            Budget: '',
            ReplacementAditional: '',
          });
        });
      }
    });
  },
  render: function () {
    $(".page-header h1").text("Welcome to Open Positions!");
    return (
      <div>
        <form>
		<p>This overview captures crucial elements for effective position management.
          </p>



          <div className="input-group col-md-3 margin-bottom-1em pull-left">
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-search"></i>
          </span>
          <input
              type="text"
              className="form-control searchbox"
              placeholder="Search by Positions..."
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
          />
        </div>
           <a style={{marginLeft:'5px'}} 
             onClick={(event) => this.handleItemClick(event, '',"create")}className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>&nbsp; Create New Position
            </a>

        </form>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th  style={{ width: "15%" }}>Position</th>
              <th  style={{ width: "7%" }}>Experience</th>
              <th style={{ width: "11%" }}>Position Count</th>
              <th style={{ width: "30%" }}>Skill Sets</th>
              <th style={{ width: "7%" }}>Budget</th>
              <th style={{ width: "18%" }}>Replacement Aditional</th>
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
                              <h2>Update: {this.state.Positionste}</h2>
                              <label>
                            Position:
                                  <input
                                    type="text"
                                    name="Position"
                                    className="form-control"
                                    value={this.state.Position}
                                    onChange={this.onPositionChange}
                                    required
                                  />
                                </label>
                                
                              <div className="form-group">
                                <label style={{width:'58%',float:'left'}}>
                                Experience:
                                  <input
                                    type="text"
                                    name="Experience"
                                    className="form-control"
                                    value={this.state.Experience}
                                    onChange={this.onExperienceChange}
                                    required
                                  />
                                </label>
                                <label style={{width:'38%',float:'right'}}>
                                Position Count:
                                  <input
                                    type="text"
                                    name="PositionCount"
                                    className="form-control"
                                    value={this.state.PositionCount}
                                    onChange={this.onPositionCountChange}
                                    required
                                  />
                                </label>
                                </div>
                              <div className="form-group">
                                <label style={{width:'58%',float:'left'}}>
                                Replacement Aditional:
                                            <input
                                    
                                    type="text"
                                    name="ReplacementAditional"
                                    className="form-control"
                                    value={this.state.ReplacementAditional}
                                    onChange={this.onReplacementAditionalChange}
                                    required
                                 />
                                </label>
                                <label style={{width:'38%',float:'right'}}>
                                Budget:
                                <input
                                    type="text"
                                    name="Budget"
                                    className="form-control"
                                    value={this.state.Budget}
                                    onChange={this.onBudgetChange}
                                  //style={{ resize: "none" ,height: '120px'}}
                                    required
                                  />
                                </label>
                                </div>
                                <label>
                                SkillSets:
                                            <textarea

                                    type="text"
                                    name="SkillSets"
                                    className="form-control"
                                    value={this.state.SkillSets}
                                    onChange={this.onSkillSetsChange}
                                    style={{ resize: "none" ,height: '120px'}}
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
                              <h2>{this.state.Positionste}</h2>
                              <p>
                                <b>Position:  </b>{this.state.Position}
                              </p>
                              <p>
                                <b>Experience:  </b>{this.state.Experience}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>PositionCount:  </b>{this.state.PositionCount}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>SkillSets:  </b>{this.state.SkillSets}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Budget:  </b>{this.state.Budget}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>ReplacementAditional:  </b>{this.state.ReplacementAditional}
                              </p>
                              <button onClick={this.closeForm} className="btn btn-custom-gray">Close</button>
                            </form>
                                : null
                            }
                            {
                            this.state.type == "delete" ?
                            <form onSubmit={this.handleSubmit}>
                              <h2>Delete
                                <br/><br/> "{this.state.Positionste}"?</h2> <br/><br/>
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
                            Position:
                                  <input
                                    type="text"
                                    name="Position"
                                    className="form-control"
                                    value={this.state.Position}
                                    onChange={this.onPositionChange}
                                    required
                                  />
                                </label>
                                
                              <div className="form-group">
                                <label style={{width:'58%',float:'left'}}>
                                Experience:
                                  <input
                                    type="text"
                                    name="Experience"
                                    className="form-control"
                                    value={this.state.Experience}
                                    onChange={this.onExperienceChange}
                                    required
                                  />
                                </label>
                                <label style={{width:'38%',float:'right'}}>
                                Position Count:
                                  <input
                                    type="text"
                                    name="PositionCount"
                                    className="form-control"
                                    value={this.state.PositionCount}
                                    onChange={this.onPositionCountChange}
                                    required
                                  />
                                </label>
                                </div>
                              <div className="form-group">
                                <label style={{width:'58%',float:'left'}}>
                                Replacement Aditional:
                                            <input
                                    
                                    type="text"
                                    name="ReplacementAditional"
                                    className="form-control"
                                    value={this.state.ReplacementAditional}
                                    onChange={this.onReplacementAditionalChange}
                                    required
                                 />
                                </label>
                                <label style={{width:'38%',float:'right'}}>
                                Budget:
                                <input
                                    type="text"
                                    name="Budget"
                                    className="form-control"
                                    value={this.state.Budget}
                                    onChange={this.onBudgetChange}
                                  //style={{ resize: "none" ,height: '120px'}}
                                    required
                                  />
                                </label>
                                </div>
                                <label>
                                SkillSets:
                                            <textarea

                                    type="text"
                                    name="SkillSets"
                                    className="form-control"
                                    value={this.state.SkillSets}
                                    onChange={this.onSkillSetsChange}
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
