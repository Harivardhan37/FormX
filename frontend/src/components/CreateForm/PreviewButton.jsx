import { useState } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

function PreviewButton() {
  const [show, setShow] = useState(false);
  return (
    <Link to="/preview">
      <Button
        className="shadow-2xl z-50 cursor-pointer flex items-center"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <Eye className="h-10 w-10" />
        {show && (
          <motion.h2 transition={{ duration: 0.2, ease: "easeInOut" }}>
            Preview
          </motion.h2>
        )}
      </Button>
    </Link>
  );
}

export default PreviewButton;
