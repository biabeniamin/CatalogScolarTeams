//generated automatically
package com.example.biabe.DatabaseFunctionsGenerator;
import com.example.biabe.DatabaseFunctionsGenerator.Models.*;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;
import retrofit2.http.Query;
import retrofit2.http.POST;
import retrofit2.http.Body;
interface ClasseService
{
	
	@GET("api/classes")
	Call<ClasseResponse> getClassesFiltered(@Query("q") String q);
	@POST("Classes.php?cmd=addClasse")
	Call<Classe> addClasse(@Body Classe classe);

}

public class Classes
{
	public static  getClasses(Call<> call)
	{
		 classes;
		
		classes = null;
		
		try
		{
			classes = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return classes;
	
	}
	public static  getClasses()
	{
		 classes;
		ClasseService service;
		Call<> call;
		
		classes = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(ClasseService.class);
		try
		{
			call = service.getClasses();
			classes = getClasses(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return classes;
	
	}
	
	public static  getClassesByClassRoomId(Integer  classRoomId)
	{
		 classes;
		ClasseService service;
		Call<> call;
		
		classes = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(ClasseService.class);
		try
		{
			call = service.getClassesByClassRoomId(classRoomId);
			classes = getClasses(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return classes;
	
	}
	
	public static  getClassesByClasseId(Integer  classeId)
	{
		 classes;
		ClasseService service;
		Call<> call;
		
		classes = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(ClasseService.class);
		try
		{
			call = service.getClassesByClasseId(classeId);
			classes = getClasses(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return classes;
	
	}
	
	
	public static void getClasses(Call<> call, Callback<> callback)
	{
		try
		{
			call.enqueue(callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	public static void getClasses(Callback<> callback)
	{
		 classes;
		ClasseService service;
		Call<> call;
		
		classes = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(ClasseService.class);
		try
		{
			call = service.getClasses();
			getClasses(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getClassesByClassRoomId(Integer  classRoomId, Callback<> callback)
	{
		 classes;
		ClasseService service;
		Call<> call;
		
		classes = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(ClasseService.class);
		try
		{
		);
			getClasses(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getClassesByClasseId(Integer  classeId, Callback<> callback)
	{
		 classes;
		ClasseService service;
		Call<> call;
		
		classes = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(ClasseService.class);
		try
		{
		);
			getClasses(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	
	public static Classe addClasse(Classe classe)
	{
		ClasseService service;
		Call<Classe> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(ClasseService.class);
		try
		{
			call = service.addClasse(classe);
			classe = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return classe;
	
	}
	
	public static void addClasse(Classe classe, Callback<Classe> callback)
	{
		ClasseService service;
		Call<Classe> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(ClasseService.class);
		try
		{
			call = service.addClasse(classe);
			call.enqueue(callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
	
	}
	

}
