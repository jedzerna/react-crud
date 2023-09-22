"use strict";


var ProIndexComponent = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      isLoggedIn: "",
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "", // Initial search query is empty

      id: 0,
      SkillSets: "",
      SkillSetsste: "",
      SrEngineers: "",
      Intermediates: "",
      JrEngineers: "",
      SubTeam: "",
      Team: "",
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
      "api/projectsAPI/read_all_projects.php",
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
  handleItemClick: function (event, id, types) {
    event.preventDefault();
    // Update the component's state with the clicked ID
  
    if ( id !=''){

    var productId = id;
    this.serverRequestProd = $.post(
      "api/projectsAPI/read_one_projects.php",
      { prod_id: productId },
      function (product) {
        var p = JSON.parse(product)[0];
        this.setState({ id: p.id });
        this.setState({ SkillSets: p.SkillSets });
        this.setState({ SkillSetsste: p.SkillSets });
        this.setState({ SrEngineers: p.SrEngineers });
        this.setState({ Intermediates: p.Intermediates });
        this.setState({ JrEngineers: p.JrEngineers });
        this.setState({ SubTeam: p.SubTeam });
        this.setState({ Team: p.Team });
      }.bind(this)
    ); }
    this.setState({ type: types });
    this.openForm();
    // You can also add additional logic here to perform any desired actions
    
  },
  renderTableData: function () {
    const { products, currentPage, itemsPerPage, searchQuery } = this.state;
    const filteredProducts = products.filter((product) => {
      return product.SkillSets.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedProducts = filteredProducts.slice(startIndex, endIndex);

    return displayedProducts.map((product, index) => {
      return (
        <tr key={index}>
          <td>{product.SkillSets}</td>
          <td>{product.SrEngineers}</td>
          <td>{product.Intermediates}</td>
          <td>{product.JrEngineers}</td>
          <td>{product.SubTeam}</td>
          <td>{product.Team}</td>

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
  onSkillSetsChange: function(e) {
    this.setState({
      SkillSets: e.target.value
    });
},
onSrEngineersChange: function(e) {
  this.setState({
    SrEngineers: e.target.value
  });
},
onIntermediatesChange: function(e) {
  this.setState({
    Intermediates: e.target.value
  });
},
onJrEngineersChange: function(e) {
  this.setState({
    JrEngineers: e.target.value
  });
},
onSubTeamChange: function(e) {
  this.setState({
    SubTeam: e.target.value
  });
},
onTeamChange: function(e) {
  this.setState({
    Team: e.target.value
  });
},

handleSubmitUpdate:function (e) {

  const updatedData = {
   SkillSets: this.state.SkillSets,
   SrEngineers: this.state.SrEngineers,
   Intermediates: this.state.Intermediates,
   JrEngineers: this.state.JrEngineers,
   SubTeam: this.state.SubTeam,
   Team: this.state.Team,
   
   // Add other properties you want to update
 };
 $.post(
  "api/projectsAPI/update_projects.php",
  {
    id: this.state.id,
    SkillSets: this.state.SkillSets,
    SrEngineers: this.state.SrEngineers,
    Intermediates: this.state.Intermediates,
    JrEngineers: this.state.JrEngineers,
    SubTeam: this.state.SubTeam,
    Team: this.state.Team,
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

    $.post('api/projectsAPI/delete_projects.php',
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
  this.setState({ SkillSets: null });
  this.setState({ SrEngineers: null });
  this.setState({ Intermediates: null });
  this.setState({ JrEngineers: null });
  this.setState({ SubTeam: null });
  this.setState({ Team: null });
  this.setState({ SkillSetsste: null });
},
onSave: function(e) {
  e.preventDefault();

  $.post('api/projectsAPI/create_projects.php', {
    SkillSets: this.state.SkillSets,
    SrEngineers: this.state.SrEngineers,
    Intermediates: this.state.Intermediates,
    JrEngineers: this.state.JrEngineers,
    SubTeam: this.state.SubTeam,
    Team: this.state.Team,
  }, (res) => {
    this.setState({ successUpdate: res });

    if (res === 'true') {
      // After successfully saving the data, retrieve the highest ID
      $.get('api/projectsAPI/gethighestid.php', (products) => {
        this.setState({
          highestid: JSON.parse(products),
        });

        const productsWithNewProduct = [...this.state.products]; 
        productsWithNewProduct.unshift({
          id: this.state.highestid,
          SkillSets: this.state.SkillSets,
          SrEngineers: this.state.SrEngineers,
          Intermediates: this.state.Intermediates,
          JrEngineers: this.state.JrEngineers,
          SubTeam: this.state.SubTeam,
          Team: this.state.Team,
        });
        console.log(this.state.highestid);

        this.setState({
          products: productsWithNewProduct
        });
        console.log(productsWithNewProduct);

        // Clear the input fields
        this.setState({
          SkillSets: '',
          SrEngineers: '',
          Intermediates: '',
          JrEngineers: '',
          SubTeam: '',
          Team: '',
        });
      });
    }
  });
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
    
    $(".page-header h1").text("Welcome to Projects Page!");
    return (
      <div>
        <form>
		<p>The table presents an overview of skill sets, categorized into Senior Engineers,Intermediate-level professionals, </p>
            <p>and Junior Engineers, within distinct sub-teams and the overarching team, accompanied by an "Actions" column.</p>
    
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
           onClick={(event) => this.handleItemClick(event, '',"create")}
            className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>&nbsp;Create
              Project 
            </a>


        </form>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th  style={{ width: "5%" }}>Skill Sets</th>
              <th  style={{ width: "10%" }}>Sr. Engr.</th>
              <th style={{ width: "10%" }}>Intermediates</th>
              <th style={{ width: "10%" }}>Jr. Engr.</th>
              <th style={{ width: "12%" }}>Sub Team</th>
              <th style={{ width: "12%" }}>Team</th>
              <th className="proactionsizestable">Actions</th>
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
                              <h2>Update: {this.state.SkillSetsste}</h2>
                              <label>
                            SkillSets:
                                  <input
                                    type="text"
                                    name="SkillSets"
                                    className="form-control"
                                    value={this.state.SkillSets}
                                    onChange={this.onSkillSetsChange}
                                    required
                                  />
                                </label>
                                
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Sr Engineers:
                                <textarea
                                    type="text"
                                    name="SrEngineers"
                                    className="form-control"
                                    value={this.state.SrEngineers}
                                    onChange={this.onSrEngineersChange}
                                    required
                                    rows={2}
                                    style={{ resize: "none"}}
                                 ></textarea>
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                Intermediates:
                                  <textarea
                                    type="text"
                                    name="Intermediates"
                                    className="form-control"
                                    value={this.state.Intermediates}
                                    onChange={this.onIntermediatesChange}
                                    required
                                    rows={2}
                                    style={{ resize: "none"}}
                                 ></textarea>
                                </label>
                                </div>
                                
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Jr Engineers:
                                            <textarea
                                    type="text"
                                    name="JrEngineers"
                                    className="form-control"
                                    value={this.state.JrEngineers}
                                    onChange={this.onJrEngineersChange}
                                    required
                                    rows={2}
                                    style={{ resize: "none"}}
                                 ></textarea>
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                Sub Team:
                                <textarea
                                    type="text"
                                    name="SubTeam"
                                    className="form-control"
                                    value={this.state.SubTeam}
                                    onChange={this.onSubTeamChange}
                                    required
                                    rows={2}
                                    style={{ resize: "none"}}
                                 ></textarea>
                                </label>
                                </div>
                                <label>
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
                              <h2>{this.state.SkillSetsste}</h2>
                              <p>
                                <b>SkillSets:  </b>{this.state.SkillSets}

                              </p>
                              <p>
                                <b>Sr Engineers:  </b>{this.state.SrEngineers}
                              </p>
                              <p style={{width: '150px'}}>
                                <b>Intermediates:  </b>{this.state.Intermediates}
                              </p>
                              <p style={{width: '150px'}}>
                                <b>Jr Engineers:  </b>{this.state.JrEngineers}
                              </p>
                              <p style={{width: '150px'}}>
                                <b>Sub Team:  </b>{this.state.SubTeam}
                              </p>
                              <p style={{width: '150px'}}>
                                <b>Team:  </b>{this.state.Team}
                              </p>
                              <button onClick={this.closeForm} className="btn btn-custom-gray" style={{maxWidth:'200px'}}>Close</button>
                            </form>
                                : null
                              }
                              {
                              this.state.type == "delete" ?
                              <form onSubmit={this.handleSubmit}>
                                <h2>Delete
                                  <br/><br/> "{this.state.SkillSetsste}"?</h2> <br/><br/>
                             
                                 
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
                            SkillSets:
                                  <input
                                    type="text"
                                    name="SkillSets"
                                    className="form-control"
                                    value={this.state.SkillSets}
                                    onChange={this.onSkillSetsChange}
                                    required
                                  />
                                </label>
                                
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Sr Engineers:
                                <textarea
                                    type="text"
                                    name="SrEngineers"
                                    className="form-control"
                                    value={this.state.SrEngineers}
                                    onChange={this.onSrEngineersChange}
                                    required
                                    rows={2}
                                    style={{ resize: "none"}}
                                 ></textarea>
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                Intermediates:
                                  <textarea
                                    type="text"
                                    name="Intermediates"
                                    className="form-control"
                                    value={this.state.Intermediates}
                                    onChange={this.onIntermediatesChange}
                                    required
                                    rows={2}
                                    style={{ resize: "none"}}
                                 ></textarea>
                                </label>
                                </div>
                                
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Jr Engineers:
                                            <textarea
                                    type="text"
                                    name="JrEngineers"
                                    className="form-control"
                                    value={this.state.JrEngineers}
                                    onChange={this.onJrEngineersChange}
                                    required
                                    rows={2}
                                    style={{ resize: "none"}}
                                 ></textarea>
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                Sub Team:
                                <textarea
                                    type="text"
                                    name="SubTeam"
                                    className="form-control"
                                    value={this.state.SubTeam}
                                    onChange={this.onSubTeamChange}
                                    required
                                    rows={2}
                                    style={{ resize: "none"}}
                                 ></textarea>
                                </label>
                                </div>
                                <label>
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
  