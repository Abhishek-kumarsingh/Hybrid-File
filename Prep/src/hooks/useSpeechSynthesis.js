import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for using the Web Speech API's SpeechSynthesis
 * @returns {Object} - Speech synthesis state and control functions
 */
const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const [error, setError] = useState(null);
  
  // Check if browser supports speech synthesis
  useEffect(() => {
    setSupported(!!window.speechSynthesis);
  }, []);
  
  // Get available voices
  useEffect(() => {
    if (!supported) return;
    
    // Function to set voices
    const setAvailableVoices = () => {
      const voiceOptions = window.speechSynthesis.getVoices();
      setVoices(voiceOptions);
    };
    
    // Set voices if already available
    setAvailableVoices();
    
    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = setAvailableVoices;
    }
    
    return () => {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [supported]);
  
  // Speak text
  const speak = useCallback((text, options = {}) => {
    if (!supported) {
      setError('Speech synthesis not supported');
      return;
    }
    
    // Cancel any ongoing speech
    cancel();
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set options
    if (options.voice && voices.length) {
      utterance.voice = voices.find(voice => voice.name === options.voice) || voices[0];
    }
    
    if (options.rate) utterance.rate = options.rate;
    if (options.pitch) utterance.pitch = options.pitch;
    if (options.volume) utterance.volume = options.volume;
    
    // Set event handlers
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (event) => {
      setError(event.error);
      setSpeaking(false);
    };
    
    // Speak
    window.speechSynthesis.speak(utterance);
  }, [supported, voices]);
  
  // Cancel speech
  const cancel = useCallback(() => {
    if (!supported) return;
    
    setSpeaking(false);
    window.speechSynthesis.cancel();
  }, [supported]);
  
  // Pause speech
  const pause = useCallback(() => {
    if (!supported) return;
    
    window.speechSynthesis.pause();
  }, [supported]);
  
  // Resume speech
  const resume = useCallback(() => {
    if (!supported) return;
    
    window.speechSynthesis.resume();
  }, [supported]);
  
  return {
    speak,
    cancel,
    pause,
    resume,
    speaking,
    supported,
    voices,
    error
  };
};

export default useSpeechSynthesis;
