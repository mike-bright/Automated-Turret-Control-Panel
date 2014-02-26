<?php 
$db = new SQLite3('data/database.db');


//setup settings table
$query = "CREATE TABLE IF NOT EXISTS settings(
	id INT PRIMARY KEY NOT NULL,
	mode INT,
	magazineSize INT,
	sweepRange INT,
	motionDetection INT,
	alarm  INT
	)";
$db->query($query);