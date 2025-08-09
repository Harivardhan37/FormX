import React from "react";
import { Zap, Users, Trophy, Sparkles, Sparkle, Paintbrush, Rocket, PanelsTopLeft, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

function Features() {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      title: "Smart Form Generation",
      description:
        "Let AI do the heavy lifting. Describe your form goal in simple words — FormX turns it into a complete, ready-to-use form with intelligent field suggestions.",
    },
    {
      icon: <Palette className="h-6 w-6 text-primary" />,
      title: "Design & Personalize with Ease",
      description:
        "Easily rearrange your form with smooth drag-and-drop. Add custom fields like dropdowns, dates, checkbox, and more — tailored to your exact needs.",
    },
    {
      icon: <Rocket className="h-6 w-6 text-primary" />,
      title: "Instant Publishing & Real-Time Results",
      description:
        "Share with a click. Embed anywhere. Start collecting responses instantly and explore powerful visual analytics to make faster decisions.",
    },
  ];
  return (
    <section id="features" className="px-4 sm:px-8 lg:px-16 py-24 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Powerful Features
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Everything you need to bid smarter, win faster, and trade with
          confidence.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card
              key={index}
              className="sm:m-0 m-2 h-full flex flex-col transition-all cursor-pointer duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6 space-y-4">
                <div className="rounded-full bg-primary/10 p-3 w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;
