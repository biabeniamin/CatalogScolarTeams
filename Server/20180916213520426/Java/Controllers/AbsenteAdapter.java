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
public class AbsenteAdapter extends BaseAdapter
{
	List<Absente> absente;
	Context context;
	
	@Override
	public int getCount()
	{
		return absente.size();
	
	}
	
	@Override
	public View getView(int position, View convertView, ViewGroup parent)
	{
		Absente absente;
		TextView absenteIdTextBox;
		TextView teacherIdTextBox;
		TextView dateTextBox;
		TextView creationTimeTextBox;
		
		absente = getItem(position);
		
		if(null == convertView)
		{
			convertView = LayoutInflater.from(context).inflate(R.layout.absente_view, parent, false);
		}
		
		absenteIdTextBox = (TextView) convertView.findViewById(R.id.absenteIdTextBox);
		teacherIdTextBox = (TextView) convertView.findViewById(R.id.teacherIdTextBox);
		dateTextBox = (TextView) convertView.findViewById(R.id.dateTextBox);
		creationTimeTextBox = (TextView) convertView.findViewById(R.id.creationTimeTextBox);
		
		absenteIdTextBox.setText(absente.getAbsenteId().toString());
		teacherIdTextBox.setText(absente.getTeacherId().toString());
		dateTextBox.setText(absente.getDate().toString());
		creationTimeTextBox.setText(absente.getCreationTime().toString());
		
		return convertView;
	
	}
	
	@Override
	public Absente getItem(int position)
	{
		return absente.get(position);
	
	}
	
	@Override
	public long getItemId(int position)
	{
		return absente.get(position).getAbsenteId();
	
	}
	
	public AbsenteAdapter(List<Absente> absente, Context context)
	{
		this.absente = absente;
		this.context = context;
	
	}
	

}
