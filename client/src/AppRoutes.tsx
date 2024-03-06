import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layoutes/Layout";
import Home from "./pages/Home";
import CreateSchool from "./pages/CreateSchool";
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route path="/create" element={<CreateSchool></CreateSchool>} />
      <Route path="/update" element={<span>update</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRoutes;
