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
interface TokenService
{
	
	@GET("api/tokens")
	Call<TokenResponse> getTokensFiltered(@Query("q") String q);
	@POST("Tokens.php?cmd=addToken")
	Call<Token> addToken(@Body Token token);

}

public class Tokens
{
	public static  getTokens(Call<> call)
	{
		 tokens;
		
		tokens = null;
		
		try
		{
			tokens = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return tokens;
	
	}
	public static  getTokens()
	{
		 tokens;
		TokenService service;
		Call<> call;
		
		tokens = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TokenService.class);
		try
		{
			call = service.getTokens();
			tokens = getTokens(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return tokens;
	
	}
	
	public static  getTokensByValue(NOT_EXISTING value)
	{
		 tokens;
		TokenService service;
		Call<> call;
		
		tokens = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TokenService.class);
		try
		{
			call = service.getTokensByValue(value);
			tokens = getTokens(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return tokens;
	
	}
	
	public static  getTokensByTokenId(Integer  tokenId)
	{
		 tokens;
		TokenService service;
		Call<> call;
		
		tokens = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TokenService.class);
		try
		{
			call = service.getTokensByTokenId(tokenId);
			tokens = getTokens(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return tokens;
	
	}
	
	
	public static void getTokens(Call<> call, Callback<> callback)
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
	public static void getTokens(Callback<> callback)
	{
		 tokens;
		TokenService service;
		Call<> call;
		
		tokens = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TokenService.class);
		try
		{
			call = service.getTokens();
			getTokens(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getTokensByValue(NOT_EXISTING value, Callback<> callback)
	{
		 tokens;
		TokenService service;
		Call<> call;
		
		tokens = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TokenService.class);
		try
		{
		);
			getTokens(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getTokensByTokenId(Integer  tokenId, Callback<> callback)
	{
		 tokens;
		TokenService service;
		Call<> call;
		
		tokens = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TokenService.class);
		try
		{
		);
			getTokens(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	
	public static Token addToken(Token token)
	{
		TokenService service;
		Call<Token> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(TokenService.class);
		try
		{
			call = service.addToken(token);
			token = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return token;
	
	}
	
	public static void addToken(Token token, Callback<Token> callback)
	{
		TokenService service;
		Call<Token> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(TokenService.class);
		try
		{
			call = service.addToken(token);
			call.enqueue(callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
	
	}
	

}
