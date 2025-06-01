export const ForgetPasswordEmail = (Otp, email) => {
  return `
        <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 40px;">
            <div style="max-width: 400px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 32px;">
                <div style="text-align: center; margin-bottom: 24px; object-fit: contain;">
                    <img src="https://res.cloudinary.com/dqdtek5qv/image/upload/f_auto,q_auto/xv7te98chd18fvy53tnf" alt="Social Logo" style="height: 40px;  object-fit: contain;" />
                </div>
                <h2 style="color: #4C68D5; text-align: center; margin-bottom: 16px;">Forgot Password?</h2>
                <p style="color: #333; text-align: center; margin-bottom: 24px;">
                    Hi,<br/>
                    We received a request to reset your password for your Social account.<br/>
                    Use the OTP below to reset your password:
                </p>
                <div style="background: #4C68D5; color: #fff; font-size: 2em; letter-spacing: 4px; text-align: center; border-radius: 6px; padding: 16px 0; margin-bottom: 24px;">
                    ${Otp}
                </div>
                <p style="color: #555; text-align: center;">
                    If you did not request a password reset, please ignore this email.
                </p>
            </div>
        </div>
    `;
}

export const WelcomeEmail = (name) => {
  return `
    <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 40px;">
      <div style="max-width: 400px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px; object-fit: contain;">
          <img src="https://res.cloudinary.com/dqdtek5qv/image/upload/f_auto,q_auto/xv7te98chd18fvy53tnf" alt="Social Logo" style="height: 40px;  object-fit: contain;" />
        </div>
        <h2 style="color: #4C68D5; text-align: center; margin-bottom: 16px;">Welcome to Social!</h2>
        <p style="color: #333; text-align: center; margin-bottom: 24px;">
          Hi ${name},<br/>
          Thank you for registering with Social. We're excited to have you on board! Start connecting, sharing, and growing your network today.
        </p>
        <p style="color: #555; text-align: center;">
          If you have any questions, feel free to reach out to our support team.
        </p>
        <p style="color: #333; text-align: center; margin-top: 32px;">
          Cheers,<br/>
          The Social Team
        </p>
      </div>
    </div>
  `;
}

export const RegistrationConfirmationEmail = (name) => {
  return `
    <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 40px;">
      <div style="max-width: 400px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px; object-fit: contain;">
          <img src="https://res.cloudinary.com/dqdtek5qv/image/upload/f_auto,q_auto/xv7te98chd18fvy53tnf" alt="Social Logo" style="height: 40px; object-fit: contain;" />
        </div>
        <h2 style="color: #4C68D5; text-align: center; margin-bottom: 16px;">Registration Successful!</h2>
        <p style="color: #333; text-align: center; margin-bottom: 24px;">
          Hi ${name},<br/>
          Thank you for registering with Social. Your account has been successfully created.
        </p>
        <p style="color: #555; text-align: center;">
          You can now log in and start using all the features of Social.
        </p>
        <p style="color: #333; text-align: center; margin-top: 32px;">
          Welcome aboard!<br/>
          The Social Team
        </p>
      </div>
    </div>
  `;
}
