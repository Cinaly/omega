<?php
    header("Content-Type:application/json");
    require_once("init.php");
    @$sc_id=$_REQUEST["sc_id"];
    $sql="SELECT * FROM category_list WHERE sc_id=$sc_id";
    echo json_encode(sql_execute($sql));
?>