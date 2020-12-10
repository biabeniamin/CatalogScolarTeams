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
public class UserAdapter extends BaseAdapter
{
	List<User> users;
	Context context;
	
	@Override
	public int getCount()
	{
		return users.size();
	
	}
	
	@Override
	public View getView(int position, View convertView, ViewGroup parent)
	{
		User user;
		TextView userIdTextBox;
		TextView firstNameTextBox;
		TextView lastNameTextBox;
		TextView emailTextBox;
		TextView typeTextBox;
		TextView creationTimeTextBox;
		
		user = getItem(position);
		
		if(null == convertView)
		{
			convertView = LayoutInflater.from(context).inflate(R.layout.user_view, parent, false);
		}
		
		userIdTextBox = (TextView) convertView.findViewById(R.id.userIdTextBox);
		firstNameTextBox = (TextView) convertView.findViewById(R.id.firstNameTextBox);
		lastNameTextBox = (TextView) convertView.findViewById(R.id.lastNameTextBox);
		emailTextBox = (TextView) convertView.findViewById(R.id.emailTextBox);
		typeTextBox = (TextView) convertView.findViewById(R.id.typeTextBox);
		creationTimeTextBox = (TextView) convertView.findViewById(R.id.creationTimeTextBox);
		
		userIdTextBox.setText(user.getUserId().toString());
		firstNameTextBox.setText(user.getFirstName());
		lastNameTextBox.setText(user.getLastName());
		emailTextBox.setText(user.getEmail());
		typeTextBox.setText(user.getType().toString());
		creationTimeTextBox.setText(user.getCreationTime().toString());
		
		return convertView;
	
	}
	
	@Override
	public User getItem(int position)
	{
		return users.get(position);
	
	}
	
	@Override
	public long getItemId(int position)
	{
		return users.get(position).getUserId();
	
	}
	
	public UserAdapter(List<User> users, Context context)
	{
		this.users = users;
		this.context = context;
	
	}
	

}
