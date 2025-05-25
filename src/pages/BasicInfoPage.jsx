import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";


function BasicInfoPage() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [suggestedDescription, setSuggestedDescription] = useState("");
  const [showSuggestionButtons, setShowSuggestionButtons] = useState(false);
  const [lookName, setLookName] = useState("");
  const [genderRestriction, setGenderRestriction] = useState("");
  const [duration, setDuration] = useState("");
  const [packageServices, setPackageServices] = useState("");
  const [lookType, setLookType] = useState("");
  const [focusType, setFocusType] = useState("");
 
  const [lookServices, setLookServices] = useState("");
const [focus, setFocus] = useState("");




const generatePrompt = (action) => {
  const trimmedCategory = category.trim();
  const trimmedSubCategory = subCategory.trim();
  const trimmedGender = genderRestriction?.trim();
  const trimmedLook = lookName?.trim();
  const trimmedDuration = duration?.trim();
  const trimmedServices = packageServices?.trim();
  const trimmedLookType = lookType?.trim();
  const trimmedFocus = focus?.trim();
  const trimmedLookServices = lookServices?.trim();
  const trimmedDescription = description?.trim();


  if (action === "suggest") {
    // Case 1: Category + Subcategory
    if (trimmedCategory && trimmedSubCategory && !trimmedLook && !trimmedGender && !trimmedDuration) {
      return `Write a short, one-line salon service description under 50 characters for a ${trimmedSubCategory.toLowerCase()} in the ${trimmedCategory.toLowerCase()} category. Use active verbs and focus on client benefit. Respond only with the sentence.`;
    }

    // Case 2: Book a Look
    if (trimmedLook && trimmedGender && trimmedCategory && trimmedDuration) {
      let lookDetails = `Create a short, under-50-character description for a "Book a Look" service named "${trimmedLook}". Mention that the customer will receive the exact same look as shown in the reference/model photo including overall appearance.Respond only with the sentence.`;
      lookDetails += ` The look is for ${trimmedGender}, offered by specialized professionals under the ${trimmedCategory} category with a duration of ${trimmedDuration} minutes.`;
      if (trimmedLookType) lookDetails += ` It is a ${trimmedLookType.toLowerCase()} look.`;
      if (trimmedFocus) lookDetails += ` The focus is on a ${trimmedFocus.toLowerCase()} finish.`;
      if (trimmedLookServices) lookDetails += ` Services included: ${trimmedLookServices}.`;
      return lookDetails;
    }

    // Case 3: Package
    if (trimmedLook && trimmedGender && trimmedServices) {
      return `Generate a short, under-50-character description for a salon package named "${trimmedLook}" for ${trimmedGender}. Mention that it includes the following services: ${trimmedServices}. Focus on value and convenience in the tone.Respond only with the sentence.`;
    }

    // Case 4: Product
    if (trimmedLook && !trimmedGender && !trimmedCategory && !trimmedDuration) {
      return `Write a short, under-50-character product description for "${trimmedLook}" used in a salon. Highlight purpose or benefit.Respond only with the sentence.`;
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
              <h2>Basic Info</h2>
  
              <div className="form-group">
                <label>Name (Look / Package / Product)</label>
                <input type="text" value={lookName} onChange={(e) => setLookName(e.target.value)} placeholder="e.g., Radiant Glow Facial" />
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
                <label>Services Included (For Packages)</label>
                <input type="text" value={packageServices} onChange={(e) => setPackageServices(e.target.value)} placeholder="e.g., Haircut, Facial, Nail Art" />
              </div>
  
              <div className="form-group">
                <label>Services Included (For Book a Look)</label>
                <input type="text" value={lookServices} onChange={(e) => setLookServices(e.target.value)} placeholder="e.g., Makeup, Hairdo, Styling" />
              </div>
  
              <div className="form-group">
                <label>Look Type</label>
                <select value={lookType} onChange={(e) => setLookType(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Glam">Glam</option>
                  <option value="Bridal">Bridal</option>
                  <option value="Natural">Natural</option>
                </select>
              </div>
  
              <div className="form-group">
                <label>Focus</label>
                <select value={focus} onChange={(e) => setFocus(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Matte">Matte</option>
                  <option value="Glowy">Glowy</option>
                  <option value="Dewy">Dewy</option>
                </select>
              </div>
  
              <div className="form-group">
                <label>Category</label>
                <select value={category} onChange={(e) => { setCategory(e.target.value); setSubCategory(""); }}>
                  <option value="">Select Category</option>
                  <option value="Hair">Hair</option>
                  <option value="Skin">Skin</option>
                  <option value="Nails">Nails</option>
                </select>
              </div>
  
              <div className="form-group">
                <label>Sub-category</label>
                <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                  <option value="">Select Sub-category</option>
                  {category === "Hair" && (<><option value="Haircut">Haircut</option><option value="Hair Spa">Hair Spa</option><option value="Hair Coloring">Hair Coloring</option></>)}
                  {category === "Skin" && (<><option value="Facial">Facial</option><option value="Clean-up">Clean-up</option><option value="Bleach">Bleach</option></>)}
                  {category === "Nails" && (<><option value="Manicure">Manicure</option><option value="Pedicure">Pedicure</option><option value="Nail Art">Nail Art</option></>)}
                </select>
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

export default BasicInfoPage;
