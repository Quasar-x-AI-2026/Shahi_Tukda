import { Brain, Shield, Lock, Heart } from "lucide-react";
import { motion } from "framer-motion";

const TrustStrip = () => {
  const trustPoints = [
    {
      icon: Brain,
      text: "Built with advanced AI models",
    },
    {
      icon: Shield,
      text: "Privacy-first architecture",
    },
    {
      icon: Lock,
      text: "Secure document handling",
    },
    {
      icon: Heart,
      text: "Designed for economic protection",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="py-12 border-y border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center gap-3 group cursor-default"
              variants={itemVariants}
            >
              <motion.div 
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center transition-colors duration-300 group-hover:bg-accent/10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <point.icon className="w-5 h-5 text-accent" />
              </motion.div>
              <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {point.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStrip;
