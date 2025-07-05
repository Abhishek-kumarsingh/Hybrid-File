/**
 * Password Reset Email Template
 */
export const resetPasswordEmailTemplate = ({ name, resetLink }) => {
    return `
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
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
        background-color: #f59e0b; /* Amber color, adjust as needed */
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
        <h1>Password Reset Request</h1>
      </div>
      <div class="content">
        <p>Hello ${name},</p>
        <p>We received a request to reset your password for your account. If you did not make this request, you can safely ignore this email.</p>
        
        <p>To reset your password, please click the button below:</p>
        <p style="text-align: center;">
          <a href="${resetLink}" class="button">Reset Your Password</a>
        </p>
        
        <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
        <p style="word-break: break-all;"><a href="${resetLink}">${resetLink}</a></p>
        
        <p>This password reset link will expire in 1 hour.</p>
        
        <p>Best regards,<br>The Property Management Team</p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Property Management System. All rights reserved.</p>
      </div>
    </div>
    `;
};