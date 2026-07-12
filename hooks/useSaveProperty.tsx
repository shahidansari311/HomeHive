import { useAuth } from "@clerk/expo";
import { useSupabase } from "./useSupabase";
import { useEffect, useState } from "react";

export function useSaveProperty(
    propertyId:string,
    onUnsave?:()=>void
) {
  const {userId} = useAuth();
  const authSupabse=useSupabase();

  const [isSaved,setIsSaved]=useState(false);
  const [saveloading,setSaveloading]=useState(false);

  const checkIfSaved= async()=>{
    if(!userId) return;

    const {data} = await authSupabse
    .from("saved_properties")
    .select("id")
    .eq("user_clerk_id",userId)
    .eq("property_id",propertyId)
    .single()

    setIsSaved(!!data);
  };

  useEffect(()=>{
    checkIfSaved();
  },[propertyId,userId])

  const toggleSave=async()=>{
    if(!userId || saveloading) return;
    setSaveloading(true);

    if(isSaved){
        await authSupabse
        .from("saved_properties")
        .delete()
        .eq("user_clerk_id",userId)
        .eq("property_id",propertyId);
    
        setIsSaved(false);
        onUnsave?.();
    } else {
        await authSupabse.from("saved_properties").insert({
            user_clerk_id:userId,
            property_id:propertyId
        })
        setIsSaved(true);
    }


    setSaveloading(false);
  }

  return {isSaved,saveloading,toggleSave}
}