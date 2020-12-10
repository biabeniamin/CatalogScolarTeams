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
public class MarkAdapter extends BaseAdapter
{
	List<Mark> marks;
	Context context;
	
	@Override
	public int getCount()
	{
		return marks.size();
	
	}
	
	@Override
	public View getView(int position, View convertView, ViewGroup parent)
	{
		Mark mark;
		TextView markIdTextBox;
		TextView userIdTextBox;
		TextView valueTextBox;
		TextView creationTimeTextBox;
		
		mark = getItem(position);
		
		if(null == convertView)
		{
			convertView = LayoutInflater.from(context).inflate(R.layout.mark_view, parent, false);
		}
		
		markIdTextBox = (TextView) convertView.findViewById(R.id.markIdTextBox);
		userIdTextBox = (TextView) convertView.findViewById(R.id.userIdTextBox);
		valueTextBox = (TextView) convertView.findViewById(R.id.valueTextBox);
		creationTimeTextBox = (TextView) convertView.findViewById(R.id.creationTimeTextBox);
		
		markIdTextBox.setText(mark.getMarkId().toString());
		userIdTextBox.setText(mark.getUserId().toString());
		valueTextBox.setText(mark.getValue().toString());
		creationTimeTextBox.setText(mark.getCreationTime().toString());
		
		return convertView;
	
	}
	
	@Override
	public Mark getItem(int position)
	{
		return marks.get(position);
	
	}
	
	@Override
	public long getItemId(int position)
	{
		return marks.get(position).getMarkId();
	
	}
	
	public MarkAdapter(List<Mark> marks, Context context)
	{
		this.marks = marks;
		this.context = context;
	
	}
	

}
