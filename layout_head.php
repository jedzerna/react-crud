<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Nova Techset Ltd.</title>

    <!-- Bootstrap CSS -->


    <link href="libs/js/bootstrap/dist/css/bootstrap.css" rel="stylesheet" media="screen">
    <link href="libs/js/bootstrap/font-awesome.min.css" rel="stylesheet" type="text/css" media="screen" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css">

    <!-- HTML5 Shiv and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <style>
        .text-align-center{
            text-align:center;
        }

        .margin-zero{
            margin:0;
        }

        .overflow-hidden{
            overflow:hidden;
        }

        .margin-bottom-1em{
            margin-bottom:1em;
        }

        .m-r-1em{
            margin-right:1em;
        }

        a {
            cursor:pointer;
            font-size: 15px;
            margin-left:10px;
        }

        .navbar-center {
      position: relative;
     
      transform: translateY(20%);
    }
    .my-pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border-radius: 10px;
  border: 1px solid #ccc; /* Add border to the pagination container */
  padding: 10px;
  /* Add padding to the pagination container */
}

.my-pagination {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 10px;
}
.my-pagination button{
  border-radius: 10px;
}

.my-pagination li {
  margin: 0 5px;
  cursor: pointer;
  border: 1px solid #ccc; /* Add border to page numbers */
  padding: 5px 10px;
  border-radius: 4px;
}

.my-pagination li.active {
  font-weight: bold;
}

.my-pagination-container button {
  background-color: dodgerblue;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  height: 30px; 
  border-radius: 4px;
}

.my-pagination-container button:hover {
  background-color: #0056b3;
}

.items-per-page {
  margin-left: 10px;
}
.centered-container {
    justify-content: center;
    align-items: center;
}
.overflow-x {
  overflow-x: auto;
  max-width: 100%; /* Limit the maximum width of the table */
} 
.center-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh; 
      margin-top: -20%;/* Make the container full height of the viewport */
    }

    /* Centered image */
    .centered-image {
      width: 50px;
    }

    .form-popup {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    width: 40%;
    max-height: 100vh;
    overflow-x: auto; /* Add a horizontal scrollbar when needed */
    overflow-y: auto; /* Add a vertical scrollbar when needed */
  }
  .card-description {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 1rem;
}

.card-description.expanded {
  -webkit-line-clamp: unset;
}
.read-more {
  /* display: inline-block; */
  margin: 1rem;
  background-color: #007aff;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.read-more:hover {
  background-color: #0051a3;
}
@media (min-resolution: 72dpi) and (max-resolution: 120dpi) {    

  .form-popup {
    min-width: 300px;
    max-width: 500px;
    max-height: 100vh;
  overflow-x: auto; /* Add a vertical scrollbar when needed */
  }
  .viewweeklyform{
    width: 1200px;
    max-width: 1200px;
    min-width: 1200px;
  }

  .labelsizeleft{
    width: 300px;
  }
}
@media (min-resolution: 121dpi) and (max-resolution: 192dpi) {   /*   150% scale*/
  
  .form-popup {
    min-width: 350px;
    max-width: 800px;
    max-height: 100vh;
  }
  .viewweeklyform{
    width: 1000px;
    min-width: 350px;
    max-width: 1000px;
  }
  .labelsizeleft{
    width: 100%;
  }
}
  /* Style for the form content */
  .form-popup form {
    display: flex;
    flex-direction: column;
    max-height: 90%;
  }
  /* Style for the form input fields */
  .form-popup label {
    margin-bottom: 10px;
  }
  .form-popup label input{
    width: 100%;
  }
  .form-popup label textarea{
  height: auto;
  }
  /* Style for the form buttons */
  .form-popup button {
    margin-bottom: 10px;/* Adjust the distance from the bottom as needed */
    max-width: 150px;
  } 
   .custombuttonleft {
    margin-bottom: 10px;
  position: absolute; /* Position the button absolutely within the container */
  bottom: 20px; /* Adjust the distance from the bottom as needed */
  }  
   .custombuttonright {
    margin-bottom: 10px;
  position: absolute; /* Position the button absolutely within the container */
  bottom: 20px; /* Adjust the distance from the bottom as needed */
  }  
  .form-popup.open {
    visibility: visible;
    max-height: 96%;
    animation: fadeIn 0.1s ease-in-out; /* Add fade-in animation */
  }  
  .form-popup.close {
  animation: fadeOut 0.5s ease-in-out;
  } 
  @keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
  }




  .btn-custom-gray {
    background-color: darkgray; /* Change the background color to gray */
    color: white; /* Change the text color to white or any suitable color */
  } 
  .btn-custom-gray:hover {
    background-color: gray; /* Change the background color on hover */
    color: white; /* Change the text color on hover (if needed) */
  }
  .custom-width {
  width: 30%;
} .center-div {
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
        }



        .custom-floating-label-input {
  position: relative;
  margin-bottom: 20px;
  width: 70%;
}

.custom-floating-label-input label {
  position: absolute;
  pointer-events: none;
  left: 10px;
  top: 17px;
  transition: 0.2s ease all;
  color: #888; /* Initial label color */
  font-size: 17px;
  font-weight: normal;
}

.custom-floating-label-input input {
  color: #888; /* Initial label color */
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  height: 60px;
  font:400 16px Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
}

.custom-floating-label-input input:focus {
  color: #888; /* Initial label color */
  border-color: #007bff; /* Focus border color */
  border-color: #66afe9;
  outline: 0;
  border-width: 2px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
}

.custom-floating-label-input label.active {
  top: -8px;
  font-size: 12px;
  color:#1a73e8; /* Initial label color */
  background-color: white;
  font-weight: normal;
  padding-left: 10px;
  padding-right: 10px;
  
}

.gantt-chart-container {
  margin: 20px; /* Add margin as needed */
}

/* Style the Gantt chart table */
.gantt-chart {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
}

/* Style the table headers */
.gantt-chart th {
  background-color: #f2f2f2;
  text-align: left;
  padding: 8px;
  border: 1px solid #ddd;
}

/* Style the month headers */
.month-header {
  text-align: center;
  font-weight: bold;
}

/* Style the task cells */
.task {
  background-color: #4CAF50; /* Green color for tasks */
  color: white;
  text-align: center;
  padding: 8px;
  border: 1px solid #ddd;
}

/* Style cells not in the month */
.not-in-month {
  background-color: transparent;
  padding: 8px;
  border: 1px solid #ddd;
}

/* Style the task title and description */
.task-title {
  font-weight: bold;
}

.task-description {
  font-style: italic;
}
/* Styling for the Gantt chart table */
.pagination {
  margin-top: 10px;
}

.pagination button {
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  color: black;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 0 2px;
  cursor: pointer;
}

.pagination button.active {
  background-color: #007bff;
  color: white;
}

.switch{
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: 0 0px;
}

.slider{
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.switch input {display: none}

.slider:before{
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 30px;
}
input:checked + .slider{
  background-color: #ff278c;
}

input:checked + .slider::before{
  transform: translateX(20px);
}





    </style>

</head>
<body>

<!-- container -->
<div class="container" style="width: 80%;">
    <div class="page-header">
        <h1>
          <div class="center-container">
            <img src="ico/loading3.gif" alt="Logo" class="centered-image">
          </div>
        </h1>
    </div>