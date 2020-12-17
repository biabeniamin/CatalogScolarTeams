//generated automatically
package com.example.biabe.DatabaseFunctionsGenerator;
import com.example.biabe.DatabaseFunctionsGenerator.Models.*;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;
import java.util.List;
public class TokenUserAdapter extends BaseAdapter
{
	List<TokenUser> tokenUsers;
	Context context;
	
	@Override
	public int getCount()
	{
		return tokenUsers.size();
	
	}
	
	@Override
	public View getView(int position, View convertView, ViewGroup parent)
	{
		TokenUser tokenUser;
		TextView tokenUserIdTextBox;
		TextView usernameTextBox;
		TextView passwordTextBox;
		TextView creationTimeTextBox;
		
		tokenUser = getItem(position);
		
		if(null == convertView)
		{
			convertView = LayoutInflater.from(context).inflate(R.layout.tokenuser_view, parent, false);
		}
		
		tokenUserIdTextBox = (TextView) convertView.findViewById(R.id.tokenUserIdTextBox);
		usernameTextBox = (TextView) convertView.findViewById(R.id.usernameTextBox);
		passwordTextBox = (TextView) convertView.findViewById(R.id.passwordTextBox);
		creationTimeTextBox = (TextView) convertView.findViewById(R.id.creationTimeTextBox);
		
		tokenUserIdTextBox.setText(tokenUser.getTokenUserId().toString());
		usernameTextBox.setText(tokenUser.getUsername());
		passwordTextBox.setText(tokenUser.getPassword());
		creationTimeTextBox.setText(tokenUser.getCreationTime().toString());
		
		return convertView;
	
	}
	
	@Override
	public TokenUser getItem(int position)
	{
		return tokenUsers.get(position);
	
	}
	
	@Override
	public long getItemId(int position)
	{
		return tokenUsers.get(position).getTokenUserId();
	
	}
	
	public TokenUserAdapter(List<TokenUser> tokenUsers, Context context)
	{
		this.tokenUsers = tokenUsers;
		this.context = context;
	
	}
	

}
