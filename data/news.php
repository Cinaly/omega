<?php
header("Content-Type:application/json");
require_once("init.php");
$sql="SELECT * FROM news";
echo json_encode(sql_execute($sql));
?>