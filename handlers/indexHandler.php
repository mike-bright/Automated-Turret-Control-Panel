<?php 

class IndexHandler {
	function get(){
		include_once('view/index.php');
	}
	function post(){
		include_once('view/indexAjax.php');
	}
}