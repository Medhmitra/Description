import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";

function PromoCodePage() {
  const [promoName, setPromoName] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoStart, setPromoStart] = useState("");
  const [promoEnd, setPromoEnd] = useState("");
  const [promoDays, setPromoDays] = useState("");
  const [promoValue, setPromoValue] = useState("");
  const [promoDiscount, setPromoDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [suggestedDescription, setSuggestedDescription] = useState("");
  const [showSuggestionButtons, setShowSuggestionButtons] = useState(false);

  const generatePrompt = (action) => {
    const trimmedPromoName = promoName?.trim();
    const trimmedPromoCode = promoCode?.trim();
    const trimmedPromoStart = promoStart?.trim();
    const trimmedPromoEnd = promoEnd?.trim();
    const trimmedPromoDays = promoDays?.trim();
    const trimmedPromoValue = promoValue?.trim();
    const trimmedDescription = description?.trim();

    if (action === "suggest") {
        // ✅ 7. Promo Code
    if (
        trimmedPromoName &&
        trimmedPromoCode &&
        trimmedPromoStart &&
        trimmedPromoEnd &&
        trimmedPromoDays &&
        trimmedPromoValue
      ) {
        return `Generate a promotional description for offer "${trimmedPromoName}" using code "${trimmedPromoCode}". Valid from ${trimmedPromoStart} to ${trimmedPromoEnd}, applicable on ${trimmedPromoDays}, with a discount value of ${trimmedPromoValue}. Keep it punchy and clear.Respond only with the sentence.`;
      }
  
      alert("Please provide valid fields for a description.");
      return null;
    }
    // Rewrite/enhance existing description
  if (!description || description.length < 10) {
    alert("Please enter a description with at least 10 characters.");
    return null;
  }

  if (action === "rewrite") {
    return `Rewrite this salon service description in a clearer and more engaging way, under 50 characters:\n"${description}".Respond only with the sentence.`;
      
  }

  if (action === "enhance") {
    return `Enhance the following salon service description to make it more appealing and under 50 characters:\n"${description}".Respond only with the sentence.`;
      
  }

  return null;
};
const handleGenerate = async (action) => {
    const prompt = generatePrompt(action);
    if (!prompt) return;

    try {
      console.log("Prompt generated:", prompt);

      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      const text = data.generated_text || "No suggestion found";

      setDescription(text);
      setSuggestedDescription(text);
      setShowSuggestionButtons(true);
    } catch (error) {
      console.error("Error fetching suggestion:", error);
    }
  };

  const handleAccept = () => {
    setDescription(suggestedDescription);
    setSuggestedDescription("");
    setShowSuggestionButtons(false);
  };

  const handleReject = () => {
    setDescription("");
    setSuggestedDescription("");
    setShowSuggestionButtons(false);
  };
  return (
    <div>

      <div className="container">
        <div className="layout">
          
          <div className="main-content">
            <div className="form-box">
            <h2>Promo Code</h2>
              <div className="form-group">
                <label>Promo Name</label>
                <input type="text" value={promoName} onChange={(e) => setPromoName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Promo Code</label>
                <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input type="date" value={promoStart} onChange={(e) => setPromoStart(e.target.value)} />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input type="date" value={promoEnd} onChange={(e) => setPromoEnd(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Value</label>
                <input type="text" value={promoValue} onChange={(e) => setPromoValue(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Active Days</label>
                <select value={promoDays} onChange={(e) => setPromoDays(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Specific Weekday">Specific Weekday</option>
                </select>
              </div>
              <div className="form-group">
                <label>Discount Value (e.g., 10%, 15%)</label>
                <input type="text" value={promoDiscount} onChange={(e) => setPromoDiscount(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description must be at least 50 characters long." />
              </div>
              <div className="button-group">
                <div className="dropdown">
                  <button className="suggest">
                    <FaRobot style={{ marginRight: "5px" }} />
                    AI Options ▼
                  </button>
                  <div className="dropdown-content">
                    <button onClick={() => handleGenerate("suggest")}>Suggest Description</button>
                    <button onClick={() => handleGenerate("rewrite")}>Rewrite Description</button>
                    <button onClick={() => handleGenerate("enhance")}>Enhance Description</button>
                  </div>
                </div>
  
                {showSuggestionButtons && (
                  <>
                    <button className="accept" onClick={handleAccept}>Accept</button>
                    <button className="reject" onClick={handleReject}>Reject</button>
                  </>
                )}
              </div>
  
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromoCodePage;
