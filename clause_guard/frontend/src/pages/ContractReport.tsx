import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ContractViewer from "@/components/dashboard/ContractViewer";
import RiskIntelligencePanel from "@/components/dashboard/RiskIntelligencePanel";
import FullReportPanel from "@/components/dashboard/FullReportPanel";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

// Sample data for demonstration
const sampleClauses = [
  {
    id: "clause-1",
    text: "Contractor shall devote their full professional time and attention to the performance of services under this Agreement and shall not engage in any other professional activities without prior written consent from Company.",
    riskLevel: "medium" as const,
    title: "Exclusivity Requirement",
    explanation: "This clause may limit your ability to take on other clients or projects during the contract period.",
    position: { top: 180, height: 80 },
  },
  {
    id: "clause-2",
    text: "Company shall pay Contractor within sixty (60) days of receipt of a valid invoice. All payments are subject to Company's standard approval process and may be delayed pending verification of deliverables.",
    riskLevel: "high" as const,
    title: "Net-60 Payment Terms",
    explanation: "60-day payment terms create significant cash flow risk. Industry standard is typically Net-15 or Net-30.",
    position: { top: 280, height: 80 },
  },
  {
    id: "clause-3",
    text: "All intellectual property, inventions, and work product created by Contractor during the term of this Agreement shall be the sole and exclusive property of Company, including any pre-existing materials incorporated into deliverables.",
    riskLevel: "low" as const,
    title: "IP Assignment",
    explanation: "Standard work-for-hire IP assignment. Clear boundaries are defined for ownership transfer.",
    position: { top: 380, height: 80 },
  },
  {
    id: "clause-4",
    text: "During the term of this Agreement and for a period of twenty-four (24) months following termination, Contractor shall not provide substantially similar services to any competitor of Company within a 100-mile radius of any Company office or client location.",
    riskLevel: "high" as const,
    title: "Non-Compete Restriction",
    explanation: "24-month non-compete with broad geographic scope significantly limits future employment opportunities.",
    position: { top: 480, height: 100 },
  },
  {
    id: "clause-5",
    text: "Either party may terminate this Agreement for convenience upon seven (7) days written notice. Upon termination, Contractor shall be compensated only for work completed and approved prior to the termination date.",
    riskLevel: "medium" as const,
    title: "Short Notice Termination",
    explanation: "7-day termination notice is shorter than industry standard 30 days. May leave work-in-progress uncompensated.",
    position: { top: 600, height: 80 },
  },
];

const ContractReport = () => {
  const navigate = useNavigate();
  const [activeClause, setActiveClause] = useState<string | null>(null);
  const [showFullReport, setShowFullReport] = useState(false);
  const riskScore = 72;
  const contractName = "Independent_Contractor_Agreement.pdf";

  const handleClauseClick = (clauseId: string) => {
    setActiveClause(clauseId === activeClause ? null : clauseId);
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation */}
      <motion.nav
        className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0, transition: { duration: 0.5, ease: easeOutExpo } }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{contractName}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                riskScore >= 70 ? "bg-risk-high/10 text-risk-high" :
                riskScore >= 40 ? "bg-risk-medium/10 text-risk-medium" :
                "bg-risk-low/10 text-risk-low"
              }`}>
                Risk Score: {riskScore}/100
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content - Split View */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-5 gap-6 h-[calc(100vh-120px)]">
          {/* Contract Viewer - Left Side */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: easeOutExpo }}
          >
            <ContractViewer 
              clauses={sampleClauses}
              onClauseClick={handleClauseClick}
              activeClause={activeClause}
            />
          </motion.div>

          {/* Risk Intelligence Panel - Right Side */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: easeOutExpo }}
          >
            <RiskIntelligencePanel 
              riskScore={riskScore}
              clauses={sampleClauses}
              onClauseClick={handleClauseClick}
              activeClause={activeClause}
              onViewFullReport={() => setShowFullReport(true)}
            />
          </motion.div>
        </div>
      </div>

      {/* Full Report Panel */}
      <FullReportPanel 
        isOpen={showFullReport}
        onClose={() => setShowFullReport(false)}
        riskScore={riskScore}
        contractName={contractName}
      />
    </motion.div>
  );
};

export default ContractReport;
