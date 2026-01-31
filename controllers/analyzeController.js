const analyzeContractWithAI = require("../services/aiService")
const fs = require("fs");
async function analyzeContract(req,res){
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const result = await analyzeContractWithAI(req.file.path);

      res.json({
        message: "Contract analyzed successfully",
        filename: req.file.originalname,
        ...result
      });
      //Temporary file deleted
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("File cleanup failed:", err);
      });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
}

module.exports=analyzeContract;