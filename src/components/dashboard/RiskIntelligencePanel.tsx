import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, AlertCircle, ChevronRight, Lightbulb, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Clause {
  id: string;
  text: string;
  riskLevel: "high" | "medium" | "low";
  title: string;
  explanation: string;
  position: { top: number; height: number };
}

interface RiskIntelligencePanelProps {
  riskScore: number;
  clauses: Clause[];
  onClauseClick: (clauseId: string) => void;
  activeClause: string | null;
  onViewFullReport: () => void;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const RiskIntelligencePanel = ({ 
  riskScore, 
  clauses, 
  onClauseClick, 
  activeClause,
  onViewFullReport 
}: RiskIntelligencePanelProps) => {
  const getRiskLabel = (score: number) => {
    if (score >= 70) return { label: "Elevated Risk", color: "text-risk-high" };
    if (score >= 40) return { label: "Moderate Risk", color: "text-risk-medium" };
    return { label: "Low Risk", color: "text-risk-low" };
  };

  const getRiskGradient = (score: number) => {
    if (score >= 70) return "from-risk-high to-risk-medium";
    if (score >= 40) return "from-risk-medium to-risk-low";
    return "from-risk-low to-accent";
  };

  const riskInfo = getRiskLabel(riskScore);
  const highRiskClauses = clauses.filter(c => c.riskLevel === "high");
  const mediumRiskClauses = clauses.filter(c => c.riskLevel === "medium");
  const lowRiskClauses = clauses.filter(c => c.riskLevel === "low");

  const getClauseIcon = (level: string) => {
    switch (level) {
      case "high": return <AlertTriangle className="w-4 h-4 text-risk-high" />;
      case "medium": return <AlertCircle className="w-4 h-4 text-risk-medium" />;
      case "low": return <CheckCircle className="w-4 h-4 text-risk-low" />;
      default: return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-2xl border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-accent" />
          <span className="text-sm font-medium text-muted-foreground">AI Risk Intelligence</span>
        </div>
        
        {/* Risk Score */}
        <motion.div 
          className="text-center mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
        >
          <div className="relative inline-block">
            <span className={`text-6xl font-bold ${riskInfo.color}`}>
              {riskScore}
            </span>
            <span className="text-2xl font-medium text-muted-foreground ml-1">/ 100</span>
          </div>
          <p className={`text-lg font-semibold mt-2 ${riskInfo.color}`}>
            {riskInfo.label}
          </p>
        </motion.div>

        {/* Risk Meter */}
        <div className="relative h-3 rounded-full bg-muted overflow-hidden">
          <motion.div
            className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${getRiskGradient(riskScore)}`}
            initial={{ width: 0 }}
            animate={{ width: `${riskScore}%` }}
            transition={{ duration: 1, delay: 0.3, ease: easeOutExpo }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>Low</span>
          <span>Moderate</span>
          <span>High</span>
        </div>
      </div>

      {/* Key Findings */}
      <div className="flex-1 overflow-auto p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Key Findings</h3>
        
        <div className="space-y-3">
          {/* High Risk Items */}
          {highRiskClauses.map((clause, index) => (
            <motion.button
              key={clause.id}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                activeClause === clause.id 
                  ? "bg-risk-high/10 border-risk-high/30" 
                  : "bg-muted/30 border-border/50 hover:bg-risk-high/5"
              }`}
              onClick={() => onClauseClick(clause.id)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-risk-high/10">
                  {getClauseIcon(clause.riskLevel)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{clause.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{clause.explanation}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </motion.button>
          ))}

          {/* Medium Risk Items */}
          {mediumRiskClauses.map((clause, index) => (
            <motion.button
              key={clause.id}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                activeClause === clause.id 
                  ? "bg-risk-medium/10 border-risk-medium/30" 
                  : "bg-muted/30 border-border/50 hover:bg-risk-medium/5"
              }`}
              onClick={() => onClauseClick(clause.id)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * (highRiskClauses.length + index) }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-risk-medium/10">
                  {getClauseIcon(clause.riskLevel)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{clause.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{clause.explanation}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </motion.button>
          ))}

          {/* Low Risk Items */}
          {lowRiskClauses.map((clause, index) => (
            <motion.button
              key={clause.id}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                activeClause === clause.id 
                  ? "bg-risk-low/10 border-risk-low/30" 
                  : "bg-muted/30 border-border/50 hover:bg-risk-low/5"
              }`}
              onClick={() => onClauseClick(clause.id)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * (highRiskClauses.length + mediumRiskClauses.length + index) }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-risk-low/10">
                  {getClauseIcon(clause.riskLevel)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{clause.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{clause.explanation}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* AI Insight */}
        <motion.div 
          className="mt-6 p-4 rounded-xl bg-accent/5 border border-accent/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Lightbulb className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">AI Insight</p>
              <p className="text-sm text-muted-foreground">
                This contract contains restrictions that may limit future employment opportunities. 
                The non-compete clause extends 24 months post-termination across a broad geographic area.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer CTA */}
      <div className="p-6 border-t border-border/50">
        <motion.button
          className="w-full h-12 rounded-xl auth-button font-semibold"
          onClick={onViewFullReport}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Full Intelligence Report
        </motion.button>
      </div>
    </div>
  );
};

export default RiskIntelligencePanel;
