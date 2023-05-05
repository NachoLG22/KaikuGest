import React from "react";
import UsersLogin from '../componets/users/UsersLogin'
import PageLayout from "../componets/layout/PageLayout";

import { Link } from "react-router-dom";

import logo from "../assets/img/Logo.jpg";

function LoginPage() {
  return (
    <PageLayout title="Login to your account">
      <div className="row justify-content-center">
        <div className="col-12 col-md-4">
          <div className="max-auto mb-3 text-center">
            <img
              src={logo}
              alt="Iron Projects"
              className="img-fluid"
              style={{ maxHeight: "130px" }}
            />
          </div>
          <UsersLogin />
          <hr />
          <p className="m-0 text-muted">
            Don't have an account yet?{" "}
            <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}

export default LoginPage;
