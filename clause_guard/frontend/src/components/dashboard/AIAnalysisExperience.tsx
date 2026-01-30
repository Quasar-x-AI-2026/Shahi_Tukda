import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Shield, FileSearch, Brain, AlertTriangle, Sparkles, Target } from "lucide-react";

interface AIAnalysisExperienceProps {
  fileName: string;
  onComplete: () => void;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const analysisSteps = [
  { id: 1, label: "Upload secured", icon: Shield, duration: 1500 },
  { id: 2, label: "Reading document", icon: FileSearch, duration: 2500 },
  { id: 3, label: "Extracting clauses", icon: FileSearch, duration: 3000 },
  { id: 4, label: "Understanding legal structure", icon: Brain, duration: 3500 },
  { id: 5, label: "Detecting financial risks", icon: AlertTriangle, duration: 4000 },
  { id: 6, label: "Running economic impact model", icon: Target, duration: 3500 },
  { id: 7, label: "Generating risk score", icon: Sparkles, duration: 2500 },
  { id: 8, label: "Preparing intelligence report", icon: FileSearch, duration: 2000 },
];

const floatingMessages = [
  { text: "Detected 14 clauses...", delay: 4000 },
  { text: "Non-compete clause flagged...", delay: 8000 },
  { text: "Payment structure requires review...", delay: 12000 },
  { text: "Liability limitation found...", delay: 16000 },
  { text: "Termination clause detected...", delay: 19000 },
];

const AIAnalysisExperience = ({ fileName, onComplete }: AIAnalysisExperienceProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let stepTimeout: NodeJS.Timeout;
    let cumulativeTime = 0;

    analysisSteps.forEach((step, index) => {
      cumulativeTime += step.duration;
      
      setTimeout(() => {
        setCurrentStep(index + 1);
        setCompletedSteps(prev => [...prev, step.id]);
        setProgress(((index + 1) / analysisSteps.length) * 100);
        
        if (index === analysisSteps.length - 1) {
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 1500);
          }, 1000);
        }
      }, cumulativeTime);
    });

    // Floating messages
    floatingMessages.forEach(msg => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, msg.text]);
      }, msg.delay);
    });

    return () => clearTimeout(stepTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-primary">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/40 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo/20 rounded-full blur-[150px]" />
        </div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl px-6">
        {/* Scanner Ring */}
        <motion.div 
          className="relative mx-auto w-64 h-64 md:w-80 md:h-80 mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          {/* Outer Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="hsl(var(--accent) / 0.1)"
              strokeWidth="2"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 48}`}
              strokeDashoffset={`${2 * Math.PI * 48 * (1 - progress / 100)}`}
              style={{ filter: "drop-shadow(0 0 10px hsl(var(--accent)))" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--accent))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner glow ring */}
          <motion.div
            className="absolute inset-4 rounded-full border border-accent/20"
            animate={{ 
              boxShadow: isComplete 
                ? "0 0 60px hsl(var(--accent) / 0.5), inset 0 0 40px hsl(var(--accent) / 0.2)"
                : "0 0 30px hsl(var(--accent) / 0.2), inset 0 0 20px hsl(var(--accent) / 0.1)"
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <AnimatePresence mode="wait">
              {!isComplete ? (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-3"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="mx-auto w-10 h-10 border-2 border-accent border-t-transparent rounded-full"
                  />
                  <p className="text-accent font-semibold text-sm tracking-wide">
                    ClauseGuard AI Engine
                  </p>
                  <p className="text-primary-foreground text-lg font-medium">
                    Analyzing Contract...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-3"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="mx-auto w-16 h-16 rounded-full bg-risk-low/20 flex items-center justify-center"
                  >
                    <Check className="w-8 h-8 text-risk-low" />
                  </motion.div>
                  <p className="text-primary-foreground text-xl font-semibold">
                    Analysis Complete
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Rotating dots */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <motion.div
                key={deg}
                className="absolute w-2 h-2 rounded-full bg-accent"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${deg}deg) translateY(-140px) translateX(-50%)`,
                }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* File Name */}
        <motion.p
          className="text-center text-primary-foreground/60 mb-8 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          📄 {fileName}
        </motion.p>

        {/* Steps */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {analysisSteps.map((step) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === step.id;
            const StepIcon = step.icon;

            return (
              <motion.div
                key={step.id}
                className={`relative p-3 rounded-xl border transition-all duration-300 ${
                  isCompleted 
                    ? "bg-risk-low/10 border-risk-low/30" 
                    : isCurrent
                    ? "bg-accent/10 border-accent/30"
                    : "bg-primary-foreground/5 border-primary-foreground/10"
                }`}
                animate={isCurrent ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0 }}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    isCompleted 
                      ? "bg-risk-low/20" 
                      : isCurrent 
                      ? "bg-accent/20" 
                      : "bg-primary-foreground/10"
                  }`}>
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Check className="w-4 h-4 text-risk-low" />
                      </motion.div>
                    ) : (
                      <StepIcon className={`w-3 h-3 ${isCurrent ? "text-accent" : "text-primary-foreground/40"}`} />
                    )}
                  </div>
                  <span className={`text-xs font-medium ${
                    isCompleted 
                      ? "text-risk-low" 
                      : isCurrent 
                      ? "text-accent" 
                      : "text-primary-foreground/40"
                  }`}>
                    {step.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Floating Messages */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AnimatePresence>
            {visibleMessages.map((msg, index) => (
              <motion.div
                key={msg}
                className="absolute px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground/70 text-sm backdrop-blur-sm"
                style={{
                  left: `${15 + (index % 3) * 25}%`,
                  top: `${20 + (index % 4) * 15}%`,
                }}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {msg}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAnalysisExperience;
