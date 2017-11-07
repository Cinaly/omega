<?php
    header("Content-Type:application/json");
    require("init.php");
   @$tid=$_REQUEST["tid"];
   @$cid=$_REQUEST["cid"];
   $output=[
    "total"=>0,
    "qjd"=>0,
    "lsd"=>0
   ];
   $sql="select pos_name,pos_address,pos_postcode,pos.pos_type_id,pos_type_name,pos_city_name from pos,pos_type,pos_city where pos.pos_city_id=$cid and pos.pos_city_id=pos_city.pos_city_id group by pos_id";
   $result=sql_execute($sql);
   $qjd=0;$lsd=0;
   for($i=0;$i<count($result);$i++){
    if($result[$i]["pos_type_id"]==1) $qjd++;
    else if($result[$i]["pos_type_id"]==2) $lsd++;
   }
   $output["qjd"]=$qjd;
   $output["lsd"]=$lsd;
   $output["total"]=count($result);
   echo json_encode($output);

?>