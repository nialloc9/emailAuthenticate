$(document).ready(function(){

    var urlVars = getUrlVars();

    //assign variables
    var token = urlVars['t'];
    var email = urlVars['e'];

    checkEmailAuthenticate('php/auth/sendEmailAuth.auth.php', token, email, checkEmailAuthenticateHandleData);

    $('#userInputBtn').click(function(){

        //get user email entered
        var email = $('#userInput').val();

        if(email.length > 0){

            checkUserIsAuthenticated('php/auth/sendEmailAuth.auth.php', email, checkUserIsAuthenticatedHandleData);

        }else{
            console.log("ERROR: user input: `email` not set..");
        }
    });


});

//handle checkUserIsAuthenticatedHandleData function return data
function checkUserIsAuthenticatedHandleData(data, email){
    if(data == 1){
        console.log("SUCCESS: user with email: " + email + " is activated and email authenticated..");
        $('#info').text(email + " is authenticated and active.");
    }else if(data == 2){
        console.log("ERROR: user with email: " + email + " is NOT activated and email is NOT authenticated..");
        $('#info').text(email + " is NOT authenticated and active.");
    }
}

//handle emailAuthenticate function return data
function checkEmailAuthenticateHandleData(data){
    if(data == 1){
        console.log("SUCCESS: email confirmed and removed from db for email check.");
        $('#info').text("Congratulations your account is now activated for SSSA.");
    }else if(data == 2){
        console.log("ERROR: Auth::Auth::verifyEmail failure.");
    }else if(data == 3){
        console.log("ERROR: Auth::verifyEmailRequestConfirmation failure.");
    }else if(data == 4){
        console.log("ERROR: email or token not set.");
    }else if(data == 5){
        console.log("ERROR: email was autheticated but not removed.");
    }
}
