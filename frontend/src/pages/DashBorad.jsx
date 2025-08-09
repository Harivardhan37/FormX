import { useEffect, useState } from "react";
import CreateForm from "../components/CreateForm";
import DashBoardHome from "../components/DashBoardHome";
import SideBar from "../components/SideBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Cookies from "js-cookie";
import BarLoader from "../components/BarLoader";
import NotFound from "../components/NotFound";
import Templates from "../components/Templates";

function DashBorad() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(null);
  const [toggleCookie, setToggle] = useState(false);
  const empty = {
    title: "Untitled",
    description: "Undescribed",
    theme: "default",
    fields: [],
  };
  const [getting, setGetting] = useState(false);
  useEffect(() => {
    setGetting(true);
    try {
      const draft = Cookies.get("form-fields");
      console.log(draft);
      if (draft) setFormFields(JSON.parse(draft));
      else setFormFields(empty);
    } catch (err) {
      console.error("Error parsing cookie:", err);
      setFormFields(empty);
    }
    setGetting(false);
  }, [toggleCookie]);

  if (getting)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <BarLoader />
      </div>
    );

  console.log(formFields);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  if (!user) return null;

  return (
    <div className="flex h-screen">
      <SideBar setFormFields={setFormFields}/>
      <main className="flex-1 overflow-y-auto mt-16 md:mt-0">
        <Routes>
          <Route
            path="/"
            element={<DashBoardHome setFormFields={setFormFields} />}
          />
          <Route
            path="/create"
            element={<CreateForm formFieldsDash={formFields} />}
          />
          <Route path="/templates" element={<Templates setToggle={setToggle}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default DashBorad;
