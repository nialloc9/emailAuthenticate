<?php
try {
    $db = new PDO('mysql:host=localhost;dbname=igoalo5_igoalo;charset=utf8','root','');

}
catch(Exception $e){
    echo "Could not connect.";
}
?>