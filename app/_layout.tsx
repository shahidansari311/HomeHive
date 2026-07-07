import { Stack } from "expo-router";
import {
  View , 
  Text, 
  TextInput ,
  TouchableOpacity,
  FlatList 
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css"


const properties=[
  {id:"1",title:"Modern Villa",city:"Mumbai", price:"1.2Cr"},
  {id:"2",title:"Sea View Flat",city:"Mumbai", price:"85L"},
  {id:"3",title:"Studio Loft",city:"Bengaluru", price:"35L"},
  {id:"4",title:"4 BHK Flat",city:"Noida", price:"1.5Cr"},
]

export default function RootLayout() {
  return (
    <SafeAreaView className="bg-black">
      <View className="p-16">
          <Text>Hello My name is shahid</Text>
          <TextInput placeholder="Search for a city"/>


          <TouchableOpacity 
          onPress={()=>alert("Searching")}
          style={{
            backgroundColor:"#2563EB",
            padding:12,
            borderRadius:8,
            marginTop:10,
            alignItems:"center",
            }}>
            <Text
            style={{
              color:"white",
              fontWeight:"900",
            }}> Search </Text>
          </TouchableOpacity>
      </View>

      <FlatList 
      data={properties} 
      keyExtractor={(item)=>item.id}
      contentContainerStyle={{padding:16}}
      renderItem={({item})=>(
        <View
        style={{
          backgroundColor:"#f5f4f4",
          padding:12,
          borderRadius:10,
          marginBottom:10
        }}>
          <Text style={{fontWeight:"bold"}}>{item.title}</Text>
          <Text style={{color:"#666"}}>{item.city}</Text>
          <Text style={{color:"#2563EB"}}>{item.price}</Text>
        </View>
      )}
      />

    </SafeAreaView>
  );
}
