"use strict";

var RoadDeleteComponent = React.createClass({
    getInitialState:function() {
        return {
            isLoggedIn: '',
            id: 0,
            toolname: '',
            createdby: '',
            product: [],
            developby: ''
        };
    },

    componentDidMount: function() {
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

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    populateProducts: function () {
        var toolname = this.props.toolname;

        this.serverRequestProd = $.post(
            "api/roadmap/read_one_road.php",
            { prod_toolname:  (toolname) },
            function (product) {
              var p = JSON.parse(product)[0];
              this.setState({ createdby: p.createdby });
              this.setState({ toolname: p.toolname });
              this.setState({ developby: p.developby });
            }.bind(this));

            this.serverRequest = $.post(
                "api/roadmap/read_one_tool.php",
                { prod_toolname: (toolname) },
                function (products) {
                  if (this.isMounted()) {
                      this.setState({products: JSON.parse(products) });
                  }
                }.bind(this));
      },
      
    
    onDelete: function(e) {
      
            var del_ids = this.state.products.map(product => product.id);
              $.post(
                'api/roadmap/delete_road.php',
                { del_ids: del_ids },
                function (res) {
                  if (res == "true") {
                    window.location.replace('#roadIndex');
                  } else {
                    alert("Unable to delete product(s).");
                  }
                }.bind(this)
              );
            
    },

    render: function() {

        $(".page-header h1").text("Project/Tool: "+(this.state.toolname));
        return (
            <div className="row">
                
          <h3>Created by: {this.state.createdby}</h3>
          <h4>Develop By: {this.state.developby}</h4>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-body text-align-center">
                            Are you sure to delete?
                        </div>
                        <div className="panel-footer clearfix">
                            <div className="text-align-center">
                                <button className="btn btn-danger m-r-1em"
                                        onClick={this.onDelete}>
                                    Yes
                                </button>
                                <button className="btn btn-primary"
                                        onClick={() => window.location.replace('#roadIndex')}>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }
});