import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProjectManagement from "./pages/ProjectManagement";
import ProjectDetail from "./pages/ProjectDetail";
import MyTasks from "./pages/MyTasks";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<ProjectManagement />} />
        <Route path="*" element={<Login />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/mytask" element={<MyTasks/>} />
      </Routes>
    </Router>
  );
}

export default App;
