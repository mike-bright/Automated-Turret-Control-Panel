<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
set_include_path('/var/www/');
include_once('components/Toro.php');  //router

//fetch all handlers
foreach (glob("handlers/*.php") as $filename)
{
    include_once $filename;
}

Toro::serve(array(
    "/" => "IndexHandler",
    "/socket" => "SocketHandler"
));
