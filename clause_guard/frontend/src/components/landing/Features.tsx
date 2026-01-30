import { Scan, BarChart3, Languages, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: Scan,
      title: "AI Clause Detection",
      description: "Automatically identifies financially dangerous clauses using advanced pattern recognition and legal NLP models.",
    },
    {
      icon: BarChart3,
      title: "Economic Risk Score",
      description: "A proprietary scoring engine quantifies contract danger, helping you understand exposure at a glance.",
    },
    {
      icon: Languages,
      title: "Plain Language Explanations",
      description: "Legal complexity translated into human clarity. Understand every clause without a law degree.",
    },
    {
      icon: Lightbulb,
      title: "Pre-Sign Intelligence",
      description: "Make informed decisions with confidence. Know exactly what you're agreeing to before you sign.",
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section id="product" className="py-20 lg:py-28 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <motion.p 
            className="text-sm font-medium text-accent uppercase tracking-wide mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Core Features
          </motion.p>
          <motion.h2 
            className="text-headline text-foreground mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Built for Economic Protection
          </motion.h2>
          <motion.p 
            className="text-body-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Every feature designed to protect your financial interests.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-xl border border-border p-6 shadow-card group cursor-default"
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                borderColor: "hsl(217 91% 53% / 0.3)",
                boxShadow: "0 25px 50px -12px hsl(222 47% 11% / 0.15)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Icon */}
              <motion.div 
                className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <feature.icon className="w-6 h-6 text-accent" />
              </motion.div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
