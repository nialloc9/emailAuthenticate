<?php
session_start();

//ERROR REPORTING
/*
error_reporting(0);
@ini_set('display_errors', 0);
*/

require '../utilites/connect.utilites.php';


ob_start();

//CURRENT FILE REFERRER FILE
$currentFile = $_SERVER['SCRIPT_NAME'];
@$httpReferer = $_SERVER['HTTP_REFERER'];
?>