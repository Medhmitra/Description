import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";

function MembershipPage(){
  const [membershipName, setMembershipName] = useState("");
  const [membershipValidity, setMembershipValidity] = useState("");
  const [membershipValue, setMembershipValue] = useState("");
  const [membershipPrice, setMembershipPrice] = useState("");
  const [description, setDescription] = useState("");
  const [suggestedDescription, setSuggestedDescription] = useState("");
  const [showSuggestionButtons, setShowSuggestionButtons] = useState(false);

  const generatePrompt = (action) => {
   const trimmedMembershipName = membershipName?.trim();
   const trimmedMembershipValidity = membershipValidity?.trim();
   const trimmedMembershipValue = membershipValue?.trim();
   const trimmedMembershipPrice = membershipPrice?.trim();
   const trimmedDescription = description?.trim();


   if (action === "suggest") {
    if (
        trimmedMembershipName &&
        trimmedMembershipValidity &&
        trimmedMembershipValue &&
        trimmedMembershipPrice
      ) {
        return `Write a description for a salon membership called "${trimmedMembershipName}" valid for ${trimmedMembershipValidity}. Total service value is ₹${trimmedMembershipValue}, priced at ₹${trimmedMembershipPrice}. Emphasize value and exclusivity.Respond only with the sentence.`;
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
    return `Rewrite this salon membership description in a clearer and more engaging way, under 50 characters:\n"${description}".Respond only with the sentence.`;
      
  }

  if (action === "enhance") {
    return `Enhance the following salon membership description to make it more appealing and under 50 characters:\n"${description}".Respond only with the sentence.`;
      
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
  return(
  <div>
  <div className="container">
    <div className="layout">

      <div className="main-content">
        <div className="form-box">
        <h2>Membership</h2>
              <div className="form-group">
                <label>Membership Name</label>
                <input type="text" value={membershipName} onChange={(e) => setMembershipName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Membership Validity</label>
                <input type="text" value={membershipValidity} onChange={(e) => setMembershipValidity(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Total Service Value</label>
                <input type="number" value={membershipValue} onChange={(e) => setMembershipValue(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Membership Price</label>
                <input type="number" value={membershipPrice} onChange={(e) => setMembershipPrice(e.target.value)} />
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

export default MembershipPage;