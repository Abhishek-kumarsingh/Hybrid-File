"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AOSInitializer() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 50,
    });
  }, []);

  return null; // This component doesn't render anything
}
