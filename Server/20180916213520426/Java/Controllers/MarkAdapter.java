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
		TextView classeIdTextBox;
		TextView studentIdTextBox;
		TextView teacherIdTextBox;
		TextView valueTextBox;
		TextView dateTextBox;
		TextView creationTimeTextBox;
		
		mark = getItem(position);
		
		if(null == convertView)
		{
			convertView = LayoutInflater.from(context).inflate(R.layout.mark_view, parent, false);
		}
		
		markIdTextBox = (TextView) convertView.findViewById(R.id.markIdTextBox);
		classeIdTextBox = (TextView) convertView.findViewById(R.id.classeIdTextBox);
		studentIdTextBox = (TextView) convertView.findViewById(R.id.studentIdTextBox);
		teacherIdTextBox = (TextView) convertView.findViewById(R.id.teacherIdTextBox);
		valueTextBox = (TextView) convertView.findViewById(R.id.valueTextBox);
		dateTextBox = (TextView) convertView.findViewById(R.id.dateTextBox);
		creationTimeTextBox = (TextView) convertView.findViewById(R.id.creationTimeTextBox);
		
		markIdTextBox.setText(mark.getMarkId().toString());
		classeIdTextBox.setText(mark.getClasseId().toString());
		studentIdTextBox.setText(mark.getStudentId().toString());
		teacherIdTextBox.setText(mark.getTeacherId().toString());
		valueTextBox.setText(mark.getValue().toString());
		dateTextBox.setText(mark.getDate().toString());
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
