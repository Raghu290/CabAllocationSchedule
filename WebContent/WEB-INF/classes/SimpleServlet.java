

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class SimpleServlet
 */
@WebServlet("/SimpleServlet")
public class SimpleServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public SimpleServlet() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("tested");
		/*Product p = new Product();
		p.setId("fe");
		p.setName("sf");
		p.setPrice("23");
		Product p1 = new Product();
		p1.setId("fe");
		p1.setName("ssdf");
		p1.setPrice("2323");
		   List<Product> products = new ArrayList<Product>();
		   products.add(p);
		   products.add(p1);*/
		
		/*  List<String> list = new ArrayList<String>();
		    list.add("item1");
		    list.add("item2");
		    list.add("item3");*/
		File cabAllocationFile = new File("/Users/raghu/RoutePlan.csv");
		CsvReader fileReader = new CsvReader(cabAllocationFile);
		List<RouteDomainModel> products = fileReader.getRouteDomainModelList();
		System.out.println();
		    String json = new Gson().toJson(products);

		    response.setContentType("application/json");
		    response.setCharacterEncoding("UTF-8");
		    response.getWriter().write(json);
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
