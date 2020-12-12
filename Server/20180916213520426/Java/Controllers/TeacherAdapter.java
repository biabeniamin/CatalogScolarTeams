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
public class TeacherAdapter extends BaseAdapter
{
	List<Teacher> teachers;
	Context context;
	
	@Override
	public int getCount()
	{
		return teachers.size();
	
	}
	
	@Override
	public View getView(int position, View convertView, ViewGroup parent)
	{
		Teacher teacher;
		TextView teacherIdTextBox;
		TextView nameTextBox;
		TextView emailTextBox;
		TextView creationTimeTextBox;
		
		teacher = getItem(position);
		
		if(null == convertView)
		{
			convertView = LayoutInflater.from(context).inflate(R.layout.teacher_view, parent, false);
		}
		
		teacherIdTextBox = (TextView) convertView.findViewById(R.id.teacherIdTextBox);
		nameTextBox = (TextView) convertView.findViewById(R.id.nameTextBox);
		emailTextBox = (TextView) convertView.findViewById(R.id.emailTextBox);
		creationTimeTextBox = (TextView) convertView.findViewById(R.id.creationTimeTextBox);
		
		teacherIdTextBox.setText(teacher.getTeacherId().toString());
		nameTextBox.setText(teacher.getName());
		emailTextBox.setText(teacher.getEmail());
		creationTimeTextBox.setText(teacher.getCreationTime().toString());
		
		return convertView;
	
	}
	
	@Override
	public Teacher getItem(int position)
	{
		return teachers.get(position);
	
	}
	
	@Override
	public long getItemId(int position)
	{
		return teachers.get(position).getTeacherId();
	
	}
	
	public TeacherAdapter(List<Teacher> teachers, Context context)
	{
		this.teachers = teachers;
		this.context = context;
	
	}
	

}
