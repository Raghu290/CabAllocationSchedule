

import java.io.File;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;





public class CsvReader  {

	private CSVParser cabAllocationFileParser;
	

	public CsvReader(File cabAllocationFile) throws IOException {

		cabAllocationFileParser = CSVParser.parse(cabAllocationFile, Charset.defaultCharset(), CSVFormat.DEFAULT.withHeader());
		
	}

	
	public ArrayList<RouteDomainModel> getRouteDomainModelList() {

		ArrayList<RouteDomainModel> jqGridModelList = new ArrayList<RouteDomainModel>();

		for (CSVRecord csvRecord : cabAllocationFileParser) {

			RouteDomainModel jqGridModel = new RouteDomainModel();
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