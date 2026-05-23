import React, { useState } from "react";

const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

function Signup() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
       setValidated(true);
       return;
    }

    setValidated(true);
    //  DEMO ONLY: Hardcoded credentials for showcase purpose
  if (username === "admin" && password === "admin@123") {
    setError("");
    //  Set cookie (accessible to dashboard)
    document.cookie = "isAuth=true; path=/"; 
    //  Redirect to dashboard
    window.location.href = DASHBOARD_URL;
  } else {
    setError("Invalid username or password");
  }
    
  };

  return (
    <div className="container py-5">

      
      <div className="text-center mt-4 mb-5 pb-5">
        <h1 className="fw-bold">
          Open a free demat & trading account online
        </h1>
        <p className="text-muted fs-5 mt-3">
          Start investing brokerage free and join a community of 1.5+ crore
          investors and traders
        </p>
      </div>

      <div className="row align-items-center">

        
        <div className="col-6 text-center">
          <img
            src="media/images/account_open.svg"
            alt="Signup illustration"
            className="img-fluid"
          />
        </div>

        <div className="col-6 px-5">
          <h1 className="mb-2">Login (Demo Access)</h1>
          <p className="text-muted mb-4">
            Try the platform with a demo account. No signup required.
          </p>

          <form
            className={`needs-validation ${validated ? "was-validated" : ""}`}
            noValidate
            onSubmit={handleSubmit}
          >

            
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="valid-feedback">
                Looks good!
              </div>
              <div className="invalid-feedback">
                Please enter a username.
              </div>
            </div>

            
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                required
                minLength="6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="valid-feedback">
                Looks good!
              </div>
              <div className="invalid-feedback">
                Password must be at least 6 characters.
              </div>

              <div
                className="text-muted mt-2"
                style={{ fontSize: "13px" }}
              >
                Demo credentials:  <strong>admin / admin@123</strong>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="alert alert-danger py-2">
                {error}
              </div>
            )}
            
            <button
              className="btn btn-primary w-100 fs-5"
              type="submit"
            >
              Login Now
            </button>
          </form>

          <p
            className="text-muted text-center mt-3"
            style={{ fontSize: "14px" }}
          >
            By signing in, you agree to our terms & privacy policy.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Signup;
