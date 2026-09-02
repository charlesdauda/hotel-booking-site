import nodemailer from 'nodemailer';

let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }

  return transporter;
};

export const verifyEmailConfiguration = async () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email credentials are not configured.');
  }

  await getTransporter().verify();
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const buildReceiptHtml = ({ orderId, guestName, bookings }) => {
  const total = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  const rows = bookings
    .map(
      (b) => `
    <tr>
      <td style="padding: 16px 0; border-bottom: 1px solid #eee;">
        <p style="margin:0; font-family: Georgia, serif; font-size: 18px; color: #1a1a1a;">${b.roomName}</p>
        <p style="margin: 4px 0 0; font-size: 13px; color: #888;">
          ${formatDate(b.checkIn)} &rarr; ${formatDate(b.checkOut)} &middot; ${b.nights} night${b.nights > 1 ? 's' : ''} &times; ${b.quantity} room${b.quantity > 1 ? 's' : ''}
        </p>
      </td>
      <td style="padding: 16px 0; border-bottom: 1px solid #eee; text-align: right; font-family: Georgia, serif; font-size: 18px; color: #bf9b6a; white-space: nowrap;">
        $${b.totalPrice}
      </td>
    </tr>`
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0; padding:0; background-color:#f6f2ea; font-family: Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f2ea; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; max-width: 600px; width: 100%;">

            <tr>
              <td style="background-color:#0f2c3f; padding: 40px; text-align:center;">
                <p style="margin:0; color:#bf9b6a; font-size:12px; letter-spacing:4px; text-transform:uppercase; font-weight:bold;">
                  Sheraton Hotel &amp; Resort
                </p>
                <h1 style="margin:12px 0 0; color:#ffffff; font-family: Georgia, serif; font-size: 28px; font-weight:normal;">
                  Booking Confirmed
                </h1>
              </td>
            </tr>

            <tr><td style="height:6px; background-color:#bf9b6a;"></td></tr>

            <tr>
              <td style="padding: 40px;">
                <p style="margin:0 0 4px; font-size:13px; color:#999; text-transform:uppercase; letter-spacing:2px;">
                  Confirmation
                </p>
                <p style="margin:0 0 24px; font-size:14px; color:#555;">
                  Order #${orderId.slice(0, 8).toUpperCase()}
                </p>

                <p style="font-size:16px; color:#333; margin: 0 0 24px;">
                  Hi ${guestName}, thank you for booking with us. Here's a summary of your reservation:
                </p>

                <table width="100%" cellpadding="0" cellspacing="0">
                  ${rows}
                  <tr>
                    <td style="padding: 20px 0 0; font-weight:bold; color:#0f2c3f; font-size:15px;">Total</td>
                    <td style="padding: 20px 0 0; text-align:right; font-family: Georgia, serif; font-size:24px; color:#0f2c3f;">$${total}</td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
                  <tr>
                    <td style="background-color:#f5ede0; padding: 20px; font-size:13px; color:#555; line-height:1.6;">
                      We'll be in touch shortly to finalize your stay. If you have any questions, reach us anytime at
                      <a href="mailto:charlesdauda676@gmail.com" style="color:#bf9b6a;">charlesdauda676@gmail.com</a>
                      or call +233 546 627 2444.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding: 24px 40px; text-align:center; background-color:#0f2c3f;">
                <p style="margin:0; color:#8a99a3; font-size:12px;">
                  Sheraton Hotel &amp; Resort &middot; McCarthy Hills, Accra, Ghana
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

export const sendBookingConfirmation = async ({ orderId, guestName, email, bookings }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email credentials are not configured.');
  }

  const mailTransporter = getTransporter();
  const html = buildReceiptHtml({ orderId, guestName, bookings });

  const result = await mailTransporter.sendMail({
    from: `"Sheraton Hotel & Resort" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Booking Confirmation — Order #${orderId.slice(0, 8).toUpperCase()}`,
    html,
  });

  return result.messageId;
};