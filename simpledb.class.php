<?php

class simpleDB {
	
	private static $pdo = null;
	private static $stmt = null;

	public static function connect($database) {
		try {
			self::$pdo = new PDO("sqlite:".$database);
			self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			self::$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
		} catch(Exception $e) {
			var_dump($e);
			exit;
		}
	}

	public static function query($sql, $params = []) {
		self::$stmt = self::$pdo->prepare($sql);
		self::$stmt->execute($params);

		return self::result();
	}

	public static function result() {
		return self::$stmt->fetchAll();
	}
}
