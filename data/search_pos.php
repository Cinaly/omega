<?php
    header("Content-Type:application/json");
    require("init.php");
   @$tid=$_REQUEST["tid"];
   @$pid=$_REQUEST["pid"];
   @$cid=$_REQUEST["cid"];
   @$pos_id=$_REQUEST["pos_id"];
   @$kw=$_REQUEST["kw"];
    $has_param=false;
    $sql="select pos_id,pos_name,pos_address,pos_postcode,pos.pos_type_id,pos_type_name,pos_city_name from pos,pos_type,pos_city where ";
   if(!$tid==0&&$cid){
       $sql.="pos.pos_type_id=$tid and pos.pos_city_id=$cid and pos.pos_city_id=pos_city.pos_city_id group by pos_id";
       $has_param=true;
   }else if($tid==0&&$cid){
       $sql.="pos.pos_city_id=$cid and pos.pos_city_id=pos_city.pos_city_id group by pos_id";
       $has_param=true;
   }else if($pos_id){
       $sql.="pos_id=$pos_id and pos.pos_city_id=pos_city.pos_city_id group by pos_id";
       $has_param=true;
   }else if($pid){
       $sql.="pos.pos_pro_id=$pid and pos.pos_city_id=pos_city.pos_city_id group by pos_id";
       $has_param=true;
   }else if($kw){
       $sql.="pos_name like '%$kw%' or pos_address like '%$kw%' and pos.pos_city_id=pos_city.pos_city_id group by pos_id";
       $has_param=true;
   }else{
       $has_param=false;
   }
   $output=[
    "shop"=>[],
    "type"=>"",
    "count"=>0,
    "city"=>""
   ];
   if($tid==0) $output["type"]="专卖店";
   if($tid==1) $output["type"]="旗舰店";
   if($tid==2) $output["type"]="零售店";
   if($has_param==true){
      $result=sql_execute($sql);

      if(count($result)>0){
           $output["city"]=$result[0]["pos_city_name"];
           $output["count"]=count($result);
           $output["shop"]=$result;
           echo json_encode($output);
      }else{
            echo json_encode($output);
      }
   }else{
         echo json_encode($output);
   }
?>