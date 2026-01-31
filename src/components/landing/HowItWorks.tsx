import { Upload, Cpu, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Upload,
      title: "Upload Contract",
      description: "Securely upload any agreement. Supports PDF, DOCX, and images with OCR.",
    },
    {
      number: "02",
      icon: Cpu,
      title: "AI Analysis",
      description: "Our models extract clauses and evaluate economic risk using advanced NLP.",
    },
    {
      number: "03",
      icon: FileCheck,
      title: "Get Risk Report",
      description: "Understand threats instantly. Make informed decisions before signing.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-background overflow-hidden">
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
            How It Works
          </motion.p>
          <motion.h2 
            className="text-headline text-foreground mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Three Steps to Protection
          </motion.h2>
          <motion.p 
            className="text-body-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            From upload to insight in under a minute. No legal expertise required.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={cardVariants}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden md:block absolute top-12 left-full w-full h-px bg-border -translate-x-1/2 z-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                  style={{ originX: 0 }}
                />
              )}

              <motion.div 
                className="bg-card rounded-xl border border-border p-8 shadow-card relative z-10 h-full"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 25px 50px -12px hsl(222 47% 11% / 0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Step Number */}
                <motion.span 
                  className="text-xs font-medium text-muted-foreground mb-4 block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  Step {step.number}
                </motion.span>

                {/* Icon */}
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <step.icon className="w-7 h-7 text-accent" />
                </motion.div>

                {/* Content */}
                <h3 className="text-title text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
