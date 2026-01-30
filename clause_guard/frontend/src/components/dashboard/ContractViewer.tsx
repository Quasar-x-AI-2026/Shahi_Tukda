import { useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Clause {
  id: string;
  text: string;
  riskLevel: "high" | "medium" | "low";
  title: string;
  explanation: string;
  position: { top: number; height: number };
}

interface ContractViewerProps {
  clauses: Clause[];
  onClauseClick: (clauseId: string) => void;
  activeClause: string | null;
}

const ContractViewer = ({ clauses, onClauseClick, activeClause }: ContractViewerProps) => {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "bg-risk-high/20 border-risk-high/50 hover:bg-risk-high/30";
      case "medium": return "bg-risk-medium/20 border-risk-medium/50 hover:bg-risk-medium/30";
      case "low": return "bg-risk-low/20 border-risk-low/50 hover:bg-risk-low/30";
      default: return "";
    }
  };

  const getRiskTextColor = (level: string) => {
    switch (level) {
      case "high": return "text-risk-high";
      case "medium": return "text-risk-medium";
      case "low": return "text-risk-low";
      default: return "";
    }
  };

  // Sample contract text with placeholders for clauses
  const contractSections = [
    {
      type: "heading",
      content: "INDEPENDENT CONTRACTOR AGREEMENT",
    },
    {
      type: "text",
      content: "This Independent Contractor Agreement (\"Agreement\") is entered into as of the date last signed below (the \"Effective Date\"), by and between TechCorp Inc., a Delaware corporation (\"Company\"), and the undersigned contractor (\"Contractor\").",
    },
    {
      type: "heading",
      content: "1. SERVICES",
    },
    {
      type: "text",
      content: "Contractor agrees to perform services as described in Exhibit A attached hereto. Contractor shall perform all services in a professional and workmanlike manner and in accordance with the highest industry standards.",
    },
    {
      type: "clause",
      clauseId: "clause-1",
    },
    {
      type: "heading",
      content: "2. COMPENSATION",
    },
    {
      type: "clause",
      clauseId: "clause-2",
    },
    {
      type: "text",
      content: "All invoices must be submitted within 30 days of service completion. Company reserves the right to dispute any invoice within 15 business days of receipt.",
    },
    {
      type: "heading",
      content: "3. INTELLECTUAL PROPERTY",
    },
    {
      type: "clause",
      clauseId: "clause-3",
    },
    {
      type: "heading",
      content: "4. NON-COMPETE",
    },
    {
      type: "clause",
      clauseId: "clause-4",
    },
    {
      type: "heading",
      content: "5. TERMINATION",
    },
    {
      type: "clause",
      clauseId: "clause-5",
    },
    {
      type: "text",
      content: "Upon termination, Contractor shall immediately return all Company property and confidential information. The provisions of Sections 3, 4, and 6 shall survive termination.",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-muted/30 rounded-2xl border border-border/50 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setZoom(Math.max(50, zoom - 10))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-12 text-center">{zoom}%</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setZoom(Math.min(150, zoom + 10))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Document View */}
      <div className="flex-1 overflow-auto p-6">
        <motion.div 
          className="max-w-2xl mx-auto bg-card rounded-lg shadow-lg p-8 md:p-12"
          style={{ 
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
        >
          {contractSections.map((section, index) => {
            if (section.type === "heading") {
              return (
                <h3 key={index} className="text-lg font-bold text-foreground mt-6 mb-3 first:mt-0">
                  {section.content}
                </h3>
              );
            }
            
            if (section.type === "text") {
              return (
                <p key={index} className="text-sm text-foreground/80 mb-4 leading-relaxed">
                  {section.content}
                </p>
              );
            }
            
            if (section.type === "clause") {
              const clause = clauses.find(c => c.id === section.clauseId);
              if (!clause) return null;
              
              const isActive = activeClause === clause.id;
              
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <motion.div
                      className={`relative p-4 my-4 rounded-lg border-l-4 cursor-pointer transition-all ${getRiskColor(clause.riskLevel)} ${
                        isActive ? "ring-2 ring-accent" : ""
                      }`}
                      onClick={() => onClauseClick(clause.id)}
                      whileHover={{ x: 4 }}
                      animate={isActive ? { scale: 1.02 } : { scale: 1 }}
                    >
                      <p className="text-sm text-foreground leading-relaxed">
                        {clause.text}
                      </p>
                      <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                        clause.riskLevel === "high" ? "bg-risk-high text-white" :
                        clause.riskLevel === "medium" ? "bg-risk-medium text-white" :
                        "bg-risk-low text-white"
                      }`}>
                        {clause.riskLevel === "high" ? "⚠ High Risk" : 
                         clause.riskLevel === "medium" ? "⚡ Moderate" : 
                         "✓ Safe"}
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs p-3">
                    <p className={`font-semibold mb-1 ${getRiskTextColor(clause.riskLevel)}`}>
                      {clause.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {clause.explanation}
                    </p>
                  </TooltipContent>
                </Tooltip>
              );
            }
            
            return null;
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ContractViewer;
