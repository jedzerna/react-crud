"use strict";

var RoadShowToolComponent = React.createClass({
  getInitialState: function () {
    return {
      id: 0,
      products: [],
      isLoggedIn: "",
      createdby: "",
      toolname: "",
      productids: 0,
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "", // Initial search query is empty
      selectedRows: [], // Array to store selected products
      selectAll: false, 
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
    var toolname = (this.props.toolname);
    this.serverRequest = $.post(
      "api/roadmap/read_one_tool.php",
      { prod_toolname: (toolname) },
      function (products) {
        if (this.isMounted()) {
            this.setState({products: JSON.parse(products) });
        }
      }.bind(this));

      this.serverRequestProd = $.post(
        "api/roadmap/read_one_road.php",
        { prod_toolname:  (toolname) },
        function (product) {
          var p = JSON.parse(product)[0];
          this.setState({ createdby: p.createdby });
          this.setState({ toolname: p.toolname });
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
                href={"#roadEditTool?id=" + product.id}
                className=" m-r-1em"
                style={{ margin: "5px" }}
                title="Edit"
              >
              <img src="ico/edit.ico" alt="Logo" style={{width:'30px',height:'30px'}}/>
              </a>
              <a
                href={"#roadDeleteTool?id=" + product.id}
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

  render: function () {
    $(".page-header h1").text(this.state.toolname);
    return (
      <div>
      <h3>Created by: {this.state.createdby}</h3>
        <br/>
        <form>
		
          <div className="input-group col-md-5 margin-bottom-1em pull-left">
            
          <a href="#roadIndex" className="btn btn-primary" style={{marginRight:'10px'}}>
              <span className="glyphicon glyphicon-chevron-left"></span>&nbsp; 
              Go Back
            </a>
       
            <a href={"#roadCreateTool?toolname=" + (this.props.toolname)} className="btn btn-primary" style={{marginRight:'10px'}}>
              <span className="glyphicon glyphicon-plus"></span>&nbsp; 
              Add New Data
            </a>
            
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
            <input 
              type="text"
              className="form-control searchbox"
              placeholder="Search by who develop..."
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
            />
            <div
              className="input-group-btn"
              style={{ paddingRight: "0px" }}
            ></div>

          </div>
        </form>
        <br/>
<h2 className="centered-container">Road Map List</h2>
          
        <table className="table table-bordered table-hover">
          <thead>
            <tr> 
              <th  style={{ width: "15%" }}>Quarter</th>
              <th  style={{ width: "50%" }}>Description</th>
              <th  style={{ width: "20%" }}>Develop By</th>
              <th  style={{ width: "6%" }}>Actions</th>
              {/* Add more table headers for other columns */}
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
        {this.renderPagination()}
      </div>
    );
  },
});
