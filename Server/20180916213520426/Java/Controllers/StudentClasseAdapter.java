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
public class StudentClasseAdapter extends BaseAdapter
{
	List<StudentClasse> studentClasses;
	Context context;
	
	@Override
	public int getCount()
	{
		return studentClasses.size();
	
	}
	
	@Override
	public View getView(int position, View convertView, ViewGroup parent)
	{
		StudentClasse studentClasse;
		TextView studentClasseIdTextBox;
		TextView studentIdTextBox;
		TextView classeIdTextBox;
		TextView creationTimeTextBox;
		
		studentClasse = getItem(position);
		
		if(null == convertView)
		{
			convertView = LayoutInflater.from(context).inflate(R.layout.studentclasse_view, parent, false);
		}
		
		studentClasseIdTextBox = (TextView) convertView.findViewById(R.id.studentClasseIdTextBox);
		studentIdTextBox = (TextView) convertView.findViewById(R.id.studentIdTextBox);
		classeIdTextBox = (TextView) convertView.findViewById(R.id.classeIdTextBox);
		creationTimeTextBox = (TextView) convertView.findViewById(R.id.creationTimeTextBox);
		
		studentClasseIdTextBox.setText(studentClasse.getStudentClasseId().toString());
		studentIdTextBox.setText(studentClasse.getStudentId().toString());
		classeIdTextBox.setText(studentClasse.getClasseId().toString());
		creationTimeTextBox.setText(studentClasse.getCreationTime().toString());
		
		return convertView;
	
	}
	
	@Override
	public StudentClasse getItem(int position)
	{
		return studentClasses.get(position);
	
	}
	
	@Override
	public long getItemId(int position)
	{
		return studentClasses.get(position).getStudentClasseId();
	
	}
	
	public StudentClasseAdapter(List<StudentClasse> studentClasses, Context context)
	{
		this.studentClasses = studentClasses;
		this.context = context;
	
	}
	

}
