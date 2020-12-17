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
public class TokenAdapter extends BaseAdapter
{
	List<Token> tokens;
	Context context;
	
	@Override
	public int getCount()
	{
		return tokens.size();
	
	}
	
	@Override
	public View getView(int position, View convertView, ViewGroup parent)
	{
		Token token;
		TextView tokenIdTextBox;
		TextView tokenUserIdTextBox;
		TextView valueTextBox;
		TextView addressTextBox;
		TextView lastUpdateTextBox;
		TextView creationTimeTextBox;
		
		token = getItem(position);
		
		if(null == convertView)
		{
			convertView = LayoutInflater.from(context).inflate(R.layout.token_view, parent, false);
		}
		
		tokenIdTextBox = (TextView) convertView.findViewById(R.id.tokenIdTextBox);
		tokenUserIdTextBox = (TextView) convertView.findViewById(R.id.tokenUserIdTextBox);
		valueTextBox = (TextView) convertView.findViewById(R.id.valueTextBox);
		addressTextBox = (TextView) convertView.findViewById(R.id.addressTextBox);
		lastUpdateTextBox = (TextView) convertView.findViewById(R.id.lastUpdateTextBox);
		creationTimeTextBox = (TextView) convertView.findViewById(R.id.creationTimeTextBox);
		
		tokenIdTextBox.setText(token.getTokenId().toString());
		tokenUserIdTextBox.setText(token.getTokenUserId().toString());
		valueTextBox.setText(token.getValue().toString());
		addressTextBox.setText(token.getAddress());
		lastUpdateTextBox.setText(token.getLastUpdate().toString());
		creationTimeTextBox.setText(token.getCreationTime().toString());
		
		return convertView;
	
	}
	
	@Override
	public Token getItem(int position)
	{
		return tokens.get(position);
	
	}
	
	@Override
	public long getItemId(int position)
	{
		return tokens.get(position).getTokenId();
	
	}
	
	public TokenAdapter(List<Token> tokens, Context context)
	{
		this.tokens = tokens;
		this.context = context;
	
	}
	

}
