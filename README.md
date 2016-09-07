# emailAuthenticate
This is a project to create an email authentication system that will send the user an email with a link. This link includes a token that will be used to authenticate that the email address matches that of the one the user inputted. The project is designed so the code can be re-used however unlike previous projects where a simple function call is used the code does need to be changed due to database column differances between the database used for the project here and the one any other user will use.

## index.html

*Instructions:*

1. Make sure jQuery is available to use in your project.
2. Include the public/lib/emailAuthenticate.js in your index file.
3. Include the files php/utilities/connect.utilities.php and php/utilities/core.utilities.php
4. Include the php file php/controller/auth.controller.php in your project. (You need to change the column and table names in the class to match your database structure.)
5. Include the php file php/auth/sendEmailAuth.auth.php in your project.
6. Change the path to php/utilities/connect.utilities.php and php/utilities/core.utilities.php in php/auth/sendEmailAuth.auth.php
7. Call the following function when you want to send email to user to activate email.

        emailAuthenticate(pathToSendEmailAuth, email, timestamp, callBackFunction)
        

*Function emailAuthenticate Parameters:*

pathToSendEmailAuth: Path to php/auth/sendEmailAuth.auth.php.

email: The email to send email to.

timestamp: Current timestamp. (Feel free to use time.js. Instructions on how to use can be found here: https://github.com/nialloc9/inputTimestamp)

callBackFunction: An optional callback function to handle the differant return codes. ie. 

1 == Success 

2 == Function verifyEmailRequest in file Auth class returned false.

3 == No email param passed to emailAuthenticate().

Example below:

        //handle emailAuthenticate function return data
        function handleData(data){
            if(data == 1){
                console.log("SUCCESS: email sent.");
            }else if(data == 2){
                console.log("ERROR: Auth::verifyEmailRequest failure.");
            }else if(data == 3){
                console.log("ERROR: email not set.");
            }
        }

8 Change "http://localhost/projects/emailAuthenticate/emailValidate.html" '$link = "http://localhost/projects/emailAuthenticate/emailValidate.html?t=".urlencode($emailToken)."&e=".$email;' line in 
php/auth/sendEmailAuth.auth.php to the path to your emailAuthenticate file. (NB: Do not replace any of the rest of the link.)

## emailValidate.html  (Make sure to do index.html steps first)
1. Make sure jQuery is available to use in emailValidate.html.
2. Make sure public/jsGetUrlParam.js is available to use in emailValidate.html.
3. Include the public/lib/emailAuthenticate.js in your emailValidate.html file.
4. Get the url variables but calling the function:

            var urlVars = getUrlVars(); //grabs the variables from the url and stores them in an array

            //assign variables
            var token = urlVars['t'];
            var email = urlVars['e'];

5. When the emailValidate.html file loads call checkEmailAuthenticate(pathToSendEmailAuth, token, email, callBackFunction). This updates the user to activated = 1 where the email matches a user.

*Function checkEmailAuthenticate Parameters*

pathToSendEmailAuth: Path to php/auth/sendEmailAuth.auth.php.

token: The token from the url

email: The email to send email to.

callBackFunction: optional callback function to handle the codes returned from checkEmailAuthenticate()

1 == Success 

2 == Function verifyEmail in file Auth class returned false.

3 == Function verifyEmailRequestConfirmation in file Auth class returned false.

4 == Email param passed from emailAuthenticate(pathToSendEmailAuth, email, timestamp, callBackFunction) is empty

5 == User actived column was updated to 1 but the email and token details were not deleted from the email_auth were not removed. (This is housekeeping and all functions will still work if this fails.)

*Example below:*

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

6 To check if the user has been authenticated call checkUserIsAuthenticated(pathToSendEmailAuth, email, callBackFunctionName) anywhere you want.

*Function checkUserIsAuthenticated Parameters*

pathToSendEmailAuth: Path to php/auth/sendEmailAuth.auth.php.

email: The email you want to check is authenticated.

callBackFunction: optional callback function to handle the codes returned from checkUserIsAuthenticated()

1 == Success. Email has been activated.

2 == Error. Email has not been activated.

*Example below:*

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

## NB
Please feel free to add suggestions and ideas to make this project better.

Remember to change your php.ini file and your sendMail file to allow for emails to be sent.

Remove console.log messages if you wish to use on production sites.
