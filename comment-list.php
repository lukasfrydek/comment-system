<?php

require_once("start.php");

$sql = "SELECT * FROM ".DB_TABLE." ORDER BY parent_id asc, date desc";

$record_set = simpleDB::query($sql);

echo json_encode($record_set);
