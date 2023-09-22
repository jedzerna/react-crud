"use strict";

var EmpDeleteComponent = React.createClass({
    getInitialState:function() {
        return {
            isLoggedIn: ''
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
        $('.page-header h1').text('Delete Project');
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    onDelete: function(e) {
        var productId = this.props.productId;

        $.post('api/employeeAPI/delete_employee.php',
            {del_ids: [productId]},
            function(res) {
                window.location.replace('#EmpIndex');
            }.bind(this));
    },

    render: function() {

        return (
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
                                        onClick={() => window.location.replace('#EmpIndex')}>
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