<?php

class token {

	private const TOKEN_SUFIX = '_token';
	
	public static function generate($form) {
		// generate a token from an unique value
		$token = md5( uniqid(microtime(), true) );
		
		// Write the generated token to the session variable to check it against the hidden field when the form is sent
		$_SESSION[ $form . self::TOKEN_SUFIX ] = $token; 
		
		return $token;
	}
	
	public static function verify($form, $input) {
		$token = $_SESSION[ $form . self::TOKEN_SUFIX ];
		
		// check if a session is started and a token is transmitted, if not return an error
		if(!isset($token)) return false;
		
		// check if the form is sent with token in it
		if(!isset($input)) return false;
		
		// compare the tokens against each other if they are still the same
		if ($token !== $input) return false;
		
		return true;
	}
	
	public static function remove($form) {
		unset($_SESSION[ $form . self::TOKEN_SUFIX ]);
	}
}
