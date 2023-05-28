import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
    </div>
  );
};

const Login = () => {
  const [identityNumber, setIdentityNumber] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        identityNumber,
        userPassword,
      });

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (error) {
      toast.error("תעודת הזהות או הסיסמא שגויים", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleClose = () => {
    setErrorMessage("");
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <Form
        identityNumber={identityNumber}
        setIdentityNumber={setIdentityNumber}
        userPassword={userPassword}
        setUserPassword={setUserPassword}
        label="התחברות"
        onSubmit={onSubmit}
      />
      {errorMessage && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};

const Form = ({
  identityNumber,
  setIdentityNumber,
  userPassword,
  setUserPassword,
  label,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              id="identityNumber"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              placeholder="ת.ז"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="userPassword"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="סיסמא"
            />
          </div>
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            show
          </button>
        </div>
        <button type="submit">{label}</button>
      </form>
    </div>
  );
};
