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
public class ClassRoomAdapter extends BaseAdapter
{
	List<ClassRoom> classRooms;
	Context context;
	
	@Override
	public int getCount()
	{
		return classRooms.size();
	
	}
	
	@Override
	public View getView(int position, View convertView, ViewGroup parent)
	{
		ClassRoom classRoom;
		TextView classRoomIdTextBox;
		TextView nameTextBox;
		TextView creationTimeTextBox;
		
		classRoom = getItem(position);
		
		if(null == convertView)
		{
			convertView = LayoutInflater.from(context).inflate(R.layout.classroom_view, parent, false);
		}
		
		classRoomIdTextBox = (TextView) convertView.findViewById(R.id.classRoomIdTextBox);
		nameTextBox = (TextView) convertView.findViewById(R.id.nameTextBox);
		creationTimeTextBox = (TextView) convertView.findViewById(R.id.creationTimeTextBox);
		
		classRoomIdTextBox.setText(classRoom.getClassRoomId().toString());
		nameTextBox.setText(classRoom.getName());
		creationTimeTextBox.setText(classRoom.getCreationTime().toString());
		
		return convertView;
	
	}
	
	@Override
	public ClassRoom getItem(int position)
	{
		return classRooms.get(position);
	
	}
	
	@Override
	public long getItemId(int position)
	{
		return classRooms.get(position).getClassRoomId();
	
	}
	
	public ClassRoomAdapter(List<ClassRoom> classRooms, Context context)
	{
		this.classRooms = classRooms;
		this.context = context;
	
	}
	

}
