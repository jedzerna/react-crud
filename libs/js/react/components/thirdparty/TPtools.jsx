"use strict";

var TPtoolsComponent = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      isLoggedIn: "",
      currentPage: 1,
      itemsPerPage: 5,
      searchQuery: "", // Initial search query is empty
    };
  },

  componentDidMount: function () {
    this.serverRequest = $.get(
      "api/is_logged_in.php",
      function (result) {
        this.setState({
          isLoggedIn: result,
        });
      }.bind(this)
    );
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
      return product.Team.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedProducts = filteredProducts.slice(startIndex, endIndex);

    return displayedProducts.map((product, index) => {
      return (
        <tr key={index}>
          <td>{product.id}</td>
          <td>{product.Team}</td>
          <td>{product.Purpose}</td>
          <td>{product.SoftwareName}</td>
          <td>{product.Details}</td>
          <td>{product.License}</td>
          <td>{product.site}</td>
          {this.state.isLoggedIn == "false" ? (
            <td style={{ width: "120px" }}>
              <a
                href={"#show?id=" + product.id}
                className="btn btn-info m-r-2em"
                style={{ width: "100px", margin: "5px" }}
              >
                Read
              </a>
              <br />
              <a
                href={"#TPedit?id=" + product.id}
                className="btn btn-primary m-r-1em"
                style={{ width: "100px", margin: "5px" }}
              >
                Edit
              </a>
            </td>
          ) : (
            // This is the one
            <td style={{ width: "120px" }}>
              <a
                href={"#TPshow?id=" + product.id}
                className="btn btn-info m-r-1em"
                style={{ width: "100px", margin: "5px" }}
              >
                Read
              </a>
              <br />
              <a
                href={"#TPedit?id=" + product.id}
                className="btn btn-primary m-r-1em"
                style={{ width: "100px", margin: "5px" }}
              >
                Edit
              </a>
              <br />
              <a
                href={"#TPdelete?id=" + product.id}
                className="btn btn-danger"
                style={{ width: "100px", margin: "5px" }}
              >
                Delete
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

    return (
      <div className="pagination-container" style={{ width: "100%" }}>
        <button
          className="btn btn-primary"
          style={{ margin: "10px" }}
          onClick={this.handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          className="btn btn-primary"
          style={{ margin: "10px" }}
          onClick={this.handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
        <div
          className="input-group col-md-3 pull-right"
          style={{ margin: "10px" }}
        >
          <select
            className="form-control"
            value={this.state.itemsPerPage}
            onChange={this.handleItemsPerPageChange}
            title="Items per page"
          >
            <option value="5">Show 5 Products per page</option>
            <option value="10">Show 10 Products per page</option>
            <option value="25">Show 25 Products per page</option>
          </select>
        </div>
      </div>
    );
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
    $(".page-header h1").text("Third Party Tools");
    return (
      <div>
        <form>
          <div className="input-group col-md-5 margin-bottom-1em pull-left">
            <input
              type="text"
              className="form-control searchbox"
              placeholder="Search by team..."
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
            />
            <div
              className="input-group-btn"
              style={{ paddingRight: "10px" }}
            ></div>

            <a href="#TPcreate" className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>&nbsp; Create
              Product
            </a>
          </div>
        </form>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>S.NO.</th>
              <th>Team</th>
              <th>Purpose</th>
              <th>Software Name</th>
              <th>Details</th>
              <th>License</th>
              <th>site</th>
              <th>Actions</th>
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
