<?php
require_once '../utilites/connect.utilites.php';
require_once '../controller/auth.controller.php';


//sendEmailAuth task check
if(isset($_POST['task']) && $_POST['task'] == 'sendEmailAuth'){

    $email = $_POST['email'];
    $timestamp = $_POST['timestamp'];

    sendEmail($email, $timestamp, $db);
}

//checkEmailAuthenticate task check
if(isset($_GET['task']) && $_GET['task'] == 'checkEmailAuthenticate'){
    $email = $_GET['email'];
    $emailToken = $_GET['token'];

    $token = urldecode($emailToken);

    checkEmailAndToken($email, $token, $db);
}

//checkUserIsAuthenticated task check
if(isset($_GET['task']) && $_GET['task'] == 'checkUserIsAuthenticated'){

    $email = $_GET['email'];

    if(Auth::verifyEmailIsActivated($email, $db)){
        echo 1;
    }else{
        echo 2;
    }
}

//sendEmail function
function sendEmail($email, $timestamp, $db){
    //variable check
    if(isset($email) && !empty($email)){

        //create emailToken
        $emailToken = base64_encode(openssl_random_pseudo_bytes(32));

        //addVerifyEmailRequestToDb
        if(Auth::verifyEmailRequest($email, $emailToken, $timestamp, $db)){

            //headers
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

            // More headers
            $headers .= 'From: noreply@igoalo.com' . "\r\n";
            $headers .= "X-MSMail-Priority: High\r\n";

            $subject = "SSSA email verification request.";

            $to = "Dear user";
            $body = "<br><br>sssa.com email verification request. Please folow the link below to verify your account: <br><br>";
            $link = "http://localhost/projects/emailAuthenticate/emailValidate.html?t=".urlencode($emailToken)."&e=".$email;

            $from = "<br><br>The SSSA team";
            $tag = "<br><br>Super Simple Super Awesome.\n\n".$from;

            //construct message
            $message = $to.$body.$link.$tag;


            //send
            if(mail($email,$subject,$message,$headers)){ echo 1;} //success
        }else{ echo 2;} //Auth::verifyEmailRequest failure
    }else{ echo 3;} //email not set
}

//checkEmail function
function checkEmailAndToken($email, $token, $db){
    //variable check
    if(isset($email, $token) && !empty($email) && !empty($token)){

        //verify data matches db data
        if(Auth::verifyEmailRequestConfirmation($email, $token, $db)){

            //update db to add 1 to user table colum activate
            if(Auth::verifyEmail($email, $db)){

                //delete data from email_auth table
                if(Auth::deleteEmailAuthenticate($email, $db)){
                    //deleted from db
                    echo 1;
                }else{
                    //unable to delete from db
                    echo 5;
                }

            } //success
            else{ echo 2; } //Auth::verifyEmail($email, $db) fail
        }else{ echo 3; } //Auth::verifyEmailRequestConfirmation($email, $token, $db) fail
    }else{ echo 4; } //email or token not set

}
?>