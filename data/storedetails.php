<?php
    header("Content-Type:application/json");
    require("init.php");
    @$pos_id=$_REQUEST["pos_id"];
    $output=[
        "info"=>[],
        "sale_type"=>[]
    ];
    if($pos_id){
        $sql="select pos_name,pos_address,pos_postcode,pos_city_name,pos_connect,pos_business,pos_longtitude,pos_attitude,sale_type from pos inner join pos_city on pos.pos_city_id=pos_city.pos_city_id where pos_id=$pos_id";
        $result=sql_execute($sql);
        $output["info"]=$result[0];
        $sale_types=split(",",$result[0]["sale_type"]);
        for($i=0;$i<count($sale_types);$i++){
            $sale_type_id=$sale_types[$i];
            $sql="select sale_type_name,sale_type_img from pos_sale_type where sale_type_id=$sale_type_id";
            $sale_type=sql_execute($sql)[0];
            array_push($output["sale_type"],$sale_type);
        }
        echo json_encode($output);
    }else{
        echo "[]";
    }
?>