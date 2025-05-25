import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";

function VoucherPage() {
  const [voucherValidity, setVoucherValidity] = useState("");
  const [voucherSessions, setVoucherSessions] = useState("");
  const [voucherServiceValue, setVoucherServiceValue] = useState("");
  const [duration, setDuration] = useState("");
  const [voucherPrice, setVoucherPrice] = useState("");
  const [voucherName, setVoucherName] = useState("");
  const [voucherServices, setVoucherServices] = useState("");
  const [voucherValue, setVoucherValue] = useState("");
  const [genderRestriction, setGenderRestriction] = useState("");
  const [description, setDescription] = useState("");
  const [suggestedDescription, setSuggestedDescription] = useState("");
  const [showSuggestionButtons, setShowSuggestionButtons] = useState(false);

  const generatePrompt = (action) => {
    const trimmedDuration = duration?.trim();
    const trimmedGender = genderRestriction?.trim();
    const trimmedVoucherName = voucherName?.trim();
    const trimmedVoucherValidity = voucherValidity?.trim();
    const trimmedVoucherSessions = voucherSessions?.trim();
    const trimmedVoucherServices = voucherServices?.trim();
    const trimmedVoucherValue = voucherValue?.trim();
    const trimmedVoucherPrice = voucherPrice?.trim();
    const trimmedDescription = description?.trim();


    if (action === "suggest") {
        if (
            trimmedVoucherName &&
            trimmedVoucherValidity &&
            trimmedVoucherSessions &&
            trimmedGender &&
            trimmedVoucherServices &&
            trimmedVoucherValue &&
            trimmedVoucherPrice &&
            trimmedDuration
          ) {
            return `Write a description for a voucher named "${trimmedVoucherName}" valid for ${trimmedVoucherValidity} with ${trimmedVoucherSessions} total sessions. It's for ${trimmedGender}, includes services: ${trimmedVoucherServices}, has a total service value of ₹${trimmedVoucherValue} and is priced at ₹${trimmedVoucherPrice}. Duration per session: ${trimmedDuration} minutes.Respond only with the sentence.`;
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
          return `Rewrite this salon service description in a clearer and more engaging way, under 60 characters:\n"${description}".Respond only with the sentence.`;
      
        }

        if (action === "enhance") {
          return `Enhance the following salon service description to make it more appealing and under 60 characters:\n"${description}".Respond only with the sentence.`;
      
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
            <h2>Voucher</h2>
              <div className="form-group">
                <label>Voucher Name</label>
                <input type="text" value={voucherName} onChange={(e) => setVoucherName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Voucher Validity</label>
                <input type="text" value={voucherValidity} onChange={(e) => setVoucherValidity(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Gender Restriction</label>
                <select value={genderRestriction} onChange={(e) => setGenderRestriction(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
              <div className="form-group">
                <label>Duration (in minutes)</label>
                <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g., 60" />
              </div>
              <div className="form-group">
                <label>Total Sessions</label>
                <input type="number" value={voucherSessions} onChange={(e) => setVoucherSessions(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Voucher Services</label>
                <input type="text" value={voucherServices} onChange={(e) => setVoucherServices(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Total Service Value</label>
                <input type="number" value={voucherValue} onChange={(e) => setVoucherValue(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Voucher Price</label>
                <input type="number" value={voucherPrice} onChange={(e) => setVoucherPrice(e.target.value)} />
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
  
              {/*{suggestedDescription && (
                <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
                  <strong>Suggestion:</strong> {suggestedDescription}
                </p>
              )}*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default VoucherPage;