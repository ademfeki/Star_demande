import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import RequestForm from "./pages/RequestForm";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demande/:requestTypeId" element={<RequestForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
