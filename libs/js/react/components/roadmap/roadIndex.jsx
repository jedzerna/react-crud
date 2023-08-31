"use strict";

var RoadIndexComponent = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      isLoggedIn: "",
      currentPage: 1,
      itemsPerPage: 5,
      rowData: [],  
      toolData: {
        categories: [],
        tools: []
      },
      searchQuery: "" // Initial search query is empty
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

    this.serverRequest = $.get("api/roadmap/read_road_hori.php", function (data) {
        if (this.isMounted()) {
          const parsedData = JSON.parse(data);
          this.setState({
            toolData: parsedData,
          });
        }
        
        console.log(JSON.parse(data));
      }.bind(this));
  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
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
          <td>{product.toolname}</td>
          <td>{product.createdby}</td>
          {this.state.isLoggedIn == "false" ? (
            <td style={{ width: "120px" }}>
              <a
                href={"#ProShow?id=" + product.id}
                className="btn btn-info m-r-2em"
                style={{ width: "100px", margin: "5px" }}
              >
                Read
              </a>
              <br />
              <a
                href={"#roadShowTool?id=" + product.id}
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
                href={"#ProShow?id=" + product.id}
                className="btn btn-info m-r-1em"
                style={{ width: "100px", margin: "5px" }}
              >
                Read
              </a>
              <br />
              <a
                href={"#roadShowTool?id=" + product.id}
                className="btn btn-primary m-r-1em"
                style={{ width: "100px", margin: "5px" }}
              >
                Edit
              </a>
              <br />
              <a
                href={"#roadDelete?id=" + product.id}
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
  handleSearchChange: function (event) {
    const searchQuery = event.target.value;
    this.setState({
      searchQuery,
      currentPage: 1, // Reset current page when changing search query
    });
  },
    render() {
      const { toolData, searchQuery } = this.state;
      const tools = Object.keys(toolData);

      // Collect all unique categories
      const uniqueCategoriesSet = new Set();
      tools.forEach(tool => {
        Object.keys(toolData[tool]).forEach(category => {
          uniqueCategoriesSet.add(category);
        });
      });
      const uniqueCategories = Array.from(uniqueCategoriesSet);

      $(".page-header h1").text("Welcome to Road Map!");

      // Filter tools based on the search query
      const filteredTools = tools.filter(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <br/>
        <form>
        <div className="input-group col-md-3 margin-bottom-1em pull-left">
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-search"></i>
          </span>
          <input
            type="text"
            className="form-control searchbox"
            placeholder="Search by tool name..."
            value={searchQuery}
            onChange={this.handleSearchChange}
          />
        </div>
           <a style={{marginLeft:'5px'}} href="#roadCreate" className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>&nbsp; Create
              New Tools/Project
            </a>
        </form>
      <br/>

      {filteredTools.length === 0 ? (
        <div>
          <p>No tools found.</p>
          {/* You can add a link to create new tools here */}
        </div>
      ) : (
        
      <div className="table-responsive" style={{ overflowX: 'auto', width: '100%' }}>
  <table className="table table-bordered table-hover" style={{ minWidth: '300px' }}>
    <thead>
      <tr>
        <th style={{ width: '100px' ,minWidth:'100px' , maxWidth:'100px' }}>Actions</th>
        <th style={{ width: '200px' ,minWidth:'200px', maxWidth:'200px'}}><b>Products/Tools</b></th>
        {uniqueCategories.map((category, index) => (
          <th key={index} style={{ width: '390px',minWidth:'390px' }}>{category}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {filteredTools.map((tool, toolIndex) => (
        <tr key={toolIndex}>
          <td>
            <a href={`#roadShowTool?toolname=${encodeURIComponent(tool)}`}
              className="m-r-1em"
              style={{ margin: "5px" }}
              title="Show More"
            >
              <img src="ico/view.ico" alt="Logo" style={{ width: '30px', height: '30px' }} />
            </a>
            <a
              href={`#roadDelete?toolname=${encodeURIComponent(tool)}`}
              className="m-r-1em"
              style={{ margin: "5px" }}
              title="Delete this Project Tool"
            >
              <img src="ico/delete.ico" alt="Logo" style={{ width: '30px', height: '30px' }} />
            </a>
          </td>
          <td><b>{tool}</b></td>
          {uniqueCategories.map((category, categoryIndex) => (
            <td key={categoryIndex}>
              {toolData[tool][category] || ''}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
    </table>
        </div>
      )}
    </div>
  );
}
});

//   render() {
//     const { toolData } = this.state;
//     const tools = toolData.tools;
//     const categories = toolData.categories;
  
//     return (
//       <div>
//         <table>
//           <thead>
//             <tr>
//               <th>Tools</th>
//               {categories.map((category, index) => (
//                 <th key={index}>{category}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {tools.map((tool, toolIndex) => (
//               <tr key={toolIndex}>
//                 <td>{tool.toolsname}</td>
//                 {categories.map((category, categoryIndex) => (
//                   <td key={categoryIndex}>
//                     {tool[category] || ''}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// });








  // populateProducts: function () {
  //   this.serverRequest = $.get(
  //     "api/roadmap/read_all_road.php",
  //     function (products) {
  //       if (this.isMounted()) {
  //         this.setState({
  //           products: JSON.parse(products),
  //         });
  //       }
  //     }.bind(this)
  //   );
  // },

  // handleSearchChange: function (event) {
  //   const searchQuery = event.target.value;
  //   this.setState({
  //     searchQuery,
  //     currentPage: 1, // Reset current page when changing search query
  //   });
  // },

  // renderTableData: function () {
  //   const { products, currentPage, itemsPerPage, searchQuery } = this.state;
  //   const filteredProducts = products.filter((product) => {
  //     return product.toolname.toLowerCase().includes(searchQuery.toLowerCase());
  //   });

  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;

  //   const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  //   return displayedProducts.map((product, index) => {
  //     return (


        
  //       <tr key={index}>
  //         <td>{product.toolname}</td>
  //         <td>{product.createdby}</td>
  //         {this.state.isLoggedIn == "false" ? (
  //           <td style={{ width: "120px" }}>
  //             <a
  //               href={"#ProShow?id=" + product.id}
  //               className="btn btn-info m-r-2em"
  //               style={{ width: "100px", margin: "5px" }}
  //             >
  //               Read
  //             </a>
  //             <br />
  //             <a
  //               href={"#roadShowTool?id=" + product.id}
  //               className="btn btn-primary m-r-1em"
  //               style={{ width: "100px", margin: "5px" }}
  //             >
  //               Edit
  //             </a>
  //           </td>
  //         ) : (
  //           // This is the one
  //           <td style={{ width: "120px" }}>
  //             <a
  //               href={"#ProShow?id=" + product.id}
  //               className="btn btn-info m-r-1em"
  //               style={{ width: "100px", margin: "5px" }}
  //             >
  //               Read
  //             </a>
  //             <br />
  //             <a
  //               href={"#roadShowTool?id=" + product.id}
  //               className="btn btn-primary m-r-1em"
  //               style={{ width: "100px", margin: "5px" }}
  //             >
  //               Edit
  //             </a>
  //             <br />
  //             <a
  //               href={"#roadDelete?id=" + product.id}
  //               className="btn btn-danger"
  //               style={{ width: "100px", margin: "5px" }}
  //             >
  //               Delete
  //             </a>
  //           </td>
            
  //         )}
  //       </tr>
  //     );
  //   });
  // },

  // renderPagination: function () {
  //   const { products, currentPage, itemsPerPage } = this.state;
  //   const totalPages = Math.ceil(products.length / itemsPerPage);
  //   const pageNumbers = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pageNumbers.push(
  //       <li
  //         key={i}
  //         className={currentPage === i ? 'active' : ''}
  //         onClick={() => this.handlePageClick(i)}
  //       >
  //         {i}
  //       </li>
  //     );
  //   }

  //   return (
  //     <div className="my-pagination-container">
  //     <button
  //       onClick={this.handleFirstPage}
  //       disabled={currentPage === 1}
  //     >
  //       First Page
  //     </button>
  //     <button
  //       onClick={this.handlePreviousPage}
  //       disabled={currentPage === 1}
  //     >
  //       Previous Page
  //     </button>
  //     <ul className="my-pagination">
  //       {pageNumbers}
  //     </ul>
  //     <button
  //       onClick={this.handleNextPage}
  //       disabled={currentPage === totalPages}
  //     >
  //       Next Page
  //     </button>
  //     <button
  //       onClick={this.handleLastPage}
  //       disabled={currentPage === totalPages}
  //     >
  //       Last Page
  //     </button>
  //     <div className="items-per-page">
  //       Items per Page:
  //       <select
  //         value={this.state.itemsPerPage}
  //         onChange={this.handleItemsPerPageChange}
  //       >
  //         <option value="5">5</option>
  //         <option value="10">10</option>
  //         <option value="25">25</option>
  //       </select>
  //     </div>
  //   </div>
  //   );
  // },

  // handlePageClick: function (pageNumber) {
  //   this.setState({
  //     currentPage: pageNumber
  //   });
  // },

  // handlePreviousPage: function () {
  //   const { currentPage } = this.state;
  //   const prevPage = Math.max(currentPage - 1, 1);

  //   this.setState({
  //     currentPage: prevPage,
  //   });
  // },

  // handleNextPage: function () {
  //   const { currentPage, products, itemsPerPage } = this.state;
  //   const totalPages = Math.ceil(products.length / itemsPerPage);
  //   const nextPage = Math.min(currentPage + 1, totalPages);

  //   this.setState({
  //     currentPage: nextPage,
  //   });
  // },

  // handleItemsPerPageChange: function (event) {
  //   this.setState({
  //     itemsPerPage: parseInt(event.target.value, 10),
  //     currentPage: 1, // Reset current page when changing items per page
  //   });
  // },

  // render: function () {
  //   $(".page-header h1").text("Welcome to Road Map!");
  //   return (
  //     <div>
  //       <form>
	// 	<p>The table presents an overview of skill sets, categorized into Senior Engineers,Intermediate-level professionals, </p>
  //           <p>and Junior Engineers, within distinct sub-teams and the overarching team, accompanied by an "Actions" column.</p>
    
  //         <div className="input-group col-md-5 margin-bottom-1em pull-left">
  //           <input
  //             type="text"
  //             className="form-control searchbox"
  //             placeholder="Search by team..."
  //             value={this.state.searchQuery}
  //             onChange={this.handleSearchChange}
  //           />
  //           <div
  //             className="input-group-btn"
  //             style={{ paddingRight: "10px" }}
  //           ></div>

  //           <a href="#roadCreate" className="btn btn-primary">
  //             <span className="glyphicon glyphicon-plus"></span>&nbsp; Create
  //             Project
  //           </a>
  //         </div>
  //       </form>

  //       <table className="table table-bordered table-hover">
  //         <thead>
  //           <tr>
  //             <th  style={{ width: "50%" }}>Tool Name</th>
  //             <th  style={{ width: "35%" }}>Created By</th>
  //             <th  style={{ width: "5%" }}>Actions</th>
  //             {/* Add more table headers for other columns */}
  //           </tr>
  //         </thead>
  //         <tbody>{this.renderTableData()}</tbody>
  //       </table>
  //       {this.renderPagination()}
  //     </div>
  //   );
  // },});

