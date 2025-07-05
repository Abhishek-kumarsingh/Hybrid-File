/**
 * Welcome Email Template
 */
export const welcomeEmailTemplate = ({ name, loginLink }) => {
    return `
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Platform!</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .email-container {
        border: 1px solid #e1e1e1;
        border-radius: 5px;
        padding: 20px;
        background-color: #f9f9f9;
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #e1e1e1;
      }
      .logo {
        max-height: 60px; /* Adjust if you have a logo */
      }
      .content {
        padding: 20px 0;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #10b981; /* Emerald color, adjust as needed */
        color: white !important;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        margin: 20px 0;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 0.8em;
        color: #666;
      }
    </style>
  
    <div class="email-container">
      <div class="header">
        <!-- <img src="YOUR_LOGO_URL" alt="Company Logo" class="logo"> -->
        <h1>Welcome, ${name}!</h1>
      </div>
      <div class="content">
        <p>We're thrilled to have you join the Property Management System!</p>
        <p>Your account has been successfully created. If you haven't already, please make sure to verify your email address (if a verification email was sent separately).</p>
        
        <p>You can now log in to your account and start exploring:</p>
        <p style="text-align: center;">
          <a href="${loginLink}" class="button">Log In to Your Account</a>
        </p>
        
        <p>If you have any questions or need assistance, don't hesitate to contact our support team.</p>
        
        <p>Best regards,<br>The Property Management Team</p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Property Management System. All rights reserved.</p>
      </div>
    </div>
    `;
};