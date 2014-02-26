<?php
set_include_path('.:/Applications/MAMP/htdocs/');
include_once('components/toro.php');  //router
include_once('models/sqliteInit.php'); //database initializor

//fetch all handlers
foreach (glob("handlers/*.php") as $filename)
{
    include_once $filename;
}

Toro::serve(array(
    "/" => "IndexHandler",
    "/log/:alpha" => "LogHandler",
    "/settings" => "SettingsHandler",
    "/settings/update" => "SettingsUpdateHandler",
    "/settings/get" => "SettingsGetHandler",
    "/settings/form" => "SettingsFormHandler",
    "/debug" => "DebugHandler",
    "/exec/:alpha" => "ExecHandler"
));