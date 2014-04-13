<?php
class SocketHandler {
  function __construct(){
  }

  function post(){
    require_once('models/socketModel.php');
    $socket = new socketModel($_POST['host'], 1337);
    if(array_key_exists('message', $_POST)){
      $response = $socket->sendMessage($_POST['message']);
      echo $response;
    }
    return;
  }
}
