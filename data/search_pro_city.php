<?php
    header("Content-Type:application/json");
    require("init.php");
 @  $pos_pro_id=$_REQUEST["pos_pro_id"];
 @  $pos_pro_name=$_REQUEST["pos_pro_name"];
 @  $pos_city_name=$_REQUEST["pos_city_name"];
    if(!$pos_pro_id&&!$pos_pro_name){
        $sql="select * from pos_province";
        $result=sql_execute($sql);
        echo json_encode($result);
    }else if($pos_pro_id){
        $sql="select * from pos_city where pos_pro_id=$pos_pro_id";
        $result=sql_execute($sql);
        echo json_encode($result);
    }else if($pos_pro_name){
        $sql="select * from pos_province where pos_pro_name='$pos_pro_name'";
        $result=sql_execute($sql);
        echo json_encode($result);
    }else if($pos_city_name){
         $sql="select * from pos_city where pos_city_name='$pos_city_name'";
         $result=sql_execute($sql);
         echo json_encode($result);
    }
?>