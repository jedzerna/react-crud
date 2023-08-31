"use strict";

var PosIndexComponent = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      isLoggedIn: "",
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "", // Initial search query is empty
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
            <td style={{ width: "120px" }}>
              <a 
                href={"#PosShow?id=" + product.id}
              className="m-r-1em"
              style={{ margin: "5px" }}
              title="Read"
            >
              <img src="ico/view.ico" alt="Logo" style={{ width: '30px', height: '30px' }} />
            </a>
            
            <a
                href={"#PosEdit?id=" + product.id}
              className="m-r-1em"
              style={{ margin: "5px" }}
              title="Edit"
            >
              <img src="ico/edit.ico" alt="Logo" style={{ width: '30px', height: '30px' }} />
            </a>
            </td>
          ) : (
            // This is the one
            <td style={{ width: "120px" }}>
              
            <a 
                href={"#PosShow?id=" + product.id}
              className="m-r-1em"
              style={{ margin: "5px" }}
              title="Read"
            >
              <img src="ico/view.ico" alt="Logo" style={{ width: '30px', height: '30px' }} />
            </a>
            
            <a
                href={"#PosEdit?id=" + product.id}
              className="m-r-1em"
              style={{ margin: "5px" }}
              title="Edit"
            >
              <img src="ico/edit.ico" alt="Logo" style={{ width: '30px', height: '30px' }} />
            </a>
            <a
                href={"#PosDelete?id=" + product.id}
              className="m-r-1em"
              style={{ margin: "5px" }}
              title="Delete"
            >
              <img src="ico/delete.ico" alt="Logo" style={{ width: '30px', height: '30px' }} />
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
    $(".page-header h1").text("Welcome to Open Positions!");
    return (
      <div>
        <form>
		<p>This overview captures crucial elements for effective position management.
          </p>
          <div className="input-group col-md-5 margin-bottom-1em pull-left">
            <input
              type="text"
              className="form-control searchbox"
              placeholder="Search by Positions..."
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
            />
            <div
              className="input-group-btn"
              style={{ paddingRight: "10px" }}
            ></div>

            <a href="#PosCreate" className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>&nbsp; Create
              New
            </a>
          </div>
        </form>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th  style={{ width: "15%" }}>Position</th>
              <th  style={{ width: "7%" }}>Experience</th>
              <th style={{ width: "8%" }}>Position Count</th>
              <th style={{ width: "33%" }}>Skill Sets</th>
              <th style={{ width: "7%" }}>Budget</th>
              <th style={{ width: "20%" }}>Replacement/Aditional</th>
              <th style={{ width: "10%" }}>Actions</th>
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
