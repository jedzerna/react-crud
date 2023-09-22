"use strict";

var GanttIndexComponent = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      isLoggedIn: "",
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "", 
      tasks: [
        { id: 1, title: 'Task 1', description: 'Description 1', startDate: '2023-03-01', endDate: '2023-04-31' },
        { id: 2, title: 'Task 2', description: 'Description 1', startDate: '2023-09-06', endDate: '2023-10-07' },
        { id: 3, title: 'Task 2', description: 'Description 2', startDate: '2023-08-06', endDate: '2023-09-09' },
        { id: 4, title: 'Task 3', description: 'Description 3', startDate: '2023-04-11', endDate: '2023-04-15' },
      ]
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
  },


  calculateTotalDays: function () {
    // Calculate the total timeline duration (for example, from the first task to the last)
    var earliestStartDate = this.state.tasks.reduce(function (min, task) {
      return task.startDate < min ? task.startDate : min;
    }, this.state.tasks[0].startDate);

    var latestEndDate = this.state.tasks.reduce(function (max, task) {
      return task.endDate > max ? task.endDate : max;
    }, this.state.tasks[0].endDate);

    return (new Date(latestEndDate) - new Date(earliestStartDate)) / (1000 * 60 * 60 * 24);
  },

  calculateTotalMonths: function () {
    // Calculate the total timeline duration in months
    var startDate = new Date('2023-01-01');
    var endDate = new Date('2023-12-31');

    this.state.tasks.forEach(function (task) {
      var taskStartDate = new Date(task.startDate);
      var taskEndDate = new Date(task.endDate);

      if (taskStartDate < startDate) {
        startDate = taskStartDate;
      }

      if (taskEndDate > endDate) {
        endDate = taskEndDate;
      }
    });

    return (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
  },
  render: function () {
    // Calculate the total number of months
    var totalMonths = this.calculateTotalMonths();

    $(".page-header h1").text("Svelte Gantt Chart");
    return (
      <div className="gantt-chart-container">
        <table className="gantt-chart">
          {/* Render the Gantt chart headers (e.g., months) */}
          <thead>
            <tr>
              <th>Task</th>
              {[...Array(totalMonths)].map((_, monthIndex) => (
                <th key={monthIndex} className="month-header">
                  {new Date(
                    new Date('2023-01-01').setMonth(
                      new Date('2023-01-01').getMonth() + monthIndex
                    )
                  ).toLocaleString('default', { month: 'short' })}
                </th>
              ))}
            </tr>
          </thead>
          {/* Render your Gantt chart rows here */}
          <tbody>
            {this.state.tasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <div className="task-title">{task.title}</div>
                  <div className="task-description">{task.description}</div>
                </td>
                {[...Array(totalMonths)].map((_, monthIndex) => (
                  // Use a custom renderCell function to handle colspan
                  this.renderCell(task, monthIndex)
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
  renderCell: function (task, monthIndex) {
    const isTaskInMonth = this.isTaskInMonth(task, monthIndex);

    if (isTaskInMonth) {
      // Calculate colspan based on the duration of the task
      const taskStartDate = new Date(task.startDate);
      const taskEndDate = new Date(task.endDate);
      const monthStartDate = new Date(
        new Date('2023-01-01').setMonth(
          new Date('2023-01-01').getMonth() + monthIndex
        )
      );

      const colspan = this.calculateColspan(taskStartDate, taskEndDate, monthStartDate);

      return (
        <td key={monthIndex} colSpan={colspan} className="task">
          &nbsp;
        </td>
      );
    } else {
      return (
        <td key={monthIndex} className="not-in-month">
          &nbsp;
        </td>
      );
    }
  },

  // Function to calculate colspan
  calculateColspan: function (startDate, endDate, currentMonthStartDate) {
    // Calculate the number of months between startDate and endDate
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    const currentYear = currentMonthStartDate.getFullYear();
    const currentMonth = currentMonthStartDate.getMonth();

    if (
      (currentYear === startYear && currentMonth === startMonth) ||
      (currentYear === endYear && currentMonth === endMonth)
    ) {
      // If the current month is the start or end month of the task, colspan is 1
      return 1;
    } else if (currentYear === startYear && currentMonth > startMonth) {
      // If the current month is after the start month, calculate remaining months
      return 12 - startMonth;
    } else if (currentYear === endYear && currentMonth < endMonth) {
      // If the current month is before the end month, calculate remaining months
      return endMonth + 1;
    } else if (currentYear > startYear && currentYear < endYear) {
      // If the current month is within the range of the task's years, colspan is 12 (full year)
      return 12;
    } else {
      // If none of the above conditions match, colspan is 0
      return 0;
    }
  },
  isTaskInMonth: function (task, monthIndex) {
    var taskStartDate = new Date(task.startDate);
    var taskEndDate = new Date(task.endDate);
  
    // Calculate the start and end dates of the current month
    var monthStartDate = new Date(
      new Date('2023-01-01').setMonth(new Date('2023-01-01').getMonth() + monthIndex)
    );
    var monthEndDate = new Date(
      new Date('2023-01-01').setMonth(new Date('2023-01-01').getMonth() + monthIndex + 1)
    );
  
    return (
      taskStartDate <= monthEndDate && taskEndDate >= monthStartDate
    );
  },
});