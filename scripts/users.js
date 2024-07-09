function hash_password(user_password)
{
    const utf8 = new TextEncoder().encode(user_password);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, '0'))
        .join('');
        return hashHex;
    });
    
}


function checkSignupInputs(firstName, email, password, captcha)
{

    const regex = /^[a-zA-Z0-9\s.,!?@]+$/;

    let captchaValue1 = parseInt(document.getElementById("num1").innerHTML);
    let captchaValue2 = parseInt(document.getElementById("num2").innerHTML);

    if(firstName && email && password && captcha)
    {
        
        if(regex.test(firstName) && regex.test(email) && regex.test(password) && regex.test(captcha))
        {
            if(captcha == (captchaValue1 + captchaValue2))
            {
                return true;
            }else
            {
                alert("Please input correct captcha value");
                return false;
            }
        }
        alert("Please input proper characters");
        return false;
    }else
    {
        alert("Please fill in all input fields");
        return false;
    }
}

function checkLoginInputs(email, password, captcha)
{

    const regex = /^[a-zA-Z0-9\s.,!?@]+$/;

    let captchaValue1 = parseInt(document.getElementById("num1").innerHTML);
    let captchaValue2 = parseInt(document.getElementById("num2").innerHTML);

    if(email && password && captcha)
    {
        
        if(regex.test(email) && regex.test(password) && regex.test(captcha))
        {
            if(captcha == (captchaValue1 + captchaValue2))
            {
                return true;
            }else
            {
                alert("Please input correct captcha value");
                return false;
            }
        }
        alert("Please input proper characters");
        return false;
    }else
    {
        alert("Please fill in all input fields");
        return false;
    }
}

function userSignup()
{

    let firstName = document.getElementById("firstName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let captchaValue = document.getElementById("captchaInput").value;
    
    let validInputs = checkSignupInputs(firstName, email, password, captchaValue)
    

    let hashed_password = ``;
    let i = hash_password(password).then((hex) => hashed_password = hex);
    
    if(validInputs){
        setTimeout(function(){
            makeCallUserSignup(function(data)
            {
                if(data['status'] == "success")
                {
                    location.href = "./home.html";
                }

            }, firstName, email, hashed_password);
        }, 100);
    }


}


function userLogin()
{

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let captchaValue = document.getElementById("captchaInput").value;

    let validInputs = checkLoginInputs(email, password, captchaValue);


    let hashed_password = ``;
    let i = hash_password(password).then((hex) => hashed_password = hex);

    if(validInputs){
        setTimeout(function(){
            makeCallUserLogin(function(data)
            {
                if(data['status'] == "success")
                {
                    if(data['tmpPasswordFlag'] == "TRUE")
                    {
                        location.href = "./updatePassword.html";
                    }else
                    {
                        location.href = "./home.html";
                    }
                    
                }

            }, email, hashed_password);
        }, 100);
    }

}

function userForgotPassword()
{
    let email = document.getElementById("email").value;
    let captchaValue = document.getElementById("captchaInput").value;

    let validInputs = checkLoginInputs(email, "empty", captchaValue);

    if(validInputs){
        setTimeout(function(){
            makeCallUserForgotPassword(function(data)
            {
                if(data['status'] == "success")
                {
                    alert("An email to update your password has been sent to your inbox.");
                    location.href = "./login.html";
                }

            }, email);
        }, 100);
    }
}

function userUpdatePassword()
{
    let email = document.getElementById("email").value;
    let tmpPassword = document.getElementById("tmpPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let captchaValue = document.getElementById("captchaInput").value;

    let validInputs = checkLoginInputs(email, newPassword, captchaValue);

    let hashed_tmp_password = ``;
    let t = hash_password(tmpPassword).then((hex) => hashed_tmp_password = hex);


    let hashed_new_password = ``;
    let n = hash_password(newPassword).then((hex) => hashed_new_password = hex);


    if(validInputs){
        setTimeout(function(){
            makeCallUpdateUserPassword(function(data)
            {
                if(data['status'] == "success")
                {
                    alert("Successfully updated password");
                    location.href = "./home.html";
                }

            }, email, hashed_tmp_password, hashed_new_password);
        }, 100);
    }
}

function verifyUserToken()
{
    if (localStorage.getItem("POH_TENANT_TOKEN"))
    {
        return true;
    }else
    {
        location.href = "./login.html"
    }
}


function makePayment()
{

    document.getElementById("makePaymentButton").disabled = true;

    makeUserPayment(function(data)
    {
        if(data['status'] == "success")
        {
            location.href = data["stripePaymentPortalUrl"];
        }else
        {
            document.getElementById("makePaymentButton").disabled = false;
        }

    });

}

function loadPaymentPortalHome()
{
    if(localStorage.getItem("POH_TENANT_TOKEN"))
    {
        document.getElementById("welcomeText").innerHTML = `Welcome ${localStorage.getItem("POH_TENANT_NAME")} !`;
    }else
    {
        location.href = "./login.html"
    }
}

function logoutUser()
{
    localStorage.removeItem("POH_TENANT_TOKEN");
    localStorage.removeItem("POH_TENANT_PROPERTY_ID");
    localStorage.removeItem("POH_TENANT_EMAIL");
    localStorage.removeItem("POH_TENANT_NAME");   

    location.href = "./logout.html"
}