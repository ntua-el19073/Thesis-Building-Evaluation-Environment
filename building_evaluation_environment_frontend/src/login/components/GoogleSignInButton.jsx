import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../LoginPage.css"

export default function GoogleSignInButton() {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Get user info from Google userinfo endpoint
        const userInfoResponse = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        // Extract email from userinfo response
        const userEmail = userInfoResponse.data.email;
        const userName = userInfoResponse.data.name;

        console.log(userInfoResponse);
        console.log(userEmail);
        console.log(userName);
        // Make a POST request to your API endpoint
        try {
          const apiResponse = await axios.post(
            //"http://localhost:8080/beeapp/api/test",
            "http://localhost:8080/beeapp/api/users/google-signin",
            {
              //access_token: response.access_token,
              email: userEmail,
              username: userName,
            }
          );
          console.log(apiResponse);

          const decodedToken = jwtDecode(apiResponse.data.token);
          console.log(decodedToken);

          localStorage.setItem("token", apiResponse.data.token);
          localStorage.setItem("email", decodedToken.email);
          localStorage.setItem("username", decodedToken.username);

          navigate("/main-menu");
          // Handle successful response from your API
        } catch (apiError) {
          console.error("Error calling local API:", apiError);
          // Handle error from local API
        }
      } catch (googleApiError) {
        console.error("Error calling Google API:", googleApiError);
        // Handle error from Google API
      }
    },
  });
  return (
    <button className="google-signin" onClick={() => login()}>
      Sign in with Google
    </button>
  );
}
