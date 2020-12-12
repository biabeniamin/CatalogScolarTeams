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
public class StudentAdapter extends BaseAdapter
{
	List<Student> students;
	Context context;
	
	@Override
	public int getCount()
	{
		return students.size();
	
	}
	
	@Override
	public View getView(int position, View convertView, ViewGroup parent)
	{
		Student student;
		TextView studentIdTextBox;
		TextView nameTextBox;
		TextView emailTextBox;
		TextView creationTimeTextBox;
		
		student = getItem(position);
		
		if(null == convertView)
		{
			convertView = LayoutInflater.from(context).inflate(R.layout.student_view, parent, false);
		}
		
		studentIdTextBox = (TextView) convertView.findViewById(R.id.studentIdTextBox);
		nameTextBox = (TextView) convertView.findViewById(R.id.nameTextBox);
		emailTextBox = (TextView) convertView.findViewById(R.id.emailTextBox);
		creationTimeTextBox = (TextView) convertView.findViewById(R.id.creationTimeTextBox);
		
		studentIdTextBox.setText(student.getStudentId().toString());
		nameTextBox.setText(student.getName());
		emailTextBox.setText(student.getEmail());
		creationTimeTextBox.setText(student.getCreationTime().toString());
		
		return convertView;
	
	}
	
	@Override
	public Student getItem(int position)
	{
		return students.get(position);
	
	}
	
	@Override
	public long getItemId(int position)
	{
		return students.get(position).getStudentId();
	
	}
	
	public StudentAdapter(List<Student> students, Context context)
	{
		this.students = students;
		this.context = context;
	
	}
	

}
