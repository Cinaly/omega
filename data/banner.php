<?php
header("Content-Type:application/json");
require_once("init.php");
$sql="SELECT * FROM index_banner";
echo json_encode(sql_execute($sql));
?>