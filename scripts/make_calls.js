function makeCallUserSignup( callBack = null, firstName, email, password )
{

    let params = {
                  "firstName":firstName,
                  "email":email,
                  "password":password,
                 };

    endpointCall("userSignup", params, function(data)
    {
        if(data["status"] == "success")
        {
            localStorage.setItem("POH_TENANT_TOKEN", data["jwt"]);
            localStorage.setItem("POH_TENANT_PROPERTY_ID", data["propertyId"]);
            localStorage.setItem("POH_TENANT_EMAIL", email);

            return callBack(data)
        }
        else if(data["status"] == "failed")
        {
            alert("failed to sign up, please try again");
        }
    });
}

function makeCallUserLogin( callBack = null, email, password )
{

    let params = {
                  "email":email,
                  "password":password,
                 };

    endpointCall("userLogin", params, function(data)
    {
        if(data["status"] == "success")
        {
            localStorage.setItem("POH_TENANT_TOKEN", data["jwt"]);
            localStorage.setItem("POH_TENANT_PROPERTY_ID", data["propertyId"]);
            localStorage.setItem("POH_TENANT_EMAIL", email);
            return callBack(data)
        }
        else if(data["status"] == "failed")
        {
            alert("Failed to login! Please try Again.");
        }
    });
}

function makeCallUserForgotPassword(callBack = null, email = null)
{
    let params = {
        "email":email,
       };

    endpointCall("userForgotPassword", params, function(data)
    {
        if(data["status"] == "success")
        {
            return callBack(data);
        }
        else if(data["status"] == "failed")
        {
            alert("Failed to send email! Please try Again.");
        }
    });
}

function makeCallUpdateUserPassword(callBack = null, email = null, tmpPassword = null, newPassword = null)
{
    let params = {
        "email":email,
        "tmpPassword":tmpPassword,
        "newPassword":newPassword
       };

    endpointCall("userUpdatePassword", params, function(data)
    {
        if(data["status"] == "success")
        {
            localStorage.setItem("POH_TENANT_TOKEN", data["jwt"]);
            localStorage.setItem("POH_TENANT_PROPERTY_ID", data["propertyId"]);
            localStorage.setItem("POH_TENANT_EMAIL", email);
            return callBack(data);
        }
        else if(data["status"] == "failed")
        {
            alert("Failed to update password! Please try Again.");
        }
    });
}

function makeUserPayment (callBack = null)
{
    let params = {
        "email":localStorage.getItem("POH_TENANT_EMAIL"),
        "propertyId":localStorage.getItem("POH_TENANT_PROPERTY_ID"),
       };

    endpointCall("makePayment", params, function(data)
    {
        if(data["status"] == "success")
        {
            return callBack(data);
        }
        else if(data["status"] == "failed")
        {
            alert("Failed retrieve payment link. Please try again or contact your rent provider.");
        }
    });
}