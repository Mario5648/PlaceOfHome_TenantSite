
var ERROR_FLAG = "ERROR";

var userSignupEndPoint = "http://127.0.0.1:5000/signup";
var userLoginEndPoint = "http://127.0.0.1:5000/login";
var userForgotPasswordEndPoint = "http://127.0.0.1:5000/forgot";
var userUpdatePasswordEndPoint = "http://127.0.0.1:5000/updatePasswordWithTemp";

function endpointCall(endpoint=null, params={}, callBack=null)
{
    let endpointLink = identifyEndPoint(endpoint);
    const Http = new XMLHttpRequest();
    var params = JSON.stringify(params);
    Http.open( "POST", endpointLink );
    Http.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    Http.send(params);
    Http.onreadystatechange = ( e ) => 
    {
        //If the request was successful then populate everything
        if (Http.readyState == 4 && Http.status == 200) 
        {
            //parse the response from power automate to make it readable for the functions
            callBack(JSON.parse( Http.responseText ));
            
        }else
        {
            callBack(ERROR_FLAG);
        }
    }
}

function identifyEndPoint(endpoint=null)
{
    switch(endpoint)
    {
        case "userSignup":
            return userSignupEndPoint;
        case "userLogin":
            return userLoginEndPoint;
        case "userForgotPassword":
            return userForgotPasswordEndPoint;
        case "userUpdatePassword":
            return userUpdatePasswordEndPoint;
    }
}