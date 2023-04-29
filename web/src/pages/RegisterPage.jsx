import React from "react";
import UsersForm from "../componets/users/UsersForm";
import PageLayout from "../componets/layout/PageLayout";

import logo from "../assets/img/Logo.jpg";

function RegisterPage() {
  return (
    <PageLayout title="Sign up">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="max-auto mb-3 text-center">
            <img
              src={logo}
              alt="Kaiku Gest"
              className="img-fluid"
              style={{ maxHeight: "130px" }}
            />
          </div>
          <UsersForm />
          <hr />
          <p className="m-0 text-muted">Already registered? just</p>
        </div>
      </div>
    </PageLayout>
  );
}

export default RegisterPage;
