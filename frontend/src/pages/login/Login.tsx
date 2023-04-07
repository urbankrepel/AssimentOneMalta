import React from "react";
import "./Login.css";
import fetchLogin from "../../api/login";
import useAlert from "../../hooks/useAlert";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
  reload: () => void;
}

const Login = ({ reload }: Props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { show } = useAlert();
  const navigation = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginPromise = fetchLogin(email, password);
    const response: any = await show(
      loginPromise,
      "Logging in...",
      "Logged in successfully!"
    );
    if (response.status === 200) {
      reload();
    }
  };

  return (
    <div className="loginPage">
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <form
                    className="mb-md-5 mt-md-4 pb-5"
                    onSubmit={handleSubmit}
                  >
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your email and password!
                    </p>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <label className="form-label" htmlFor="typeEmailX">
                        Email
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      <label className="form-label" htmlFor="typePasswordX">
                        Password
                      </label>
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white">
                        <i className="fab fa-facebook-f fa-lg"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-google fa-lg"></i>
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
