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
public class ClasseAdapter extends BaseAdapter
{
	List<Classe> classes;
	Context context;
	
	@Override
	public int getCount()
	{
		return classes.size();
	
	}
	
	@Override
	public View getView(int position, View convertView, ViewGroup parent)
	{
		Classe classe;
		TextView classeIdTextBox;
		TextView teacherIdTextBox;
		TextView classRoomIdTextBox;
		TextView nameTextBox;
		TextView creationTimeTextBox;
		
		classe = getItem(position);
		
		if(null == convertView)
		{
			convertView = LayoutInflater.from(context).inflate(R.layout.classe_view, parent, false);
		}
		
		classeIdTextBox = (TextView) convertView.findViewById(R.id.classeIdTextBox);
		teacherIdTextBox = (TextView) convertView.findViewById(R.id.teacherIdTextBox);
		classRoomIdTextBox = (TextView) convertView.findViewById(R.id.classRoomIdTextBox);
		nameTextBox = (TextView) convertView.findViewById(R.id.nameTextBox);
		creationTimeTextBox = (TextView) convertView.findViewById(R.id.creationTimeTextBox);
		
		classeIdTextBox.setText(classe.getClasseId().toString());
		teacherIdTextBox.setText(classe.getTeacherId().toString());
		classRoomIdTextBox.setText(classe.getClassRoomId().toString());
		nameTextBox.setText(classe.getName());
		creationTimeTextBox.setText(classe.getCreationTime().toString());
		
		return convertView;
	
	}
	
	@Override
	public Classe getItem(int position)
	{
		return classes.get(position);
	
	}
	
	@Override
	public long getItemId(int position)
	{
		return classes.get(position).getClasseId();
	
	}
	
	public ClasseAdapter(List<Classe> classes, Context context)
	{
		this.classes = classes;
		this.context = context;
	
	}
	

}
