<!DOCTYPE html>
<html>
<head>
<title>Shuttle Schedule</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="style.css" rel="stylesheet" type="text/css" />
<link href="navi.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="jqueryJs/jquery-ui.css">
<link rel="stylesheet" href="gridJs/css/ui.jqgrid.css">

<script src="jqueryJs/external/jquery/jquery.js"></script>
<script src="gridJs/js/i18n/grid.locale-en.js"></script>
<script src="gridJs/js/jquery.jqGrid.src.js"></script>
<script src="jqueryJs/jquery-ui.js"></script>

<script src="js/getJqGridData.js"></script>

</head>
<body>
	<div id="container">
  <div id="top">
    <h2 align="center">Cab Allocation Details</h2>
  </div>
  <div id="header">
    <h1 class="header2"></h1>
  </div>
 
  <div id="content">
   <table  id="list">
		<tr>
			<td />
		</tr>
	</table>
	<div id="pager"></div>
  </div>
  
  <div align="center">  <a href="http://localhost:8080/CabAllocationSchedule/cabRoute.html#optimization">View Cab Route</a></div>
  <div class="clear" id="footer">
    <div align="center"> <b><i>Developed for Hackathon</i></b></div>
  </div>
</div>
</body>
</html>