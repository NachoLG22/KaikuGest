import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./componets/navbar/Navbar";
import Footer from "./componets/footer/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AuthStore from "./contexts/AuthStore";
import ProjectsPage from "./pages/ProjectsPage";
import UserPage from "./pages/UserPage";
import PrivateRoute from "./guards/PrivaRoute";
import ProjectPage from "./pages/ProjectPage";
import "./index.css";
import CreateBudgetPage from "./pages/CreateBudgetPage";
import CreateProjectPage from "./pages/CreateProjectPage";

function App() {
  return (
    <>
      <AuthStore>
        <div className="flex flex-col min-h-screen ">
          <div className="flex-grow flex">
            <div className="w-1/7">
              <Navbar />
            </div>
            <div className="w-6/7 w-full">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/projects"
                  element={
                    <PrivateRoute>
                      <ProjectsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/create-project"
                  element={
                    <PrivateRoute>
                      <CreateProjectPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/projects/:projectId/budget"
                  element={
                    <PrivateRoute>
                      <CreateBudgetPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/projects/:projectId"
                  element={
                    <PrivateRoute>
                      <ProjectPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <UserPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </div>
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </AuthStore>
    </>
  );
}

export default App;
