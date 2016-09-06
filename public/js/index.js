$(document).ready(function(){

    //UPDATE TIME EVERY 5 SECONDS
    $(document).ready(function(){
        get_time('timestamp');
        setInterval(function(){
            get_time('timestamp');
        },5000);
    });

    $('#emailBtn').click(function(){

        //assign variables
        var email = $('#userInput').val();
        var timestamp = $('#timestamp').val();

        //authenticate email.. function from lib/emailAuthenticate.js
        emailAuthenticate('php/auth/sendEmailAuth.auth.php', email, timestamp, handleData);
    });

});

//handle emailAuthenticate function return data
function handleData(data){
    if(data == 1){
        console.log("SUCCESS: email sent.");
        return true;
    }else if(data == 2){
        console.log("ERROR: Auth::verifyEmailRequest failure.");
        return false;
    }else if(data == 3){
        console.log("ERROR: email not set.");
        return false;
    }
}