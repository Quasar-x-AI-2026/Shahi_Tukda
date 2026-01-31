import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ContractViewer from "@/components/dashboard/ContractViewer";
import RiskIntelligencePanel from "@/components/dashboard/RiskIntelligencePanel";
import FullReportPanel from "@/components/dashboard/FullReportPanel";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const ContractReport = () => {
  const navigate = useNavigate();
  const [activeClause, setActiveClause] = useState<string | null>(null);
  const [showFullReport, setShowFullReport] = useState(false);

  // Load analysis data from localStorage
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [riskScore, setRiskScore] = useState(0);
  const [contractName, setContractName] = useState("Contract_Analysis.pdf");
  const [clauses, setClauses] = useState<any[]>([]);

  // Load real data on mount
  useEffect(() => {
    console.log("🔍 ContractReport: Loading analysis data from localStorage...");

    try {
      const savedAnalysis = localStorage.getItem("latestAnalysis");
      console.log("📦 Raw localStorage data:", savedAnalysis);

      if (savedAnalysis) {
        const data = JSON.parse(savedAnalysis);
        console.log("✅ Parsed analysis data:", data);

        setAnalysisData(data);

        // Set risk score from real data
        const realRiskScore = data.riskScore || data.total_score || 0;
        console.log("🎯 Setting risk score to:", realRiskScore);
        setRiskScore(realRiskScore);

        // Convert backend risks to clause format for display
        if (data.risks && data.risks.length > 0) {
          console.log("📋 Converting", data.risks.length, "risks to clauses");
          const formattedClauses = data.risks.map((risk: any, index: number) => ({
            id: `clause-${index + 1}`,
            text: risk.clause || risk.text || "No clause text",
            riskLevel: risk.risk_level?.toLowerCase() || "medium",
            title: risk.category || "Risk",
            explanation: risk.explanation || "",
            position: { top: 180 + (index * 100), height: 80 }
          }));
          setClauses(formattedClauses);
          console.log("✅ Clauses set:", formattedClauses.length);
        } else {
          console.log("⚠️ No risks found in analysis data");
        }
      } else {
        console.log("⚠️ No saved analysis found in localStorage");
      }
    } catch (error) {
      console.error("❌ Failed to load analysis data:", error);
    }
  }, []);

  const handleClauseClick = (clauseId: string) => {
    setActiveClause(clauseId === activeClause ? null : clauseId);
  };

  const handleDownloadReport = async () => {
    if (!analysisData) {
      alert("No analysis data available");
      return;
    }

    try {
      const response = await fetch("http://localhost:8001/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(analysisData),
      });

      if (!response.ok) throw new Error("Report generation failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Contract_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to generate report");
    }
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
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${riskScore >= 70 ? "bg-risk-high/10 text-risk-high" :
                riskScore >= 40 ? "bg-risk-medium/10 text-risk-medium" :
                  "bg-risk-low/10 text-risk-low"
                }`}>
                Risk Score: {riskScore}/100
              </div>

              <Button
                onClick={handleDownloadReport}
                className="bg-accent hover:bg-accent/90 text-white ml-2"
                size="sm"
              >
                📄 Download Report
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* AI Risk Intelligence Hero Card */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-card/50 p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-accent/10">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-foreground">AI Risk Intelligence</h2>
            </div>

            {/* Risk Score Display */}
            <div className="text-center mb-8">
              <div className="mb-4">
                <span className={`text-8xl font-bold ${riskScore >= 70 ? 'text-red-500' :
                  riskScore >= 40 ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>
                  {riskScore}
                </span>
                <span className="text-4xl font-semibold text-muted-foreground ml-2">/ 100</span>
              </div>

              <div className={`inline-block px-6 py-2 rounded-full text-lg font-semibold ${riskScore >= 70 ? 'bg-red-500/10 text-red-500' :
                riskScore >= 40 ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-green-500/10 text-green-500'
                }`}>
                {riskScore >= 70 ? 'Elevated Risk' : riskScore >= 40 ? 'Moderate Risk' : 'Low Risk'}
              </div>
            </div>

            {/* Risk Gradient Bar */}
            <div className="relative">
              <div className="h-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 opacity-30"></div>
              <div className="absolute top-0 left-0 right-0 h-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                style={{ width: `${riskScore}%` }}></div>

              <div className="flex justify-between mt-3 text-sm font-medium">
                <span className="text-green-500">Low</span>
                <span className="text-yellow-500">Moderate</span>
                <span className="text-red-500">High</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Split View Section */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Contract Viewer - Left Side */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: easeOutExpo }}
          >
            <ContractViewer
              clauses={clauses}
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
              clauses={clauses}
              onClauseClick={handleClauseClick}
              activeClause={activeClause}
              onViewFullReport={() => setShowFullReport(true)}
            />
          </motion.div>
        </div>

        {/* Advanced Analysis Sections - Full Width Below */}
        {analysisData && (
          <div className="mt-8 space-y-6">

            {/* Legal Structure Section */}
            {analysisData.legalStructure && (
              <motion.div
                className="card-gradient p-8 rounded-3xl border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="text-3xl">⚖️</span>
                  Legal Structure Understanding
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Contract Type</div>
                      <div className="text-lg font-semibold text-foreground">
                        {analysisData.legalStructure.contractType}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Structure Quality</div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                        {analysisData.legalStructure.structureQuality}
                      </div>
                    </div>
                    {analysisData.legalStructure.term && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Contract Term</div>
                        <div className="text-lg font-semibold text-foreground">
                          {analysisData.legalStructure.term.duration || 'Undefined'}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Key Sections Identified</div>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.legalStructure.keySections?.map((section: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-background/50 text-foreground text-sm border border-border/50"
                          >
                            {section}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Financial Risks Section */}
            {analysisData.financialRisks && analysisData.financialRisks.totalRiskCount > 0 && (
              <motion.div
                className="card-gradient p-8 rounded-3xl border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="text-3xl">💰</span>
                  Financial Risk Detection
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-background/50 p-4 rounded-xl border border-border/50">
                    <div className="text-sm text-muted-foreground mb-1">Total Risks</div>
                    <div className="text-2xl font-bold text-foreground">{analysisData.financialRisks.totalRiskCount}</div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border/50">
                    <div className="text-sm text-muted-foreground mb-1">Estimated Exposure</div>
                    <div className="text-2xl font-bold text-yellow-500">{analysisData.financialRisks.estimatedExposure}</div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border/50">
                    <div className="text-sm text-muted-foreground mb-1">Severity</div>
                    <div className={`text-2xl font-bold ${analysisData.financialRisks.severity === 'Critical' ? 'text-red-500' :
                      analysisData.financialRisks.severity === 'High' ? 'text-orange-500' :
                        'text-yellow-500'
                      }`}>
                      {analysisData.financialRisks.severity}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold text-foreground mb-3">Detected Financial Risks:</div>
                  {analysisData.financialRisks.risks?.map((risk: any, idx: number) => (
                    <div key={idx} className="bg-background/30 p-4 rounded-xl border border-border/30">
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-semibold text-foreground">{risk.type}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${risk.severity === 'Critical' ? 'bg-red-500/20 text-red-500' :
                          risk.severity === 'High' ? 'bg-orange-500/20 text-orange-500' :
                            'bg-yellow-500/20 text-yellow-500'
                          }`}>
                          {risk.severity}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">{risk.description}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Economic Impact Section */}
            {analysisData.economicImpact && (
              <motion.div
                className="card-gradient p-8 rounded-3xl border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="text-3xl">📊</span>
                  Economic Impact Analysis
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="bg-background/50 p-4 rounded-xl border border-border/50">
                      <div className="text-sm text-muted-foreground mb-1">Contract Value</div>
                      <div className="text-2xl font-bold text-green-500">
                        ${analysisData.economicImpact.contractValue?.toLocaleString() || '0'}
                      </div>
                    </div>
                    <div className="bg-background/50 p-4 rounded-xl border border-border/50">
                      <div className="text-sm text-muted-foreground mb-1">Total Risk Cost</div>
                      <div className="text-2xl font-bold text-red-500">
                        ${analysisData.economicImpact.totalRiskCost?.toLocaleString() || '0'}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-background/50 p-4 rounded-xl border border-border/50">
                      <div className="text-sm text-muted-foreground mb-1">Risk-Adjusted Value</div>
                      <div className="text-2xl font-bold text-accent">
                        ${analysisData.economicImpact.riskAdjustedValue?.toLocaleString() || '0'}
                      </div>
                    </div>
                    <div className="bg-background/50 p-4 rounded-xl border border-border/50">
                      <div className="text-sm text-muted-foreground mb-1">Risk Percentage</div>
                      <div className="text-2xl font-bold text-yellow-500">
                        {analysisData.economicImpact.riskPercentage}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl mb-6 ${analysisData.economicImpact.economicViability?.includes('Not Recommended') ? 'bg-red-500/10 border border-red-500/50' :
                  analysisData.economicImpact.economicViability?.includes('Caution') ? 'bg-yellow-500/10 border border-yellow-500/50' :
                    'bg-green-500/10 border border-green-500/50'
                  }`}>
                  <div className="text-sm font-semibold mb-1">Economic Viability</div>
                  <div className="text-lg font-bold">{analysisData.economicImpact.economicViability}</div>
                </div>

                {analysisData.economicImpact.recommendations && analysisData.economicImpact.recommendations.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold text-foreground mb-3">💡 Recommendations:</div>
                    <div className="space-y-2">
                      {analysisData.economicImpact.recommendations.map((rec: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 bg-background/30 p-3 rounded-lg">
                          <div className="text-accent font-bold mt-0.5">{idx + 1}.</div>
                          <div className="text-sm text-foreground">{rec}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

          </div>
        )}
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
