jQuery(document).ready(function() {
	$("#list").jqGrid({
		url : "GridServlet",
		datatype : "json",
		mtype : 'POST',
		colNames : [ 'Cab', 'Employee ID', 'Pincode', 'Employee Name', 'Gender','Address', 'Latitude', 'Longitude' ],
		colModel : [ {
			name : 'cab',
			index : 'cab',
			width : 150
		}, {
			name : 'empId',
			index : 'empId',
			width : 150,
			editable : true
		}, {
			name : 'pincode',
			index : 'pincode',
			width : 150,
			editable : true
		}, {
			name : 'empName',
			index : 'empName',
			width : 150,
			editable : true
		}, {
			name : 'gender',
			index : 'gender',
			width : 150,
			editable : true
		},		{
			name : 'address',
			index : 'address',
			width : 250,
			editable : true
		}, {
			name : 'latitude',
			index : 'latitude',
			width : 150,
			editable : true
		} ,{
			name : 'longitude',
			index : 'longitude',
			width : 150,
			editable : true
		}  ],
		pager : '#pager',
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		sortname : 'invid',
		sortorder : 'desc',
		viewrecords : true,
		gridview : true,
		caption : 'Cab Allocations',
		jsonReader : {
			repeatitems : false,
		},
		editurl : "GridServlet"
	});
	jQuery("#list").jqGrid('navGrid', '#pager', {
		edit : true,
		add : true,
		del : true,
		search : true
	});
});