import { motion } from "framer-motion";
import Generate from "./CreateForm/Generate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import BarLoader from "./BarLoader";
import FormCards from "./DashBoardHome/FormCards";
import Responses from "./FormAnalytics/Responses";
import TemplateCards from "./Templates/TemplateCards";

const BASE_URL = import.meta.env.VITE_BACKEND_API + "/api";

function Templates({ setToggle }) {
  const [getting, setGetting] = useState(false);
  const [templates, setTemplates] = useState([]);
  useEffect(() => {
    const getForms = async () => {
      try {
        setGetting(true);
        const res = await axios.get(`${BASE_URL}/form/get-templates`);
        setTemplates(res.data.data);
        console.log(res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setGetting(false);
      }
    };
    getForms();
  }, []);
  if (getting)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <BarLoader />
      </div>
    );
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 md:p-8 flex flex-col bg-background min-h-screen"
      >
        <div className="mb-8 flex flex-row justify-between">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">
              Templates
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover templates designed to save time, spark ideas, and
              simplify form creation.
            </p>
          </div>
        </div>
        <div>
          <TemplateCards
            templates={templates}
            setTemplates={setTemplates}
            setToggle={setToggle}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Templates;
