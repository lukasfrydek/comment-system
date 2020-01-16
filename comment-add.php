<?php

require_once("start.php");

// $commentId = isset($_POST['comment_id']) ? $_POST['comment_id'] : "";
// $comment = isset($_POST['comment']) ? $_POST['comment'] : "";
// $commentSenderName = isset($_POST['name']) ? $_POST['name'] : "";
// $date = date('Y-m-d H:i:s');

// Token Verify
if(!token::verify(FORM_TOKEN_NAME, $_POST['token']) || (empty($_POST['comment']) || empty($_POST['name'])) ) {
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
	exit(json_encode([
		"message" => "error"
	]));
}

$sql_params = [
	':parent' => $_POST['comment_id'],
	':comment' => $_POST['comment'],
	':sender' => $_POST['name'],
	':date' => date('Y-m-d H:i:s')
];

$sql = "INSERT INTO ".DB_TABLE." (parent_id, comment, name, date) VALUES (:parent, :comment, :sender, :date)";

echo simpleDB::query($sql, $sql_params);
