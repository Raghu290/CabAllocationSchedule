package servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.JqGridModel;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.travel.iCab.ICabHelper;

public class JqGridServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		ICabHelper iCabHelper = new ICabHelper();
		ArrayList<JqGridModel> jqGridModelList =iCabHelper.getJqGridModelList();
		
		List<JqGridModel> jqGridModels = new ArrayList<>();
		
		for(JqGridModel jqGridModel :jqGridModelList){
			jqGridModels.add(jqGridModel);
		}
	

		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String jsonArray = gson.toJson(jqGridModels);
		jsonArray = "{\"page\":1,\"total\":\"2\",\"records\":" + jqGridModels.size() + ",\"rows\":" + jsonArray + "}";

		System.out.println(jsonArray);

		response.getWriter().print(jsonArray);
	}
}