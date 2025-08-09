import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Cta() {
  return (
    <section className="px-4 sm:px-8 lg:px-16 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-primary p-10 text-center space-y-6"
      >
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary-foreground">
          Build Your First Form in 30 Seconds
        </h2>
        <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl">
          Experience the magic of AI-assisted form creation.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="mt-4">
              Start Building Now
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Cta;
