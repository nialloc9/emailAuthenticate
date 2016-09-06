
//EMAIL AUTHENTICATE
function emailAuthenticate(pathToSendEmailAuth, email, timestamp, callBackFunction){

    //data check
    if(pathToSendEmailAuth.length > 0 && email.length > 0){

        //data check
        if(email.length > 0){

            $.post(
                pathToSendEmailAuth,
                {
                    task: 'sendEmailAuth',
                    email: email,
                    timestamp: timestamp
                }
            ).
                error(function(){
                    console.log("ERROR: http emailAuth failure.");
                }).
                success(function(data){
                    console.log("SUCCESS: http emailAuth success.");

                    if(callBackFunction != ''){
                        callBackFunction(data);
                    }
                })
        }else{
            console.log("ERROR: email not set.");
        }
    }else{
        console.log("ERROR: emailAuthenticate() param not set.");
    }
}

//CHECK EMAIL AUTHENTICATE
function checkEmailAuthenticate(pathToSendEmailAuth, token, email, callBackFunction){
    $.get(
        pathToSendEmailAuth,
        {
            task: 'checkEmailAuthenticate',
            token: token,
            email: email
        }
    ).
        error(function(){
            console.log('ERROR: checkEmailAuthenticate http failure..');
        }).success(function(data){
            console.log('SUCCESS: checkEmailAuthenticate http success..');

            if(callBackFunction != ''){
                callBackFunction(data, email, pathToSendEmailAuth);
            }
        });
}

//DELETE EMAIL AUTHENTICATE
function deleteEmailAuthenticate(pathToSendEmailAuth, email){


    //data check
    if(email.length >0){

        //http
        $.get(
            pathToSendEmailAuth,
            {
                task: 'deleteEmailAuthenticate',
                email: email
            }
        ).
            error(function(){
                console.log("ERROR: deleteEmailAuthenticate() http failure..");
            }).
            success(function(){
                console.log("SUCCESS: deleteEmailAuthenticate() http success..");
            })
    }else{
        console.log("ERROR: email not set..");
    }
}

//CHECK IF USER IS AUTHENTICATED AND EMAIL ACTIVATED
function checkUserIsAuthenticated(pathToSendEmailAuth, email, callBackFunctionName){
    $.get(
        pathToSendEmailAuth,
        {
            task: 'checkUserIsAuthenticated',
            email: email
        }
    ).
        error(function(){
            console.log("ERROR: checkUserIsAuthenticated() http failure.");
        }).
        success(function(data){
            console.log("SUCCESS: checkUserIsAuthenticated() http success.. calling callback function if set..");

            if(callBackFunctionName != ''){
                callBackFunctionName(data, email);
            }
        });
}