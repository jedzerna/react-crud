"use strict";

var RoadDeleteToolComponent = React.createClass({
    getInitialState:function() {
        return {
            isLoggedIn: '',
            id: 0,
            refid: 0,
            toolname: '',
            createdby: '',
            quarter: '',
            description: '',
            descridevelopbyption: '',
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

        var productId = this.props.productId;
        this.serverRequestProd = $.post(
          "api/roadmap/read_one_toolonly.php",
          { prod_id: productId },
          function (product) {
              var p = JSON.parse(product)[0];
              this.setState({
                  id: p.id,
                  toolname: p.toolname,
                  createdby: p.createdby,
                  quarter: p.quarter,
                  description: p.description,
                  developby: p.developby
              });
          }.bind(this));


        $('.page-header h1').text('Delete Data');
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    onDelete: function(e) {
        var productId = this.props.productId;

        $.post('api/roadmap/delete_roadonly.php',
            {del_ids: [productId]},
            function(res) {
                window.location.replace('#roadShowTool?toolname=' + encodeURIComponent(this.state.toolname));
            }.bind(this)
        );
    },

    render: function() {

        $(".page-header h1").text(this.state.toolname);
        return (
          <div>
          <h3>Created by: {this.state.createdby}</h3>
          <h4>Quarter: {this.state.quarter}</h4>
          <h4>Description: {this.state.description}</h4>
          <h4>Develop By: {this.state.developby}</h4>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-body text-align-center">
                            Are you sure?
                        </div>
                        <div className="panel-footer clearfix">
                            <div className="text-align-center">
                                <button className="btn btn-danger m-r-1em"
                                        onClick={this.onDelete}>
                                    Yes
                                </button>
                                <button className="btn btn-primary"
                                        onClick={() => window.location.replace('#roadShowTool?toolname=' + encodeURIComponent(this.state.toolname))}>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
            </div>
        );
    }
});