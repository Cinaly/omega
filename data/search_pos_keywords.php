<?php
header("Content-Type:application/json");
require("init.php");
@$kw=$_REQUEST["kw"];
$output=[
    "name"=>[],
    "address"=>[],
    "province"=>[],
    "city"=>[]
];
if($kw){
    $sql="select pos_id,pos_name,pos_city_name from pos left join pos_city on pos.pos_city_id=pos_city.pos_city_id where pos_name like '%$kw%' limit 0,3";
    $result=sql_execute($sql);
    $output["name"]=$result;
    $sql="select pos_id,pos_address,pos_postcode,pos_city_name from pos left join pos_city on pos.pos_city_id=pos_city.pos_city_id where pos_address like '%$kw%' limit 0,3";
    $result=sql_execute($sql);
    $output["address"]=$result;
    $sql="select pos_pro_id, pos_pro_name from pos_province where pos_pro_name like '%$kw%'";
    $result=sql_execute($sql);
    $output["province"]=$result;
    $sql="select pos_city_id, pos_city_name from pos_city where pos_city_name like '%$kw%'";
    $result=sql_execute($sql);
    $output["city"]=$result;
    echo json_encode($output);
}
?>