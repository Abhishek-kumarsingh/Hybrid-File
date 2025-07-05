# PrepGenius

This directory contains the PrepGenius project. Add project details, setup instructions, and usage information here.

# InterviewPro

InterviewPro is an AI-powered interview practice platform that helps job seekers prepare for technical interviews through realistic simulations with voice and text-based interactions.

## Features

- **AI-Powered Interviews**: Practice with an AI interviewer that asks relevant technical questions
- **Voice & Text Modes**: Choose between voice-based or text-based interview formats
- **Job-Specific Questions**: Upload job descriptions to get tailored interview questions
- **Resume Analysis**: Upload your resume for personalized interview experiences
- **Detailed Feedback**: Receive comprehensive feedback on your interview performance
- **Progress Tracking**: Monitor your improvement over time with detailed analytics

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/interview-pro.git
   cd interview-pro
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_API_URL=https://api.interviewpro.example.com
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

```
src/
├── components/         # UI components
│   ├── auth/           # Authentication components
│   ├── common/         # Reusable components
│   ├── dashboard/      # Dashboard components
│   ├── feedback/       # Feedback components
│   ├── interview/      # Interview components
│   └── layout/         # Layout components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── services/           # API services
├── styles/             # Global styles and theme
├── utils/              # Utility functions
└── App.jsx             # Main application component
```

## Voice Interview Feature

The voice interview feature uses the Web Speech API to provide a realistic interview experience:

- **Speech Recognition**: Captures user's spoken responses
- **Speech Synthesis**: Enables the AI interviewer to speak questions
- **Real-time Transcription**: Shows what the system is hearing as you speak

### Browser Compatibility

The voice interview feature works best in:
- Google Chrome (desktop)
- Microsoft Edge
- Safari (macOS)

Some features may have limited functionality in Firefox and mobile browsers.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- Web Speech API for speech recognition and synthesis