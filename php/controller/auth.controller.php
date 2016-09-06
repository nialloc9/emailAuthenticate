<?php

class Auth{

    //AUTHENTICATE EMAIL REQUEST
    public function verifyEmailRequest($email, $token, $timestamp, $db){
        $stmt = $db->prepare("INSERT INTO `email_auth`(`id`, `token`, `email`, `created_at`, `updated_at`) VALUES ('',:token,:email,:created_at,:updated_at)");

        $stmt->bindParam(':token', $token);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':created_at', $timestamp);
        $stmt->bindParam(':updated_at', $timestamp);

        if($stmt->execute()){
            return true;
        }

        return false;
    }

    //CONFIRM EMAIL SENT MATCHS STORED INFO
    public function verifyEmailRequestConfirmation($email, $token, $db){
        $stmt = $db->prepare("SELECT * FROM `email_auth` WHERE `token`=:token AND `email`=:email");

        $stmt->bindParam(':token', $token);
        $stmt->bindParam(':email', $email);

        if($query = $stmt->execute()){
            $count = $stmt->rowCount();
            if($count>0){
                return true;
            }
        }

        return false;
    }

    //UPDATE EMAIL VALIDATION
    public function verifyEmail($email, $db){
        $stmt = $db->prepare("UPDATE `users` SET `activated` = 1 WHERE email = :email");
        $stmt->bindParam(':email', $email);
        if($query = $stmt->execute()){
            return true;
        }

        return false;
    }

    //VERIFY USERS ACCOUNT IS ACTIVATED
    public function verifyEmailIsActivated($email, $db){
        $stmt = $db->prepare("SELECT `id` FROM users WHERE email = ? AND activated = 1");
        $stmt->bindParam(1, $email);

        $stmt->execute();
        if($stmt->rowCount() > 0){
            return true;
        }

        return false;
    }

    //DELETE EMAIL AUTHENTICATE
    function deleteEmailAuthenticate($email, $db){
        $stmt = $db->prepare("DELETE FROM `email_auth` WHERE `email` = :email");
        $stmt->bindParam(':email', $email);
        if($stmt->execute()){
            return true;
        }

        return false;
    }
}

?>