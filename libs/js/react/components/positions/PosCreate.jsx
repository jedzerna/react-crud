"use strict";

var PosCreateComponent = React.createClass({
    getInitialState: function() {
        return {
            Position:'',
            Experience: '',
            PositionCount: '',
            SkillSets: '',
            Budget: '',
            ReplacementAditional: ''
        };
    },

    componentDidMount: function() {
        this.serverRequest = $.get('api/is_logged_in.php', function(result) {
            // if(result == 'true')
            //     // this.setState({
                    
            //     // });
            // else
            //     window.location.href = '';

        }.bind(this));

        $('.page-header h1').text('Create New');
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    

    onPositionChange: function(e) {
        this.setState({
            Position: e.target.value
        });
    },

    onExperienceChange: function(e) {
        this.setState({
            Experience: e.target.value
        });
    },

    onPositionCountChange: function(e) {
        this.setState({
            PositionCount: e.target.value
        });
    },

    onSkillSetsChange: function(e) {
        this.setState({
            SkillSets: e.target.value
        });
    },

    
    
    onBudgetChange: function(e) {
        this.setState({
            Budget: e.target.value
        });
    },
    onReplacementAditionalChange: function(e) {
        this.setState({
            ReplacementAditional: e.target.value
        });
    },
    onSave: function(e) {
        $.post('api/positionAPI/create_position.php', {
            Position: this.state.Position,
            Experience: this.state.Experience,
            PositionCount: this.state.PositionCount,
            SkillSets: this.state.SkillSets,
            Budget: this.state.Budget,
            ReplacementAditional: this.state.ReplacementAditional
            },
            function(res) {
                this.setState({successCreation: res});
                if(res == 'true') {
                    this.setState({Position: ''});
                    this.setState({Experience: ''});
                    this.setState({PositionCount: ''});
                    this.setState({SkillSets: ''});
                    this.setState({Budget: ''});
                    this.setState({ReplacementAditional: ''});
                }
            }.bind(this));
        e.preventDefault();
    },

    // THE FORM
    render: function() {
        return (
            <div>
                {
                    this.state.successCreation == "true" ?
                        <div className="alert alert-success">
                            Data was saved.
                        </div>
                        : null
                }
                {
                    this.state.successCreation != "true" && this.state.successCreation != null ?
                        <div className="alert alert-danger">
                            {this.state.successCreation}
                        </div>
                        : null
                }

                <a href="#PosIndex"
                   className="btn btn-primary margin-bottom-1em">
                    Back
                </a>

                <form onSubmit={this.onSave}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                        <tr>
                            <td>Position</td>
                            <td>
                                    <textarea
                                    type="text"
                                    className="form-control"
                                    value={this.state.Position}
                                    required
                                    onChange={this.onPositionChange}>
                                    </textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Experience</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.Experience}
                                        onChange={this.onExperienceChange}
                                       />
                            </td>
                        </tr>

                        <tr>
                            <td>Position Count</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.PositionCount}
                                        onChange={this.onPositionCountChange}
                                        />
                            </td>
                        </tr>
                        <tr>
                            <td>Skill Sets</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.SkillSets}
                                        onChange={this.onSkillSetsChange}
                                        />
                            </td>
                        </tr>
                        <tr>
                            <td>Budget</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.Budget}
                                        required
                                        onChange={this.onBudgetChange}
                                        />
                            </td>
                        </tr>
                        <tr>
                            <td>Replacement/Aditional</td>
                            <td>
                                <input
                                        className="form-control"
                                        value={this.state.ReplacementAditional}
                                        required
                                        onChange={this.onReplacementAditionalChange}
                                        />
                            </td>
                        </tr>


                        <tr>
                            <td></td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={this.onSave}>
                                    Save
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});