<?php
class SocketHandler(){
  function __construct(){
  }

  function post($command){
    require_once('../models/socketModel.php');
    $socket = new socketModel($command['host'], 1337);
    if(array_key_exists('message', $command))
      $response = $socket->writeMessage($command['message']);
    echo $response;
  }
}
