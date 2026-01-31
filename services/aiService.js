const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function analyzeContractWithAI(filePath){
    const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));

  const response = await axios.post(
    
    "http://127.0.0.1:8000/analyze",
    formData,
    {
      headers: formData.getHeaders(),
      timeout: 30000
    }
  );

  return response.data;
}

module.exports= analyzeContractWithAI
