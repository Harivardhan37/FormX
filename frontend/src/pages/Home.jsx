import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/HomePage/NavBar";
import Hero from "../components/HomePage/Hero";
import Features from "../components/HomePage/Features";
import Cta from "../components/HomePage/Cta";
import Footer from "../components/HomePage/Footer";
import { motion } from "framer-motion";

function Home() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
