<?php
class settingsModel {

	function __construct() {
		$db = new SQLite3('data/database.db');
		if(!isset($db))
			include_once('sqliteInit.php');
	}

	public function updateSettings($settings){
		$db = new SQLite3('data/database.db');
		$mode = (int)$settings['mode'];
		$magazineSize = (int)$settings['magazineSize'];
		$sweepRange = (int)$settings['sweepRange'];
		$autoBurst = (int)$settings['autoBurst'];
		$manualBurst = (int)$settings['manualBurst'];
		$pusherSetPoint = (int)$settings['pusherSetPoint'];
		$motionDetection = (array_key_exists('motionDetection', $settings)) ? 1 : 0;
		$alarm = (array_key_exists('alarm', $settings)) ? 1 : 0;

		$query = "REPLACE INTO settings
						   (id, mode, magazineSize, sweepRange, motionDetection, alarm, manualBurst, autoBurst, pusherSetPoint)
					VALUES (1, $mode, $magazineSize, $sweepRange, $motionDetection, $alarm, $manualBurst, $autoBurst, $pusherSetPoint)";
					echo $query;
		$db->query($query);
		//send settings to device
	}

	public function updateSetting(){

	}

	public function fetchAllSettings(){
		$db = new SQLite3('data/database.db');
		$query = "SELECT * FROM settings";
		$result = $db->query($query);
		return $result->fetchArray(SQLITE3_ASSOC);
	}

	public function getSetting($settingName = false){
		if(!$settingName)
			throw new Exception("Error fetching setting!", 1);
		$query = "SELECT $settingName FROM settings";
		$result = $db->query($query);
		return sqlite_fetch_single($result);
	}
}
