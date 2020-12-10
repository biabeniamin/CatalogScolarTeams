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
interface AbsenteService
{
	
	@GET("api/absente")
	Call<AbsenteResponse> getAbsenteFiltered(@Query("q") String q);
	@POST("Absente.php?cmd=addAbsente")
	Call<Absente> addAbsente(@Body Absente absente);

}

public class Absente
{
	public static  getAbsente(Call<> call)
	{
		 absente;
		
		absente = null;
		
		try
		{
			absente = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return absente;
	
	}
	public static  getAbsente()
	{
		 absente;
		AbsenteService service;
		Call<> call;
		
		absente = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(AbsenteService.class);
		try
		{
			call = service.getAbsente();
			absente = getAbsente(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return absente;
	
	}
	
	public static  getAbsenteByAbsenteId(Integer  absenteId)
	{
		 absente;
		AbsenteService service;
		Call<> call;
		
		absente = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(AbsenteService.class);
		try
		{
			call = service.getAbsenteByAbsenteId(absenteId);
			absente = getAbsente(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return absente;
	
	}
	
	
	public static void getAbsente(Call<> call, Callback<> callback)
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
	public static void getAbsente(Callback<> callback)
	{
		 absente;
		AbsenteService service;
		Call<> call;
		
		absente = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(AbsenteService.class);
		try
		{
			call = service.getAbsente();
			getAbsente(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getAbsenteByAbsenteId(Integer  absenteId, Callback<> callback)
	{
		 absente;
		AbsenteService service;
		Call<> call;
		
		absente = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(AbsenteService.class);
		try
		{
		);
			getAbsente(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	
	public static Absente addAbsente(Absente absente)
	{
		AbsenteService service;
		Call<Absente> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(AbsenteService.class);
		try
		{
			call = service.addAbsente(absente);
			absente = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return absente;
	
	}
	
	public static void addAbsente(Absente absente, Callback<Absente> callback)
	{
		AbsenteService service;
		Call<Absente> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(AbsenteService.class);
		try
		{
			call = service.addAbsente(absente);
			call.enqueue(callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
	
	}
	

}
