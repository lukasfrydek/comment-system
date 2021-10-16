<?php
require_once('start.php');

$lang = [
	'title' => 'Comment System using PHP and Ajax',
	'new-comment' => 'New Comment',
	'add-comment' => 'Add Comment',
	'name' => 'Name',
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">

	<title><?= $lang['title']?></title>
	
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<h1><?= $lang['title']?></h1>
	<div class="comment-form-container">
		<form id="frm-comment">
			<div class="input-row">
				<textarea class="input-field input-area" type="text" name="comment" id="comment" placeholder="<?= $lang['new-comment']?>"></textarea>
			</div>
			<div class="input-row">
				<input type="hidden" name="token" value="<?= token::generate(FORM_TOKEN_NAME); ?>">
				<input type="hidden" name="comment_id" id="commentId">
				<input class="input-field" type="text" name="name" id="name" placeholder="<?= $lang['name']?>">
			</div>
			<div>
				<input type="submit" class="btn-submit" value="<?= $lang['add-comment']?>">
				<div id="comment-message"></div>
			</div>
		</form>
	</div>
	<div id="output"></div>
	
	<script src="element.js"></script>
	<script src="custom.js"></script>
</body>
</html>
