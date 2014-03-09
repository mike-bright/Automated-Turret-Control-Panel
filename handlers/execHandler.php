<?php

class execHandler {
	function post($action) {
		switch ($action) {
			case 'start':
				startProcess($_REQUEST['command']);
				break;
			
			case 'run':
				runProcess($_REQUEST['command']);
				break;

			case 'status':
				getStatus($_REQUEST['pid']);
				break;

			default:
				# code...
				break;
		}

	}

	//used for starting a process and checking the status later
	//echos a PID for status tracking
	function startProcess($command) {
		$command = 'nohup '.$command.' > /dev/null 2>&1 & echo $!';
        exec($command, $op);
        echo (int)$op[0];	//pid
	}

	//used for running a process that returns results immediately
	//echos process' output
	function runProcess($command) {
        exec($command, $op);
        echo json_encode($op);
	}

	//echos process status
	function getStatus($pid) {
		$command = 'ps -p '.$pid;
        exec($command,$op);
        if (!isset($op[1]))
        	echo "stopped";
        else 
        	echo "running";
	}

	function stopProcess($pid) {
		$command = 'kill '.$pid;
        exec($command);
        if ($this->status() == false)
        	echo "stopped";
        else
        	echo "error";
	}
}