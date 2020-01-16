<?php

// Definitions
define('DATABASE_FILE', 'comments.db');
define('DB_TABLE', 'Comments');
define('FORM_TOKEN_NAME', 'form_comments');

// Load classes
require_once("token.class.php");
require_once("simpledb.class.php");

// Run system functions
simpleDB::connect(DATABASE_FILE);
session_start();
