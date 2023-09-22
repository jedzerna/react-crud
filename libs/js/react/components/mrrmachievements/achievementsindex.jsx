"use strict";

var AchievementsindexComponent = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      selectedProductIds: [],
      isLoggedIn: '',
      currentPage: 1,
      itemsPerPage: 6,
      searchQuery: '', // Initial search query is empty

      id: 0,
      team: '',
      date: '',
      year: '',
      achievements: '',
      challenges: '',
      ListHoriMonth:'',
      monthsSQL:[],
      searchDate:'',
      month:'',
      teameste: "",
      highestid:0,
      type:'',
      successUpdate: null,
      isHovered:false,

      searchMonth:'',
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
      "api/achievements/getAll.php",
      function (products) {
        if (this.isMounted()) {
          this.setState({
            products: JSON.parse(products),
          });
        }
      }.bind(this));


      this.populateProductsmonthsyears();

      $(".page-header").css('border-bottom','1px solid #eeeeee'); 
      $(".page-headertitle h2").text('Records');

  },
  populateProductsmonthsyears:function(){


  this.serverRequest = $.get('api/achievements/getMonthOnly.php', function(results) {
    this.setState({
        monthsSQL: JSON.parse(results)
    });
}.bind(this));
  },

  populateProductssecond: function () {
 
    this.serverRequest = $.get(
      "api/achievements/getAll.php",
      function (products) {
        if (this.isMounted()) {
          this.setState({
            products: JSON.parse(products),
          });
        }
      }.bind(this));

      this.setState({
        titleofrecords: ''
      });

      $(".page-header").css('border-bottom','1px solid #eeeeee'); 
      $(".page-headertitle h2").text('Records'); 
  },

  handleSearchChange: function (event) {
    const searchQuery = event.target.value;
    this.setState({
      searchQuery,
      currentPage: 1, // Reset current page when changing search query
    });
  },
  handleSearchChangeMonth: function (event) {
    const searchMonth = event.target.value;
    this.setState({
      searchMonth,
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
  },
  deleteSelected: function (e) {

    console.log(this.state.selectedProductIds);
    var r = confirm(
      "Are you sure you want to delete the selected product(s)?"
    );
    if (r == true) {
      $.post('api/achievements/getDelete.php',
        { del_ids: this.state.selectedProductIds },
        function (res) {
          if (res == "true") {
            this.setState({
              products: this.state.products.filter(
                (el) => this.state.selectedProductIds.indexOf(el.id) < 0
              ),
            });
            this.setState({ selectedProductIds: [] });
            this.populateProductsmonthsyears();

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
    const { products, currentPage, itemsPerPage, searchQuery} = this.state;
    const filteredProducts = products.filter((product) => {
      return product.team.toLowerCase().includes(searchQuery.toLowerCase());
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
          <td>{product.team}</td>
          <td>{product.achievements}</td>
          <td>{product.challenges}</td>
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
          <option value="6">6</option>
          <option value="15">15</option>
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
    var datename;
    if(id!= null){
      var productId = id;
      this.serverRequestProd = $.post(
        "api/achievements/readOne.php",
        { prod_id: productId },
        function (product) {
          var p = JSON.parse(product)[0];
          this.setState({
            team: p.team,
            id: p.id,
            date: p.date,
            achievements: p.achievements,
            teameste: p.team,
            challenges: p.challenges,
          });

     
      
         var dateParts = p.date.split(" ");
         var year = dateParts[0]; // "2023"
         var month = dateParts[1];  // "September"

        // Update the state with month and year
        this.setState({
          month: month,
          year: year,
        });
      }.bind(this)
      ); 
    }
    this.setState({ type: types });
    this.openForm();
  },
  handleSubmitUpdate:function (e) {

    console.log(this.state.date);
    const updatedData = {
      team: this.state.team,
      date: this.state.year + ' '+ this.state.month,
      achievements: this.state.achievements,
      challenges: this.state.challenges,
     // Add other properties you want to update
   };
   
     $.post(
      "api/achievements/getEdit.php",
      {
        id: this.state.id,
        team: this.state.team,
        month: this.state.month,
        year: this.state.year,
        achievements: this.state.achievements,
        challenges: this.state.challenges,
      },
       function (res) {
         this.setState({ successUpdate: res });
         if(this.state.titleofrecords != '' && this.state.titleofrecords === this.state.year + ' '+this.state.month){
          this.updateProductById(this.state.id,updatedData);
         }else{
          this.deleteProductById(this.state.id);
          this.populateProductsmonthsyears();
         }
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
   
       var productId = this.state.id;
       $.post('api/achievements/getDelete.php',
           {del_ids: [productId]},
           function(res) {
             this.deleteProductById(productId);
             this.populateProductsmonthsyears();
             this.closeForm();
           }.bind(this));
     
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
       this.setState({ team: '' });
       this.setState({ id: '' });
       this.setState({ date: '' });
       this.setState({ year: '' });
       this.setState({ month: '' });
       this.setState({ achievements: '' });
       this.setState({ teameste: '' });
       this.setState({ challenges: '' });
     },

     onteamChange: function (e) {
      this.setState({ team: e.target.value });
    },
  
    ondateChange: function (e) {
      this.setState({ date: e.target.value });
    },
    onyearChange: function (e) {
      this.setState({ year: e.target.value });
    },
  
    onachievementsChange: function (e) {
      this.setState({ achievements: e.target.value });
    },
  
    onchallengesChange: function (e) {
      this.setState({ challenges: e.target.value });
    },
    onMonthChange: function (e) {
      this.setState({ month: e.target.value });
    },
    onListHoriMonthChange: function (e) {
      this.setState({ ListHoriMonth: e.target.value });
    },
    onSave: function(e) {
      e.preventDefault();
    
      $.post('api/achievements/getCreate.php', {
        team: this.state.team,
        month: this.state.month,
        year: this.state.year,
        achievements: this.state.achievements,
        challenges: this.state.challenges,
      }, (res) => {
        this.setState({ successUpdate: res });
    
        if (res === 'true') {

          if(this.state.titleofrecords != '' && this.state.titleofrecords === this.state.year + ' '+this.state.month){

          // After successfully saving the data, retrieve the highest ID
          $.get('api/achievements/gethighestid.php', (products) => {
            this.setState({
              highestid: JSON.parse(products),
            });

            const productsWithNewProduct = [...this.state.products]; 
            productsWithNewProduct.unshift({
              id: this.state.highestid,
              team: this.state.team,
              date: this.state.year + ' '+this.state.month,
              achievements: this.state.achievements,
              challenges: this.state.challenges,
            });
            this.setState({
              products: productsWithNewProduct
            });
            // Clear the input fields
           
          this.setState({
            id: '',
            date: '',
            achievements: '',
            challenges: '',
          });
          });
            
          } 
          this.populateProductsmonthsyears();
        }
      });
    },


    handleClick:function(datename) {
      // alert(`Clicked on ${datename}`);
      this.setState({
        currentPage: 1
      });
      // var toolname = (this.props.toolname);

      this.serverRequestProd = $.post(
        "api/achievements/getFilterMonth.php",
        { prod_date:  (datename) },
        function (product) {
          this.setState({
            products: JSON.parse(product)
          });
      }.bind(this));
      this.setState({
        titleofrecords: datename
      });
      
      var dateParts = datename.split(" ");
      var year = dateParts[0]; // "2023"
      var month = dateParts[1];  // "September"

      this.setState({ selectedProductIds: [] });
      
      $(".page-headertitle h2").text('Month of '+ month +' '+year); 
      


    },
getRandomLightColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
},

  render: function () {
    // this.state.currentPage
   
      var monthOptions = this.state.monthsSQL.map(function(monthsin) {
        return (
            <option key={monthsin.date} value={monthsin.date}>{monthsin.date}</option>
        );
    });
      
  
    
    const { monthsSQL,searchMonth } = this.state;
   
    // Use CSS to style the container and list items for horizontal display
    const listStyle = {
      display: 'flex',       // Use flexbox to create a horizontal layout
      flexDirection: 'row', // Items are placed in a row
      listStyleType: 'none', // Remove default list styles
      padding: 0,            // Remove padding
      // border: '1px solid black',
      maxWidth: '100%',     // Set a maximum width for the container
      overflowX: 'auto', 
    };

    const itemStyle = {
      backgroundColor: 'dodgerblue',
      marginRight: '10px', 
      padding: '10px',
      border: '1px solid',
      borderRadius:'5px',
      color:'white',
      whiteSpace: 'nowrap', 
      font:'15px',
      fontWeight:'Bold',
      cursor: 'pointer',   
    };

    const filteredProducts = monthsSQL.filter((monthsSQLs) => {
      return monthsSQLs.date.toLowerCase().includes(searchMonth.toLowerCase());
    });

    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year <= currentYear + 8; year++) {
      years.push(year.toString());
    }



    $(".page-header h1").text("Technology Achievements & Challenges");
    return (
      <div>
            <form>
           
            <h4>Monthly Records</h4>
            <div className="input-group col-md-3 margin-bottom-1em">
            <span className="input-group-addon">
                <i className="glyphicon glyphicon-search"></i>
              </span>
              <input
              type="text"
              className="form-control searchbox"
              placeholder="Search by record..."
              value={this.state.searchMonth}
              onChange={this.handleSearchChangeMonth}
              />
              </div>
              {filteredProducts.length === 0 ? (
                              <div className="alert alert-danger">No Data Found</div>
                            ) : 
            <ul style={listStyle}>
              <li style={itemStyle} onClick={()=>this.populateProductssecond()}>View All</li>
            {filteredProducts.map((monthsSQLs) => (
              
              <li key={monthsSQLs.date}  style={itemStyle}
              onClick={() => this.handleClick(monthsSQLs.date)}
              >
              {monthsSQLs.date}
              </li>
            ))}
          </ul>
              }



<br/>
<div className="page-headertitle">
<h2 className="text-center"></h2>
</div>

<br/>
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
              onClick={(event) => this.handleItemClick(event, null,"create")} 
              className="btn btn-primary">
                  <span className="glyphicon glyphicon-plus"></span>&nbsp; Create
              Record
                </a>
          
          <button
              className="btn btn-danger margin-bottom-1em pull-right"
              onClick={this.deleteSelected}
              style={{ marginLeft: "60px" }}
            >
              <span className="glyphicon glyphicon-trash"></span>&nbsp; Delete
              Selection
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
              <th  style={{ width: "20%" }}>Team</th>
              <th style={{ width: "30%" }}>Achievements</th>
              <th style={{ width: "30%" }}>Challenges</th>
              <th className="achiactionsizestable">Actions</th>
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
                              <h2>Update: {this.state.teameste}</h2>
                              
                              <label>
                                Team:
                                  <input
                                    
                                    type="text"
                                    name="team"
                                    className="form-control"
                                    value={this.state.team}
                                    onChange={this.onteamChange}
                                    required
                                  />
                                </label>
                                
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Month:
                                <select
                                 
                                      onChange={this.onMonthChange}
                                      className="form-control"
                                      value={this.state.month}
                                      required
                                  >
                                      <option value="" disabled>Select Month</option>
                                      <option value="January" >January</option>
                                      <option value="February" >February</option>
                                      <option value="March" >March</option>
                                      <option value="April" >April</option>
                                      <option value="May" >May</option>
                                      <option value="June" >June</option>
                                      <option value="July" >July</option>
                                      <option value="August" >August</option>
                                      <option value="September" >September</option>
                                      <option value="October" >October</option>
                                      <option value="November" >November</option>
                                      <option value="December" >December</option>
                                  </select>
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                Year:
                                   <select
                                      id="yearSelect"
                                      name="year"
                                      className="form-control"
                                      value={this.state.year}
                                      onChange={this.onyearChange}
                                      required
                                    >
                                      <option value="">Select a year</option>
                                      {years.map((year) => (
                                        <option key={year} value={year}>
                                          {year}
                                        </option>
                                      ))}
                                    </select>
                                </label>
                                </div>
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Achievements:
                                  <textarea
                                    type="text"
                                    name="challenges"
                                    className="form-control"
                                    value={this.state.achievements}
                                    onChange={this.onachievementsChange}
                                    style={{ resize: "none" ,height: '120px'}}
                                  />
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                challenges:
                                  <textarea
                                    type="text"
                                    name="challenges"
                                    className="form-control"
                                    value={this.state.challenges}
                                    onChange={this.onchallengesChange}
                                    style={{ resize: "none" ,height: '120px'}}
                                  />
                                </label>
                                </div>
                               
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
                              <h2>{this.state.teameste}</h2>
                              <p style={{width: '350px'}}>
                                <b>Team:  </b>{this.state.team}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Date:  </b>{this.state.date}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Achievements:  </b>{this.state.achievements}
                              </p>
                              <p style={{width: '350px'}}>
                                <b>Challenges:  </b>{this.state.challenges}
                              </p>
                              <button onClick={this.closeForm} className="btn btn-custom-gray" style={{maxWidth:'200px'}}>Close</button>
                            </form>
                                : null
                            }
                            {
                            this.state.type == "delete" ?
                            <form onSubmit={this.handleSubmit}>
                              <h2>Delete
                                <br/><br/> "{this.state.teameste}"?</h2> <br/><br/>
                                
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
                                Team:
                                  <input
                                    
                                    type="text"
                                    name="team"
                                    className="form-control"
                                    value={this.state.team}
                                    onChange={this.onteamChange}
                                    required
                                  />
                                </label>
                                
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Month:
                                <select
                                 
                                      onChange={this.onMonthChange}
                                      className="form-control"
                                      value={this.state.month}
                                      required
                                  >
                                      <option value="" disabled>Select Month</option>
                                      <option value="January" >January</option>
                                      <option value="February" >February</option>
                                      <option value="March" >March</option>
                                      <option value="April" >April</option>
                                      <option value="May" >May</option>
                                      <option value="June" >June</option>
                                      <option value="July" >July</option>
                                      <option value="August" >August</option>
                                      <option value="September" >September</option>
                                      <option value="October" >October</option>
                                      <option value="November" >November</option>
                                      <option value="December" >December</option>
                                  </select>
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                Year:
                                   <select
                                      id="yearSelect"
                                      name="year"
                                      className="form-control"
                                      value={this.state.year}
                                      onChange={this.onyearChange}
                                      required
                                    >
                                      <option value="">Select a year</option>
                                      {years.map((year) => (
                                        <option key={year} value={year}>
                                          {year}
                                        </option>
                                      ))}
                                    </select>
                                </label>
                                </div>
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Achievements:
                                  <textarea
                                    type="text"
                                    name="challenges"
                                    className="form-control"
                                    value={this.state.achievements}
                                    onChange={this.onachievementsChange}
                                    style={{ resize: "none" ,height: '120px'}}
                                  />
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                challenges:
                                  <textarea
                                    type="text"
                                    name="challenges"
                                    className="form-control"
                                    value={this.state.challenges}
                                    onChange={this.onchallengesChange}
                                    style={{ resize: "none" ,height: '120px'}}
                                  />
                                </label>
                                </div>


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
