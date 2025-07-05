import { useState, useEffect, useCallback } from 'react';

const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [browserSupported, setBrowserSupported] = useState(false);
  
  // Check if browser supports speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setBrowserSupported(!!SpeechRecognition);
  }, []);
  
  // Initialize speech recognition
  useEffect(() => {
    if (!browserSupported) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
    };
    
    recognition.onerror = (event) => {
      setError(event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      }
    };
    
    // Start/stop recognition based on isListening state
    if (isListening) {
      try {
        recognition.start();
      } catch (err) {
        console.error('Recognition error:', err);
      }
    }
    
    // Cleanup
    return () => {
      recognition.stop();
    };
  }, [isListening, browserSupported]);
  
  // Start listening
  const startListening = useCallback(() => {
    setError(null);
    setIsListening(true);
  }, []);
  
  // Stop listening
  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);
  
  // Reset transcript
  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);
  
  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupported,
    error
  };
};

export default useSpeechRecognition;
