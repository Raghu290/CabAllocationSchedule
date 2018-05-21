package com.travel.iCab;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import model.JqGridModel;

public class ICabHelper {

	public ArrayList<JqGridModel> getJqGridModelList() throws IOException {
		// TODO Auto-generated method stub
		
		File cabAllocationFile = new File("/Users/raghu/RoutePlan.csv");

		CsvReader fileReader = new CsvReader(cabAllocationFile);
		return fileReader.getJqGridModelList();
		

	}

}
