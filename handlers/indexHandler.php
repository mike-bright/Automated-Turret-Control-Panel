<?php 

class IndexHandler {
	function get(){
		include_once('models/settingsModel.php');
		$settingsModel = new settingsModel();
		$settings = $settingsModel->fetchAllSettings();
		include_once('view/index.php');
	}
	function post(){
		include_once('models/settingsModel.php');
		$settingsModel = new settingsModel();
		$settings = $settingsModel->fetchAllSettings();
		include_once('view/indexAjax.php');
	}
}