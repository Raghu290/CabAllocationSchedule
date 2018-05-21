/**
 * 
 */
package com.travel.iCab;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import model.JqGridModel;




public class CsvReader  {

	private CSVParser cabAllocationFileParser;
	

	public CsvReader(File cabAllocationFile) throws IOException {

		cabAllocationFileParser = CSVParser.parse(cabAllocationFile, Charset.defaultCharset(), CSVFormat.DEFAULT.withHeader());
		
	}

	
	public ArrayList<JqGridModel> getJqGridModelList() {

		ArrayList<JqGridModel> jqGridModelList = new ArrayList<JqGridModel>();

		for (CSVRecord csvRecord : cabAllocationFileParser) {

			JqGridModel jqGridModel = new JqGridModel();
			jqGridModel.setEmpId(csvRecord.get("EmpID"));
			jqGridModel.setAddress(csvRecord.get("Address"));
			jqGridModel.setCab(csvRecord.get("Cab"));
			jqGridModel.setEmpName(csvRecord.get("EmpName"));
			jqGridModel.setGender(csvRecord.get("Gender"));
			jqGridModel.setLatitude(csvRecord.get("Latitude"));
			jqGridModel.setLongitude(csvRecord.get("Longitude"));
			jqGridModel.setPincode(csvRecord.get("Pincode"));
			jqGridModelList.add(jqGridModel);
			
		}
		return jqGridModelList;

		
	}

	


}