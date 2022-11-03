import React from 'react'
import GoogleLogin from 'react-google-login';

function GoogleButton(props) {
    const {onSuccess, onFailure} = props
   
    return (
        <div>
            <GoogleLogin
                clientId="287129342879-e80960vamh3h50ueahml77sq3jog9n60.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleButton