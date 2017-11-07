<?php
header("Content-Type:application/json");
require_once("init.php");
$output=[
  "count"=>0,
  "pageSize"=>6,
  "pageCount"=>0,
  "pageNo"=>0,
  "data"=>[]
];
@$kw=$_REQUEST["kw"];
@$pno=$_REQUEST["pno"];
if(!$pno){
    $pno=0;
}
$sql="SELECT p_id,p_name,p_code,p_title,p_price,p_img_m FROM products ";
if($kw){
  $kws=explode(" ",$kw);//js:split
  for($i=0;$i<count($kws);$i++){
    $kws[$i]=" p_name like '%".$kws[$i]."%'";
  }
  $where=" where ".implode(" and ",$kws);
  $sql=$sql.$where;
}  
$output["count"]=count(sql_execute($sql));
$sql=$sql." limit ".($pno*$output["pageSize"])." ,".$output["pageSize"];
$result=sql_execute($sql);
$output["pageCount"]=
  ceil($output["count"]/$output["pageSize"]);
$output["pageNo"]=$pno;
$output["data"]=$result;
echo json_encode($output);