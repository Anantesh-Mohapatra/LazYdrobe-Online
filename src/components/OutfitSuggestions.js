// src/components/OutfitSuggestions.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css'; // Ensure this imports any global styles if needed
import './styling/OutfitSuggestions.css';
import axios from 'axios';
import OutfitGenerationModal from './suggestion/OutfitGenerationModal';
import LoadingPopup from './LoadingPopup'; // Import the LoadingPopup component
import { useHistory } from 'react-router-dom'; 
import { toast } from 'react-toastify'; 
import { FaMagic, FaArchive } from 'react-icons/fa';

const OutfitSuggestions = ({
  outfits,
  setOutfitSuggestions,
  wardrobeItems,
  error,
  loading,
  setLoading,
  userInfo,
}) => {
  const [isGenerationModalOpen, setIsGenerationModalOpen] = useState(false);
  const [currentOutfit, setCurrentOutfit] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  
  const history = useHistory();

  // Effect to handle the countdown timer and open modal when countdown finishes
  useEffect(() => {
    let timer;
    if (isGenerating && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    if (isGenerating && timeLeft === 0) {
      setIsGenerating(false);
      // Open the modal after countdown finishes
      if (currentOutfit) {
        setIsGenerationModalOpen(true);
        // Display Success Toast Here
        toast.success('Outfit suggested successfully!', { autoClose: 1000 });
      }
    }
    return () => clearTimeout(timer);
  }, [isGenerating, timeLeft, currentOutfit]);

  // Handler for creating a new outfit
  const handleCreateOutfit = async () => {
    // Prevent multiple generations
    if (isGenerating) return;

    setIsGenerating(true);
    setTimeLeft(10); // Set countdown to 7 seconds
    setLoading(true);
    try {
      const response = await axios.post('/outfits/suggest', { user_id: userInfo.user_id });
      setOutfitSuggestions([response.data, ...outfits]);
      setCurrentOutfit(response.data);
      // Do not open the modal here; wait for countdown to finish
    } catch (err) {
      console.error("Error suggesting outfit:", err);
      toast.error("Failed to suggest outfit.", { autoClose: 3000 }); // Display error toast for 3 seconds
      setIsGenerating(false); // Stop generating if there's an error
      setTimeLeft(0); // Reset the countdown
    } finally {
      setLoading(false);
      // Do not set isGenerating(false) and setTimeLeft(0) here to allow countdown to proceed
    }
  };

  // Handler for viewing previous outfits
  const handleViewPreviousOutfits = () => {
    history.push('/previous-outfits');
  };

  // Handler to close the outfit generation modal
  const closeGenerationModal = () => {
    setIsGenerationModalOpen(false);
    setCurrentOutfit(null);
  };

  // Effect to directly manipulate the body's overflow style
  useEffect(() => {
    // Store the original overflow style
    const originalOverflow = document.body.style.overflow;

    // Prevent scrolling
    document.body.style.overflow = 'hidden';

    // Cleanup: Restore original overflow when component unmounts
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="outfit-suggestions">
      {/* Buttons Above the Description */}
      <div className="buttons-container">
        <button
          onClick={handleCreateOutfit}
          className="create-outfit-button"
          disabled={loading || isGenerating}
          aria-label="Create a new outfit suggestion"
        >
          <FaMagic style={{ marginRight: '8px' }} />
          {loading || isGenerating ? 'Suggesting Outfit...' : 'Generate Outfit'}
        </button>
        <button
          onClick={handleViewPreviousOutfits}
          className="view-previous-button"
          aria-label="View your previous outfit suggestions"
        >
          <FaArchive />
          View Previous Recommendations
        </button>
      </div>

      {/* Enhanced Description */}
      <div className={`outfit-description ${isGenerating ? 'hidden' : ''}`}>
        <h3>Unleash Your Style to the Fullest!</h3>
        <p>
          Discover personalized outfit recommendations tailored to your current weather and the latest fashion trends.
          <br />
          Our <strong>DressMeUp</strong> feature seamlessly blends practicality with style, ensuring you look your best every day.
        </p>
        <p>
          <strong>How It Works:</strong> Our intelligent system analyzes real-time weather data and trending fashion insights from top fashion magazines to curate customized outfit recommendations tailored for you. Each recommended outfit comes with direct links to purchase the items from eBay, making your shopping experience seamless.
          <br /> Whether you're dressing for a business meeting, a casual day out, or a special event, we've got you covered.
        </p>
        <p>
          Ready to revolutionize your wardrobe? Click <strong>"Generate Outfit"</strong> to let the magic happen, and don't forget to <strong>"View Previous Recommendations"</strong> to revisit our past suggestions!
        </p>
      </div>

      {/* User Testimonial - Positioned below the description box */}
      <blockquote className="testimonial">
        "Bruh, have you peeped LazYdrobe yet? It's straight fire, no cap! Their Outfit Suggestions be hittin' different, deadass boosted my drip game by 200%. I'm out here lookin' like a whole snack!" – <em>Professor Grewell</em>
      </blockquote>

      {/* Loading Pop-up */}
      {isGenerating && <LoadingPopup timeLeft={timeLeft} />}

      {/* Outfit Generation Modal */}
      {isGenerationModalOpen && currentOutfit && (
        <OutfitGenerationModal
          outfit={currentOutfit}
          closeModal={closeGenerationModal}
        />
      )}

      {/* Optionally display errors */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

OutfitSuggestions.propTypes = {
  outfits: PropTypes.array.isRequired,
  setOutfitSuggestions: PropTypes.func.isRequired,
  wardrobeItems: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

export default OutfitSuggestions;
