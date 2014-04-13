<?php
class socketModel {
  function __construct($host, $socket) {
    $this->client = stream_socket_client("tcp://$host:$socket", $errno, $errorMessage);
    // if(!$this->client)
      // throw new exception("Failed to connect to client!");
  }

  public function sendMessage($message, $close = false) {
    // $escapedMessage = str_replace('"', '\"', $message);
    fwrite($this->client, $message);
    usleep(120000);
    $response = stream_get_contents($this->client);
    if($close)
      fclose($this->client);
    return $response;
  }

}
