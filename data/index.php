<?php
header("Content-Type:application/json");
require_once("init.php");
$output=[
	"floor_one"=>[],
	"floor_two"=>[],
	"floor_three"=>[],
	"floor_four"=>[],
	"floor_five"=>[]
];

//楼层一的数据
$sql="SELECT p_ids FROM index_floor WHERE f_id=1";
$str=intval(sql_execute($sql)[0]["p_ids"]);
$sql="SELECT p_id,p_title,p_img_l FROM products WHERE p_id=$str";
$sql_one="SELECT f_title,f_url,f_content,p_ids FROM index_floor WHERE f_id=1";
$floor_one=sql_execute($sql_one);
Array_push($floor_one,sql_execute($sql)[0]);
$output["floor_one"]=$floor_one;

//楼层二的数据
$sql="SELECT p_ids FROM index_floor WHERE f_id=2";
$str=sql_execute($sql)[0]["p_ids"];
$index=explode(",",$str);
$total=count($index);
$floor_two_proucts=[];

for($i=0;$i<$total;$i++){
$sql="SELECT p_id,p_title,p_img_l FROM products WHERE p_id=".$index[$i];
Array_push($floor_two_proucts,sql_execute($sql)[0]);
}

$sql_tow="SELECT f_title,f_url,f_content,p_ids FROM index_floor WHERE f_id=2";
$floor_two=sql_execute($sql_tow);
Array_push($floor_two,$floor_two_proucts);
$output["floor_two"]=$floor_two;

//楼层三的数据
$sql_three="SELECT f_title,f_url,f_content,p_ids FROM index_floor WHERE f_id=3";
$floor_three=sql_execute($sql_three);
$output["floor_three"]=$floor_three;


//楼层四的数据

$sql="SELECT p_ids FROM index_floor WHERE f_id=4";
$str=sql_execute($sql)[0]["p_ids"];
$index=explode(",",$str);
$total=count($index);
$floor_four_proucts=[];

for($i=0;$i<$total;$i++){
$sql="SELECT p_id,p_title,p_img_l FROM products WHERE p_id=".$index[$i];
Array_push($floor_four_proucts,sql_execute($sql)[0]);
}

$sql_four="SELECT f_title,f_url,f_content,p_ids FROM index_floor WHERE f_id=4";
$floor_four=sql_execute($sql_four);
Array_push($floor_four,$floor_four_proucts);
$output["floor_four"]=$floor_four;

//楼层五的数据
$sql_five="SELECT f_title,f_url,f_content,p_ids FROM index_floor WHERE f_id=5";
$floor_five=sql_execute($sql_five);
$output["floor_five"]=$floor_five;

//var_dump($output);

echo json_encode($output);
