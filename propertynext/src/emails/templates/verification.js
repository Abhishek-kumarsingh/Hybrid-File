/**
 * Email verification template 
 */
export const verificationEmailTemplate = ({ name, verificationLink }) => {
    return `
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
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
        max-height: 60px;
      }
      .content {
        padding: 20px 0;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #3b82f6;
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
        <h1>Email Verification</h1>
      </div>
      <div class="content">
        <p>Hello ${name},</p>
        <p>Thank you for registering with our Property Management System. Please verify your email address to complete your registration and access all features of our platform.</p>
        
        <p style="text-align: center;">
          <a href="${verificationLink}" class="button">Verify Email Address</a>
        </p>
        
        <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
        <p style="word-break: break-all;"><a href="${verificationLink}">${verificationLink}</a></p>
        
        <p>This verification link will expire in 24 hours.</p>
        
        <p>If you didn't create an account with us, you can safely ignore this email.</p>
        
        <p>Best regards,<br>The Property Management Team</p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Property Management System. All rights reserved.</p>
      </div>
    </div>
    `;
};
