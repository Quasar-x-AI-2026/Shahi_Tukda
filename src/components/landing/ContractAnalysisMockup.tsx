import { AlertTriangle, AlertCircle, CheckCircle, FileText, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ContractAnalysisMockup = () => {
  const [riskScore, setRiskScore] = useState(0);
  const [showClauses, setShowClauses] = useState([false, false, false]);

  useEffect(() => {
    // Animate risk score
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setRiskScore(prev => {
          if (prev >= 72) {
            clearInterval(interval);
            return 72;
          }
          return prev + 2;
        });
      }, 30);
    }, 800);

    // Stagger clause appearance
    const clauseTimers = [
      setTimeout(() => setShowClauses(prev => [true, prev[1], prev[2]]), 1500),
      setTimeout(() => setShowClauses(prev => [prev[0], true, prev[2]]), 1900),
      setTimeout(() => setShowClauses(prev => [prev[0], prev[1], true]), 2300),
    ];

    return () => {
      clearTimeout(timer);
      clauseTimers.forEach(t => clearTimeout(t));
    };
  }, []);

  const clauses = [
    {
      icon: AlertTriangle,
      iconColor: "text-risk-high",
      bgColor: "bg-risk-high/5",
      borderColor: "border-risk-high/20",
      badgeBg: "bg-risk-high/10",
      badgeText: "text-risk-high",
      title: "Non-Compete Clause",
      description: "Restricts employment for 24 months in same industry",
      badge: "High Risk"
    },
    {
      icon: AlertCircle,
      iconColor: "text-risk-medium",
      bgColor: "bg-risk-medium/5",
      borderColor: "border-risk-medium/20",
      badgeBg: "bg-risk-medium/10",
      badgeText: "text-risk-medium",
      title: "Payment Terms",
      description: "Net 60 payment schedule may cause cash flow issues",
      badge: "Moderate"
    },
    {
      icon: CheckCircle,
      iconColor: "text-risk-low",
      bgColor: "bg-risk-low/5",
      borderColor: "border-risk-low/20",
      badgeBg: "bg-risk-low/10",
      badgeText: "text-risk-low",
      title: "Intellectual Property",
      description: "Standard work-for-hire terms with clear ownership",
      badge: "Safe"
    }
  ];

  return (
    <motion.div 
      className="relative"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main Analysis Card */}
      <div className="bg-card rounded-xl border border-border shadow-elevated p-6 overflow-hidden">
        {/* Scan line animation */}
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
          initial={{ top: 0, opacity: 0 }}
          animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, delay: 0.5, ease: "linear" }}
        />

        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <FileText className="w-5 h-5 text-muted-foreground" />
            </motion.div>
            <div>
              <p className="font-medium text-foreground">Freelance_Agreement_2024.pdf</p>
              <p className="text-sm text-muted-foreground">Analyzed just now</p>
            </div>
          </div>
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">AI Verified</span>
          </motion.div>
        </motion.div>

        {/* Risk Score */}
        <motion.div 
          className="bg-muted rounded-lg p-4 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Overall Risk Score</span>
            <div className="flex items-center gap-2">
              <motion.span 
                className="text-2xl font-bold text-risk-medium"
                key={riskScore}
              >
                {riskScore}
              </motion.span>
              <span className="text-sm text-muted-foreground">/ 100</span>
            </div>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-risk-low via-risk-medium to-risk-high rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${riskScore}%` }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            />
          </div>
          <motion.p 
            className="text-sm text-risk-medium font-medium mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: riskScore >= 72 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            Elevated Risk — Review Recommended
          </motion.p>
        </motion.div>

        {/* Clause Analysis */}
        <div className="space-y-3">
          <motion.p 
            className="text-sm font-medium text-foreground mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Detected Clauses
          </motion.p>
          
          {clauses.map((clause, index) => (
            <motion.div
              key={index}
              className={`flex items-start gap-3 p-3 ${clause.bgColor} border ${clause.borderColor} rounded-lg`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: showClauses[index] ? 1 : 0, 
                x: showClauses[index] ? 0 : -20 
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.01, x: 4 }}
            >
              <clause.icon className={`w-5 h-5 ${clause.iconColor} flex-shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{clause.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{clause.description}</p>
              </div>
              <span className={`px-2 py-0.5 ${clause.badgeBg} ${clause.badgeText} text-xs font-medium rounded whitespace-nowrap`}>
                {clause.badge}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Badge */}
      <motion.div 
        className="absolute -top-3 -right-3 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-medium shadow-lg"
        initial={{ opacity: 0, scale: 0, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
      >
        <motion.span
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Live Analysis
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default ContractAnalysisMockup;
