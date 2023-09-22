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
      searchQuery: "",
      searchQuarter: "",

      id:0,
      toolname:"",
      createdby:"",
      quarter:"",
      description:"",
      developby:"",

      categories: [],
      highestid:0,
      type:'',
      successUpdate: null,
      user: '',
      toolIndexs:0,


      toolnamedistinct: [],
      toolnameeachproducts: [],

      selectedTool:'',
      selectedQuarter:'',
      selectedDescription:'',

      resultMessage: null,
      idw:0,
      toolnamew:'',
      status:'',
      selectedItem: 0,
      isChecked: false,
      startdate:'',
      enddate:'',
      userstory:'',

      constantid: 0,
      constanttoolname:'',
      constantcategory:'',
      constantdescription:'',
      
      isOpen: false,

      weeklyTable: [],
      isExpanded: false,

      getrecentdatestatus: false,
      toolnameq: '',
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

  this.populate();

      this.serverRequest = $.get('api/get_current_user.php', function(result) {
        if(result != '') {
            var u = JSON.parse(result)[0];
            this.setState({
                user: u
            });
        }
    }.bind(this));
      
      this.serverRequest = $.get('api/roadmap/read_all_roadcategories.php', function(results) {
        this.setState({
            categories: JSON.parse(results)
        });
    }.bind(this));
    this.populateDistinctToolName();
    
    $(".page-header").css('border-bottom','1px solid #eeeeee'); 
    
  },
  populateDistinctToolName: function(){

    this.serverRequest = $.get('api/roadmap/readToolNameDistinct.php', function(results) {
      this.setState({
        toolnamedistinct: JSON.parse(results)
      });
  }.bind(this));

  },


  populate: function(){
    
    this.serverRequest = $.get("api/roadmap/read_road_hori.php", function (data) {
      if (this.isMounted()) {
        const parsedData = JSON.parse(data);
        this.setState({
          toolData: parsedData,
        });
      }
      
    }.bind(this));
  },
  toggleDatePicker: function() {
    this.setState({ isOpen: !this.state.isOpen });
  },

  renderTableData: function () {
    const { weeklyTable, currentPage, itemsPerPage, searchQuery } = this.state;
    const filteredProducts = weeklyTable.filter((product) => {
      return product.description.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedProducts = filteredProducts.slice(startIndex, endIndex);

    return displayedProducts.map((product, index) => {
      return (
        <tr key={index}>
        <td>{product.userstory}</td>
        <td>{product.status}</td>
        <td>{product.startdate}</td>
        <td>{product.enddate}</td>
          <td>{product.description}</td>
        <td>{product.developby}</td>
        <td>{product.createdby}</td>
          
          {this.state.isLoggedIn == "false" ? (
            <td className="actiontablecenter">

              </td>

          ):(
            // This is the one
            <td className="actiontablecenter">
            
            <a
                onClick={(event) => this.handleItemClick(event, product.id,"createweekly",'',product.toolname,product.quarterid)}
                className="aactionfontcustom"
              title="Edit"
            >
              <img src="ico/edit.ico" alt="Logo" className="imgcustom"/>
            </a>
            <a
                onClick={(event) => this.handleItemClick(event, product.id,"deleteweekly",'','','',product.userstory,product.id,product.createdby)}
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



  componentWillUnmount: function () {
    this.serverRequest.abort();
  },
  handleSearchChange: function (event) {
    const searchQuery = event.target.value;
    this.setState({
      searchQuery,
      currentPage: 1, // Reset current page when changing search query
    });
  },

  ontoolnameChange: function(e) {
    this.setState({
        toolname: e.target.value
    });
  },

  oncreatedbyChange: function(e) {
      this.setState({
          createdby: e.target.value
      });
  },

  onquarterChange: function(e) {
      this.setState({
          quarter: e.target.value
      });
  },

  ondescriptionChange: function(e) {
      this.setState({
          description: e.target.value
      });
  },

  ondevelopbyChange: function(e) {
      this.setState({
          developby: e.target.value
      });
  },

  ontoolnamedescritionChange: function(e) {
      this.setState({
          developby: e.target.value
      });
  },
  handleCheckboxChange: function() {
    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
    }));
  },
  
  ontoolnamedistinctChange: function(e) {
    const toolname = e.target.value;
    this.setState({
      toolnamew: toolname,
    });
  
    // // Call the tool description function
    this.fetchToolDescription(toolname);
  },


  onstatusChange: function(e) {
    this.setState({
        status: e.target.value
    });
},
  
  onstartdateChange: function(e) {
    this.setState({
        startdate: e.target.value
    });
},

onuserstoryChange: function(e) {
  this.setState({
    userstory: e.target.value
  });
},
onenddateChange: function(e) {
  this.setState({
      enddate: e.target.value
  });
},

  fetchToolDescription: function (toolname) {
    this.serverRequest = $.post(
      "api/roadmap/read_one_tool.php",
      { prod_toolname: toolname },
      (products) => {
        if (this.isMounted()) {
          this.setState({ toolnameeachproducts: JSON.parse(products) });
        }
      }
    );
    this.setState({toolnameq : toolname});
    // this.getrecentdate(toolname,'');
    this.getrecentdate();
  },
  handleItemClickSelected(toolnameSQLs) {
    // Update the selected item in the state
    this.setState({ selectedItem: toolnameSQLs });
    this.getrecentdate(this.state.toolnameq,toolnameSQLs);
  },
  onselecteditemChange:function(e){
    this.setState({
      selectedItem: e.target.value
  });
  // console.log(e.target.value);
  },

  getrecentdate: function(toolname,selected){
    
    if(this.state.getrecentdatestatus == true){
      if(toolname != undefined && selected != undefined){

        console.log(toolname);
        console.log(selected);
         this.serverRequestProd = $.post(
          "api/roadmap/gettherecentdate.php",
          { prod_toolname:  (toolname),prod_quarterid: (selected) },
            function (product) {
            
                var parsedProduct = JSON.parse(product);
                if (Array.isArray(parsedProduct) && parsedProduct.length > 0) {
                  var p = parsedProduct[0];
                  if (p.enddate !== undefined) {
                    this.setState({ startdate: p.enddate });
                    console.log(p.enddate);
                  } else {
                    this.setState({ startdate: "" });
                    console.log("enddate property not found in product");
                  }
                } else {
                  this.setState({ startdate: "" });
                  console.log("Empty or invalid product data");
                }
            }.bind(this));
      }
      
    }

  },


  handleItemClick: function (event, toolname,types,toolIndex,toolnameforupdate,selectedid,userstory,weeklyid,createdbyweekly) {
    event.preventDefault();
    this.setState({ toolIndexs: toolIndex });
    var toolnames = toolname;
    if(toolname!= null && types != 'createweekly' && userstory == ""){


      this.serverRequestProd = $.post(
          "api/roadmap/read_one_road.php",
          { prod_toolname:  (toolnames) },
            function (product) {
              var p = JSON.parse(product)[0];
              this.setState({ createdby: p.createdby });
              this.setState({ toolname: p.toolname });
            }.bind(this));

            
            this.serverRequest = $.post(
              "api/roadmap/read_one_tool.php",
              { prod_toolname: (toolnames) },
              function (products) {
                if (this.isMounted()) {
                    this.setState({products: JSON.parse(products) });
                }
              }.bind(this));
    }
    if(types == 'createweekly' && toolname == null){
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(currentDate.getDate()).padStart(2, '0');
    
      const formattedDate = `${year}-${month}-${day}`;
      console.log(formattedDate);
      this.setState({ startdate: formattedDate });
      this.setState({ getrecentdatestatus: true });
    }
    if(types == 'createweekly' && toolname != null){

      this.setState({ getrecentdatestatus: false });
      var toolnameforrecent = '';
      this.handleItemClickSelected(selectedid)
      this.serverRequestProd = $.post(
        "api/roadmap/read_oneweeklystatus.php",
        { prod_id:  (toolnames) },
          function (product) {
            var p = JSON.parse(product)[0];
            this.setState({ id: p.id });
            this.setState({ toolnamew: p.toolname });
            toolnameforrecent = p.toolname;
            
          console.log(p.toolname);
            this.setState({ status: p.status });
            this.setState({ startdate: p.startdate });
            if(p.enddate == null){
              this.setState({ isChecked: true });
            }else{
              this.setState({ enddate: p.enddate });
              this.setState({ isChecked: false });
            }
            this.setState({ userstory: p.userstory });
            this.setState({ developby: p.developby });
            this.setState({ description: p.description });
            this.setState({ constantid: p.quarterid });

          }.bind(this));

          this.fetchToolDescription(toolnameforupdate);
    }
    if(types == 'deleteweekly'){

      this.setState({ userstory: userstory });
      this.setState({ id: weeklyid });
      this.setState({ createdby: createdbyweekly });
    }
    this.setState({ toolname: toolnames });
    this.setState({ type: types });
    this.openForm();
    
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
      this.setState({ toolname: '' });
      this.setState({ id: 0 });
      this.setState({ quarter: '' });
      this.setState({ createdby: '' });
      this.setState({ developby: '' });
      this.setState({ description: '' });
      this.setState({ products: null });
      this.setState({ isExpanded: false });
      this.setState({ selectedItem: 0 });
      this.setState({ toolnamew: '' });
      this.setState({ status : '' });
      this.setState({ startdate : '' });
      this.setState({ enddate : '' });
      this.setState({ userstory : '' });
      
      this.setState({ selectedTool : '' });
      this.setState({ selectedQuarter : '' });
      this.setState({ selectedDescription : '' });
      
      this.setState({ resultMessage : null });
      this.setState({ toolnameeachproducts: [] });
      this.setState({ constantid: 0 });
      this.setState({ constanttoolname:'' });
      this.setState({ constantcategory:'' });
      this.setState({ constantdescription:''});
      this.setState({ getrecentdatestatus: false });
      
    },

    
    backForm: function () {
      this.setState({ toolname: '' });
      this.setState({ id: 0 });
      this.setState({ quarter: '' });
      this.setState({ createdby: '' });
      this.setState({ developby: '' });
      this.setState({ description: '' });
      this.setState({ products: null });
      this.setState({ isExpanded: false });
      this.setState({ selectedItem: 0 });
      
      this.setState({ status : '' });
      this.setState({ startdate : '' });
      this.setState({ enddate : '' });
      this.setState({ userstory : '' });
      
      this.setState({ selectedTool : '' });
      this.setState({ selectedQuarter : '' });
      this.setState({ selectedDescription : '' });
      
      this.setState({ resultMessage : null });
      this.setState({ toolnameeachproducts: [] });
      this.setState({ constantid: 0 });
      this.setState({ constanttoolname:'' });
      this.setState({ constantcategory:'' });
      this.setState({ constantdescription:''});
      
    },

    onSave: function(e) {
      $.post('api/roadmap/create_road.php', {
          toolname: this.state.toolname,
          createdby: this.state.user.email,
          quarter: this.state.quarter,
          description: this.state.description,
          developby: this.state.developby
          },
          function(res) {
              this.setState({successUpdate: res});
              if(res == 'true') {

                const existingTitle = this.state.toolname;
                const existingcat = this.state.quarter;
                const newData = {
                  [existingcat]: this.state.description,
                };
                this.setState(prevState => ({
                  toolData: {
                    [existingTitle]: newData, // Add the new data
                    ...prevState.toolData, // Preserve existing data by spreading it
                  },
                }));

                  this.setState({toolname: ''});
                  this.setState({quarter: ''});
                  this.setState({description: ''});
                  this.setState({developby: ''});
              }
          }.bind(this));
      e.preventDefault();
  },

  onsaveWeekly:function(e) {
    e.preventDefault();

    var sEnddate = null;
    if(this.state.isChecked == true){
      sEnddate = null;
    }else{
      if(this.state.enddate == '' || this.state.enddate == null || this.state.enddate == '0000-00-00'){
       this.setState({ resultMessage: 'Please enter an End Date' });
       return;
      }else{
        sEnddate = this.state.enddate;
      }
    }

  if(this.state.id != 0){

      console.log('updated');
      $.post(
        "api/roadmap/update_weeklystatus.php",
        {
          id: this.state.id,
          toolname: this.state.toolnamew,
          quarterid: this.state.selectedItem,
          status: this.state.status,
          startdate: this.state.startdate,
          enddate: sEnddate,
          userstory: this.state.userstory,
          developby: this.state.developby,
          description: this.state.description,
        },
        function (res) {
          this.setState({ resultMessage: res });
        }.bind(this)
      );

  }else{
    console.log('saved');
    $.post('api/roadmap/create_weekly.php', {
      toolname: this.state.toolnamew,
      quarterid: this.state.selectedItem,
      status: this.state.status,
      startdate: this.state.startdate,
      enddate: sEnddate,
      userstory: this.state.userstory,
      developby: this.state.developby,
      description: this.state.description,
      createdby: this.state.user.email,
    }, (res) => {
      this.setState({ resultMessage: res });
  
      if (res === 'true') {
     
  
          this.setState({
            action: '',
            // dateraised: '',
            // responsible: '',
            duedate: '',
            status: '',
            remarks: '',
            enddate: '',
            userstory: '',
            developby: '',
            description: '',
            isChecked: false,
          });
  
      }
    });
    if (sEnddate === '' || sEnddate === null || typeof sEnddate === 'undefined') {
      this.setState({ isChecked: true });  
    }else{
      this.setState({ isChecked: false });  
    }
  }
  },

  handleSubmitDelete:function(e){
    var r = confirm(
      "Are you sure you want to delete this record?"
    );
    if (r == true) {
      var del_ids = this.state.products.map(product => product.id);
      $.post(
        'api/roadmap/delete_road.php',
        { del_ids: del_ids },
        function (res) {
          if (res == "true") {
            this.populate();
            // this.deleteProductById(this.state.toolname,this.state.toolIndexs);
            this.closeForm();
          } else {
            alert("Unable to delete product(s).");
          }
        }.bind(this)
      );
    }
  },


handleSubmitDeleteWeekly:function(e){
  console.log(this.state.id);

    var del_ids = this.state.id;
    $.post(
      'api/roadmap/delete_weeklystatus.php',
      { del_id: del_ids },
      function (res) {
        if (res == "true") {
          
          this.handleCategoryClick(this.state.selectedTool,this.state.selectedQuarter,selectedDescription,'','');
        } else {
          alert("Unable to delete product(s).");
        }
      }.bind(this)
    );
  
},




handleCategoryClick: function (toolname,category,description, rowindexes, colindexes) {
this.backForm();
            this.serverRequestProd = $.post(
                "api/roadmap/read_weeklyperquater.php",
                { prod_toolname:  (toolname) ,prod_quarter:  (category)},
                function (product) {
                  this.setState({
                    weeklyTable: JSON.parse(product)
                  });
                }.bind(this));

                this.setState({ selectedTool: toolname });
                this.setState({ selectedQuarter: category });
                this.setState({ selectedDescription: description });
                this.setState({ type: 'viewweekly' });
                this.openForm();
},
onclickshow:function(tool){
  window.location = `#roadShowTool?toolname=${encodeURIComponent(tool)}`;
},
toggleExpansion() {
  this.setState(prevState => ({
    isExpanded: !prevState.isExpanded,
  }));
},
onclicktoolname:function(){
  // alert(`Clicked on Tool Name ID: ${this.state.toolnamew}`);
},
    render() {
      var categoriesOptions = this.state.categories.map(function(category) {
        return (
            <option key={category.categoryname} value={category.categoryname}>{category.categoryname}</option>
        );
    });

    
    var toolnameOptions = this.state.toolnamedistinct.map(function(toolnames) {
      return (
          <option key={toolnames.toolname} value={toolnames.toolname}>{toolnames.toolname}</option>
      );
  });


  const { toolnameeachproducts,searchQuarter } = this.state;
   
  // Use CSS to style the container and list items for horizontal display
  const listStyle = {
    display: 'flex',       // Use flexbox to create a horizontal layout
    flexDirection: 'row', // Items are placed in a row
    listStyleType: 'none', // Remove default list styles
    padding: 0,            // Remove padding
    // border: '1px solid black',
    maxWidth: '100%',     // Set a maximum width for the container
    overflowX: 'auto', 
    maxHeight:'200px',
  };

  const itemStyle = {
    backgroundColor: 'gray',
    marginRight: '10px',
    padding: '10px',
    border: '1px solid',
    borderRadius: '5px',
    color: 'white',
    whiteSpace: 'wrap', // Use 'wrap' instead of 'nowrap'
    fontSize: '15px', // Use 'fontSize' instead of 'font'
     // Use 'bold' instead of 'Bold'
    cursor: 'pointer',
    minWidth: '200px',
    maxWidth: '400px',
    width: '300px', // Set a fixed width if needed
    maxHeight: '200px', // Set a maximum height
    overflowY: 'auto', // Make the content scrollable if it exceeds the maximum height
  };

  const selectedStyle = {
    ...itemStyle, // Copy all properties from itemStyle
    backgroundColor: 'dodgerblue', // Change the background color for selected items
    color: 'white',
  };

  const filteredProducts = toolnameeachproducts.filter((toolnameSQLs) => {
    return toolnameSQLs.quarter.toLowerCase().includes(searchQuarter.toLowerCase());
  });



  const { isChecked } = this.state;

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

      uniqueCategories.sort((a, b) => a.localeCompare(b));

      // Filter tools based on the search query
      const filteredTools = tools.filter(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()));

      
      const { selectedDescription } = this.state;
      const { isExpanded } = this.state;
      // const truncatedText = isExpanded ? selectedDescription : selectedDescription.slice(0, 100); // Adjust the character limit as needed
      // if (typeof selectedDescription !== 'string') {
      //   return null; // Return nothing if the text is not a string
      // }
      if (typeof selectedDescription !== 'string') {
        return null; // Return nothing if the text is not a string
      }
  
      const maxCharacters = 100; // Adjust the character limit as needed
      const truncatedText = isExpanded
      ? selectedDescription
      : selectedDescription.length > maxCharacters
      ? selectedDescription.substring(0, maxCharacters) + '...' // Add three dots
      : selectedDescription;


      const showButton = selectedDescription.length > maxCharacters;
  
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
           <a style={{marginLeft:'5px'}} 
            onClick={(event) => this.handleItemClick(event, null,"create")} 
           className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>&nbsp; <b>Create
              New Tools/Project</b>
            </a>
         <a style={{marginLeft:'5px'}} 
            onClick={(event) => this.handleItemClick(event, null,"createweekly")} 
           className="btn btn-info">
              <span className="glyphicon glyphicon-plus"></span>&nbsp;  <b>Add Weekly Report</b>
            </a>
            
          <a style={{marginLeft:'5px'}} 

           className="btn btn-info">
              <span className="glyphicon glyphicon-save"></span>&nbsp;  <b>Generate Report (Coming Soon)</b>
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
              // href={`#roadDelete?toolname=${encodeURIComponent(tool)}`}
              
              onClick={(event) => this.handleItemClick(event, encodeURIComponent(tool),"delete",toolIndex)}
              className="m-r-1em"
              style={{ margin: "5px" }}
              title="Delete this Project Tool"
            >
              <img src="ico/delete.ico" alt="Logo" style={{ width: '30px', height: '30px' }} />
            </a>
          </td>
          <td
            onClick={() => this.onclickshow(tool)}
            style={{ cursor: 'pointer' }} 
          ><b>{tool}</b></td>
          {uniqueCategories.map((category, categoryIndex) => (
            <td key={categoryIndex}
            onClick={() => this.handleCategoryClick(tool,category,toolData[tool][category] || '',toolIndex,categoryIndex)}
            style={{ cursor: 'pointer' }} 
            >
              {toolData[tool][category] || ''}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
    </table>

    {this.state.isFormOpen && (
<div className={`form-popup ${this.state.isFormOpen ? "open" : "close"} ${this.state.type === 'viewweekly' ? "viewweeklyform" : ""}`}>



                            {this.state.successUpdate == "true" ? (
                              <div className="alert alert-success" style={{marginBottom:'-15px'}}>Data was saved.</div>
                            ) : null}
                            {this.state.successUpdate != "true" &&
                            this.state.successUpdate != null ? (
                              <div className="alert alert-danger">{this.state.successUpdate}</div>
                            ) : null}
                            
                            {
                            this.state.type == "delete" ?
                            <form onSubmit={this.handleSubmit}>
                              <h2>Delete
                                <br/><br/> "{this.state.toolname}"?</h2>
                                <h4>Created by: {this.state.createdby}</h4>
                                <br/> <br/>
                                
                             
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
                                Tool Name:
                                  <input
                                    type="text"
                                    name="toolname"
                                    className="form-control"
                                    value={this.state.toolname}
                                    onChange={this.ontoolnameChange}
                                    required
                                  />
                                </label>
                                
                              <div className="form-group">
                                <label style={{width:'48%',float:'left'}}>
                                Created By:
                                  <input
                                    type="text"
                                    name="createdby"
                                    className="form-control"
                                    value={this.state.user.email}
                                    onChange={this.oncreatedbyChange}
                                    disabled
                                    
                                  />
                                </label>
                                <label style={{width:'48%',float:'right'}}>
                                Category:
                                   <select
                                    onChange={this.onquarterChange}
                                    className="form-control"
                                    value={this.state.quarter}
                                >
                                    <option value="" disabled>Please Select Quarter</option>
                                    {categoriesOptions}
                                </select>
                                </label>
                                </div>
                                <label>
                                Develop By:
                                  <input
                                    type="text"
                                    name="developby"
                                    className="form-control"
                                    value={this.state.developby}
                                    onChange={this.ondevelopbyChange}
                                    required
                                  />
                                </label>
                                <label>
                                Description:
                                            <textarea
                                    type="text"
                                    name="description"
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={this.ondescriptionChange}
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
                            
                            {this.state.type == "createweekly" ?
                            <form onSubmit={this.handleSubmit}>
                              
                              {this.state.id != 0 ? 
                          <div className="form-group" style={{display:'flex'}} >
                                <label style={{float:'left'}}>
                                <a className="btn btn-primary" style={{width:'40px',borderRadius:'13px',marginLeft:'-3px',marginRight:'10px'}}
                                onClick={() => this.handleCategoryClick(this.state.selectedTool,this.state.selectedQuarter,selectedDescription,'','')}
                                >
                                <span className="glyphicon glyphicon-chevron-left"></span>&nbsp;
                              </a>
                              </label>
                              <label style={{width:'60%',float:'right'}}>
                            <h2 style={{marginTop:'1px'}}>Weekly Report</h2>
                              </label>
                           </div>
                              : <h2>Weekly Report</h2>
                          }

                            <div className="form-group">
                                <label style={{width:'67%',float:'left'}}>
                              Tool Name:
                                 <select
                                  onChange={this.ontoolnamedistinctChange}
                                  className="form-control"
                                  value={this.state.toolnamew}
                                  
                              >
                                  <option value="" disabled>Select Toolname</option>
                                  {toolnameOptions}
                              </select>
                              </label>
                              <label style={{width:'30%',float:'right'}}>
                              Status:
                                 <select
                                  onChange={this.onstatusChange}
                                  className="form-control"
                                  value={this.state.status}
                              >
                                  <option value="" disabled>Select Status</option>
                                  <option value="Pending" >Pending</option>
                                  <option value="Hold" >Hold</option>
                                  <option value="Completed" >Completed</option>
                              </select>
                              </label>
                                </div>


                              
                             
                              {filteredProducts.length === 0 ? (<div></div>) : <div>
                              <label>Please Select Which Quarter you wanna add</label>
                                </div>}
                              {filteredProducts.length === 0 ? (
                              <div className="alert alert-success">Please Select a Tool Name</div>
                                ) : 
                              <ul style={listStyle}>
                                    {filteredProducts.map((toolnameSQLs) => (
                                      <li key={toolnameSQLs.description}  
                                      
                                      style={
                                        toolnameSQLs.id == this.state.selectedItem ? selectedStyle : itemStyle
                                      }
                                      onClick={() => this.handleItemClickSelected(toolnameSQLs.id)}
                                      onChange={this.onselecteditemChange}
                                      >

                                      <b>{toolnameSQLs.quarter}:</b> <br/> <br/>
                                      {toolnameSQLs.description}
                                      </li>
                                    ))}
                              </ul>
                            }
                            <label>Pending</label>
                            <label className="switch">
                            <input type="checkbox" 
                            onChange={this.handleCheckboxChange}
                            checked = {isChecked? true:false}
                            />
                            <span className="slider"></span>
                           
                          </label>

                            <div className="form-group" style={{marginLeft:'75px',marginTop:'-60px',height:'70px',width:'83%'}}>
                              
                                <label style={{width:'48%',float:'left'}}>
                                
                                  Start Date
                                  <br/>
                                  <br/>
                                  <input 
                                  value={this.state.startdate}
                                  onChange={this.onstartdateChange}
                                  style={{height:'40px',float:'left'}} type="date"/>
                           
                                </label>

                                <label style={{width:'48%',float:'right'}}>
                                  End Date
                                  <br/>
                                  <br/>
                                    <input 
                                    value={isChecked? this.state.enddate :this.state.enddate}
                                    onChange={this.onenddateChange}
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
                                <label style={{width:'55%',float:'left'}}>
                                User Story:
                                  <input
                                    type="text"
                                    name="story"
                                    className="form-control"
                                    value={this.state.userstory}
                                    onChange={this.onuserstoryChange}
                                    required
                                  />
                                </label>

                                
                                <label style={{width:'42%',float:'right'}}>
                              Develop By:
                              <input
                                    type="text"
                                    name="story"
                                    className="form-control"
                                    value={this.state.developby}
                                    onChange={this.ondevelopbyChange}
                                    required
                                  />
                              </label>
                                </div>
                                
                              <label>
                              Description:
                                          <textarea
                                  type="text"
                                  name="description"
                                  className="form-control"
                                  value={this.state.description}
                                  onChange={this.ondescriptionChange}
                                  style={{ resize: "none" ,height: '70px'}}
                                  required
                                />
                              </label>
                              {this.state.resultMessage == "true" ? (
                              <div className="alert alert-success" >Data was saved.</div>
                            ) : null}
                            {this.state.resultMessage != "true" &&
                            this.state.resultMessage != null ? (
                              <div className="alert alert-danger">{this.state.resultMessage}</div>
                            ) : null}
                          <div className="form-group" style={{display:'flex',justifyContent:'center'}}>
                          <button onClick={this.onsaveWeekly} className="btn btn-primary" style={{width:'48%',float:'left',margin:'3px'}}>Save</button>
                          <button onClick={this.closeForm} className="btn btn-custom-gray" style={{width:'48%',float:'right',margin:'3px'}}>Close</button>
                          </div>
                          </form>
                              : null
                          }
                             {
                            this.state.type == "viewweekly" ?
                            <form onSubmit={this.handleSubmit}>
                              <h2>{this.state.selectedTool}</h2>
                                 <h4>{this.state.selectedQuarter}</h4>

                              <div>
                              <p>{truncatedText}
                              {showButton && (
                                <a onClick={this.toggleExpansion}>
                                  {isExpanded ? "Show Less" : "Read More"}
                                </a>
                              )}
                              </p>
                            
                            </div>
                              {this.state.weeklyTable <= 0 ? (
                                <div className="alert alert-danger text-center">No Records Found</div>
                              ) : 
                              
                              <table className="table table-bordered table-hover" style={{width:'100%'}}>
                                  <thead>
                                    <tr>
                                      <th style={{ width: "10%" }}>User Story</th>
                                      <th style={{ width: "10%" }}>Status</th>
                                      <th style={{ width: "10%" }}>Start Date</th>
                                      <th style={{ width: "10%" }}>End Date</th>
                                      <th style={{ width: "30%" }}>Description</th>
                                      <th style={{ width: "10%" }}>Develop By</th>
                                      <th style={{ width: "10%" }}>Added By</th>
                                      <th className="posactionsizestable">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>{this.renderTableData()}</tbody>
                                </table>
                              
                              
                              }

                            <div className="form-group" style={{display:'flex',justifyContent:'center'}}>
                            
                              <button onClick={(event) => this.handleItemClick(event, null,"createweekly")}  className="btn btn-success" style={{width:'48%',float:'left',margin:'3px'}}>Add New</button>
                              <button onClick={this.closeForm} className="btn btn-custom-gray" style={{width:'48%',float:'right',margin:'3px'}}>Close</button>
                              </div>
                            </form>
                                : null
                            }
                            {
                            this.state.type == "deleteweekly" ?
                            <form onSubmit={this.handleSubmit}>
                                     {this.state.id != 0 ? 
                          <div className="form-group" style={{display:'flex'}} >
                                <label style={{float:'left'}}>
                                <a className="btn btn-primary" style={{width:'40px',borderRadius:'13px',marginLeft:'-3px',marginRight:'10px'}}
                                onClick={() => this.handleCategoryClick(this.state.selectedTool,this.state.selectedQuarter,selectedDescription,'','')}
                                >
                                <span className="glyphicon glyphicon-chevron-left"></span>&nbsp;
                              </a>
                              </label>
                              <label style={{width:'60%',float:'right'}}>
                            <h2 style={{marginTop:'1px'}}>Deleting</h2>
                              </label>
                           </div>
                            : <h2>Weekly Report</h2>}


                              
                                <h2>"{this.state.userstory}"?</h2>
                                <h4>Created by: {this.state.createdby}</h4>
                                <br/> <br/>
                                
                             
                            <div className="form-group" style={{display:'flex',justifyContent:'center'}}>
                              <button onClick={this.handleSubmitDeleteWeekly} className="btn btn-danger" style={{width:'48%',float:'left',margin:'3px'}}>Delete</button>
                              <button onClick={this.closeForm} className="btn btn-custom-gray" style={{width:'48%',float:'right',margin:'3px'}}>Close</button>
                              </div>
                            </form>
                                : null
                            }
        </div>
      )}
        </div>
      )}
    </div>
  );
}
});



