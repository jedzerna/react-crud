"use strict";

var NotFoundComponent = React.createClass({
  render: function () {
    return (
      <div>
        <div className="alert alert-danger">
          <div className="text-center">
            <h1 class="panel-title">404</h1>
            <div className="panel-body">
              <div className="">Page not Found</div>
            </div>
          </div>
        </div>
        <a class="btn btn-primary" href="#MtIndex">
          Back to Home Page
        </a>
      </div>
    );
  },
});

var MainApp = React.createClass({
  getInitialState: function () {
    return {
      currentMode: "MtIndex",
      productId: null,
      refid: null,
      toolname: null,
    };
  },

  changeAppMode: function (newMode, productId,toolname,refid) {
    this.setState({
      currentMode: newMode,
    });

    if (productId !== undefined) {
      this.setState({
        productId: productId,
      });
    } if (toolname !== undefined) {
      this.setState({
        toolname: encodeURIComponent(toolname),
      });
    }if (refid !== undefined) {
      this.setState({
        refid: refid,
      });
    }
  },

  render: function () {
    var defaultItemPerPage = 10;
    var defaultSearchText = "";
    var defaultCurrentPage = 1;
    var defaultOrderBy = "department";
    var defaultOrderType = "asc";

    var currentMode = this.props.location[0] || "MtIndex";

    currentMode = currentMode.startsWith("update")
      ? currentMode.split("?")[0]
      : currentMode;
    currentMode = currentMode.startsWith("create")
      ? currentMode.split("?")[0]
      : currentMode;
    currentMode = currentMode.startsWith("page")
      ? currentMode.split("=")[0]
      : currentMode;
    currentMode = currentMode.startsWith("search")
      ? currentMode.split("=")[0]
      : currentMode;
    currentMode = currentMode.startsWith("show")
      ? currentMode.split("?")[0]
      : currentMode;
    currentMode = currentMode.startsWith("delete")
      ? currentMode.split("?")[0]
      : currentMode;
    currentMode = currentMode.startsWith("login")
      ? currentMode.split("?")[0]
      : currentMode;
    currentMode = currentMode.startsWith("home")
      ? currentMode.split("?")[0]
      : currentMode;
    currentMode = currentMode.startsWith("register")
      ? currentMode.split("?")[0]
      : currentMode;

    currentMode = currentMode.startsWith("TPdelete")
      ? currentMode.split("?")[0]
      : currentMode;
    currentMode = currentMode.startsWith("TPedit")
      ? currentMode.split("?")[0]
      : currentMode;
    currentMode = currentMode.startsWith("TPshow")
      ? currentMode.split("?")[0]
      : currentMode;
      currentMode = currentMode.startsWith("ProCreate")
        ? currentMode.split("?")[0]
        : currentMode;
        currentMode = currentMode.startsWith("ProDelete")
          ? currentMode.split("?")[0]
          : currentMode;
          currentMode = currentMode.startsWith("ProEdit")
            ? currentMode.split("?")[0]
            : currentMode;
            currentMode = currentMode.startsWith("ProIndex")
              ? currentMode.split("?")[0]
              : currentMode;
              currentMode = currentMode.startsWith("ProShow")
                ? currentMode.split("?")[0]
                : currentMode;


                
      currentMode = currentMode.startsWith("PosCreate")
      ? currentMode.split("?")[0]
      : currentMode;
      currentMode = currentMode.startsWith("PosDelete")
        ? currentMode.split("?")[0]
        : currentMode;
        currentMode = currentMode.startsWith("PosEdit")
          ? currentMode.split("?")[0]
          : currentMode;
          currentMode = currentMode.startsWith("PosIndex")
            ? currentMode.split("?")[0]
            : currentMode;
            currentMode = currentMode.startsWith("PosShow")
              ? currentMode.split("?")[0]
              : currentMode;



              currentMode = currentMode.startsWith("EmpCreate")
              ? currentMode.split("?")[0]
              : currentMode;
              currentMode = currentMode.startsWith("EmpDelete")
              ? currentMode.split("?")[0]
              : currentMode;
        
              currentMode = currentMode.startsWith("EmpIndex")
              ? currentMode.split("?")[0]
              : currentMode;
              currentMode = currentMode.startsWith("EmpShow")
              ? currentMode.split("?")[0]
              : currentMode;
        
              currentMode = currentMode.startsWith("EmpEdit")
              ? currentMode.split("?")[0]
              : currentMode;


              currentMode = currentMode.startsWith("roadIndex")
              ? currentMode.split("?")[0]
              : currentMode;
              currentMode = currentMode.startsWith("roadCreate")
              ? currentMode.split("?")[0]
              : currentMode;
              currentMode = currentMode.startsWith("roadDelete")
              ? currentMode.split("?")[0]
              : currentMode;
                
              currentMode = currentMode.startsWith("roadIndex")
              ? currentMode.split("?")[0]
              : currentMode;

              currentMode = currentMode.startsWith("roadShow")
              ? currentMode.split("?")[0]
              : currentMode;
                
              currentMode = currentMode.startsWith("roadEdit")
              ? currentMode.split("?")[0]
              : currentMode;

              currentMode = currentMode.startsWith("roadShowTool")
              ? currentMode.split("?")[0]
              : currentMode;

              currentMode = currentMode.startsWith("roadCreateTool")
              ? currentMode.split("?")[0]
              : currentMode;
              currentMode = currentMode.startsWith("MtIndex")
              ? currentMode.split("?")[0]
              : currentMode;
              currentMode = currentMode.startsWith("master")
              ? currentMode.split("?")[0]
              : currentMode;
              currentMode = currentMode.startsWith("achievementsindex")
              ? currentMode.split("?")[0]
              : currentMode;

              
              currentMode = currentMode.startsWith("GanttIndex")
              ? currentMode.split("?")[0]
              : currentMode;
              
              currentMode = currentMode.startsWith("ForecastIndex")
              ? currentMode.split("?")[0]
              : currentMode;
              currentMode = currentMode.startsWith("ForecastShow")
              ? currentMode.split("?")[0]
              : currentMode;
              currentMode = currentMode.startsWith("HandleIndex")
              ? currentMode.split("?")[0]
              : currentMode;

              
              currentMode = currentMode.startsWith("techPIndex")
              ? currentMode.split("?")[0]
              : currentMode;

    var productId = 0;
    var toolname = "";
    var searchedTerm = "";
    var sortColumn = "department";
    var sortType = "asc";
    var search = "";
    var order_by = "department";
    var order_type = "asc";
    var item_per_page = defaultItemPerPage;
    var itemPerPage = defaultItemPerPage;
    var initialPage = defaultCurrentPage;

    // Query string filter
    var pageParameterName = "page";
    var searchParameterName = "search";
    var orderByParameterName = "order_by";
    var orderTypeParameterName = "order_type";
    var itemPerPageParameterName = "item_per_page";

    search = getParameterByName(searchParameterName);
    order_by = getParameterByName(orderByParameterName);
    order_type = getParameterByName(orderTypeParameterName);
    item_per_page = getParameterByName(itemPerPageParameterName);

    searchedTerm = search === undefined ? defaultSearchText : search;
    sortColumn = order_by === undefined ? defaultOrderBy : order_by;
    sortType = order_type === undefined ? defaultOrderType : order_type;
    itemPerPage =
      item_per_page === undefined ? defaultItemPerPage : item_per_page;

    var modeComponent = (
      <MtIndexComponent
        // itemPerPage={defaultItemPerPage}
        // currentPage={defaultCurrentPage}
        // search={defaultSearchText}
        // orderBy={defaultOrderBy}
        // orderType={defaultOrderType}
      />
    );

     
    switch (currentMode) {
      case "read":
        break;
      case "page":
        initialPage = getParameterByName(pageParameterName);
        initialPage = parseInt(initialPage) <= 0 ? "1" : initialPage;
        modeComponent = (
          <MtIndexComponent
            // itemPerPage={itemPerPage}
            // currentPage={initialPage}
            // search={searchedTerm}
            // orderBy={sortColumn}
            // orderType={sortType}
          />

        );
        break;
        
      case "master":
        initialPage = getParameterByName(pageParameterName);
        initialPage = parseInt(initialPage) <= 0 ? "1" : initialPage;
        modeComponent = (
          <ReadProductsComponent
            itemPerPage={itemPerPage}
            currentPage={initialPage}
            search={searchedTerm}
            orderBy={sortColumn}
            orderType={sortType}
          />

        );
        break;
      case "show":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <ReadOneProductComponent productId={productId} />;
        break;
      case "create":
        modeComponent = (
          <CreateProductComponent changeAppMode={this.changeAppMode} />
        );
        break;
      case "update":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <UpdateProductComponent productId={productId} />;
        break;
      case "delete":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <DeleteProductComponent productId={productId} />;
        break;
      case "login":
        modeComponent = <LoginComponent />;
        break;
      case "TTools":
        modeComponent = <TPtoolsComponent />;
        break;
      case "TPcreate":
        modeComponent = <TPcreateComponent />;
        break;
      case "TPshow":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <TPshowComponent productId={productId} />;
        break;
      case "TPdelete":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <TPdeleteComponent productId={productId} />;
        break;
      case "TPedit":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <TPeditComponent productId={productId} />;
        break;
      case "register":
        modeComponent = <RegisterComponent />;
        break;


      case "ProCreate":
        modeComponent = <ProCreateComponent />;
        break;
      case "ProDelete":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <ProDeleteComponent productId={productId} />;
        break;
      case "ProEdit":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <ProEditComponent productId={productId} />;
        break;
      case "ProIndex":
        modeComponent = <ProIndexComponent />;
        break;
      case "ProShow":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <ProShowComponent productId={productId} />;
        break;


      case "PosCreate":
        modeComponent = <PosCreateComponent />;
        break;
      case "PosDelete":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <PosDeleteComponent productId={productId} />;
        break;
      case "PosEdit":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <PosEditComponent productId={productId} />;
        break;
      case "PosIndex":
        modeComponent = <PosIndexComponent />;
        break;
      case "PosShow":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <PosShowComponent productId={productId} />;
        break;

      case "EmpCreate":
        modeComponent = <EmpCreateComponent />;
        break;
      case "EmpEdit":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <EmpEditComponent productId={productId} />;
        break;
      case "EmpIndex":
        modeComponent = <EmpIndexComponent />;
        break;
      case "EmpShow":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <EmpShowComponent productId={productId} />;
        break;
      case "EmpDelete":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <EmpDeleteComponent productId={productId} />;
        break;


      case "roadIndex":
        modeComponent = <RoadIndexComponent />;
        break;

            // case "roadIndex":
            //       modeComponent = <roadIndexComponent />;
            //       break;


      case "roadCreate":
        modeComponent = <RoadCreateComponent />;
        break;
      case "roadEdit":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <RoadEditComponent productId={productId} />;
        break;
      case "roadIndex":
        modeComponent = <RoadIndexComponent />;
        break;
      case "roadShow":
        productId = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <RoadShowComponent productId={productId} />;
        break;
      case "roadDelete":
        toolname = this.props.location[0].split("?")[1].split("=")[1];
        modeComponent = <RoadDeleteComponent toolname={toolname} />;
        break;

        case "roadShowTool":
          toolname = this.props.location[0].split("?")[1].split("=")[1];
          modeComponent = <RoadShowToolComponent toolname={toolname} />;
          break;

          case "roadCreateTool":
            toolname = this.props.location[0].split("?")[1].split("=")[1];
            modeComponent = <RoadCreateToolComponent toolname={toolname} />;
            break;
            case "roadEditTool":
              productId = this.props.location[0].split("?")[1].split("=")[1];
              modeComponent = <RoadEditToolComponent productId={productId} />;
              break;
              case "roadDeleteTool":
                productId = this.props.location[0].split("?")[1].split("=")[1];
                modeComponent = <RoadDeleteToolComponent productId={productId} />;
                break;

                
              case "MtIndex":
                modeComponent = <MtIndexComponent />;
                break;
                case "achievementsindex":
                  modeComponent = <AchievementsindexComponent />;
                  break;
                  case "GanttIndex":
                    modeComponent = <GanttIndexComponent />;
                    break;
                    case "ForecastIndex":
                      modeComponent = <ForecastIndexComponent />;
                      break;
                      case "ForecastShow":
                        toolname = this.props.location[0].split("?")[1].split("=")[1];
                        modeComponent = <ForecastShowComponent toolname={toolname} />;
                        break;
                        
                    case "HandleIndex":
                      modeComponent = <HandleIndexComponent />;
                      break;

                      
                      case "techPIndex":
                        modeComponent = <TechpIndexComponent/>;
                        break;
      default:
        $(".page-header").html("<h1>Oops..</h1>");
        modeComponent = <NotFoundComponent />;
        break;
    }
    var navComponent = <NavComponent />;

    if(currentMode == 'login' || currentMode == 'register'){
      $(".page-header").css('border-bottom','0px');
      return (
        <div>
          {modeComponent}
        </div>
      );
    }else{
      $(".page-header").css('border-bottom','1px');
      return (
        <div>
          {navComponent}
          {modeComponent}
        </div>
      );
    }
  },
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?#&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function handleNewWindowLocation() {
  let location = window.location.hash.replace(/^#\/?|\/$/g, "").split("/");
  ReactDOM.render(
    <MainApp location={location} />,
    document.getElementById("content")
  );
}

handleNewWindowLocation();

window.addEventListener("hashchange", handleNewWindowLocation, false);
