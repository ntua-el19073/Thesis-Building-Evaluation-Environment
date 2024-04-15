import GoogleSignInButton from "./GoogleSignInButton";
import SignInForm from "./SignInForm";
import SignUpButton from "./SignUpButton";
import "../../App.css";

export default function LoginContainer() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <GoogleSignInButton />
        <div className="or-separator">OR</div>
        <SignInForm />
        <div className="signup-link">
          <span>Don't have an account?</span>
          <SignUpButton />
        </div>
      </div>
    </div>
  );
}
