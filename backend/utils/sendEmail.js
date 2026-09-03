import nodemailer from 'nodemailer';

let transporter;

const isResendProvider = () =>
  process.env.EMAIL_PROVIDER?.trim().toLowerCase() === 'resend' ||
  Boolean(process.env.RESEND_API_KEY);

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      family: 4,
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
  if (isResendProvider()) {
    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
      throw new Error('Resend is not configured. Set RESEND_API_KEY and EMAIL_FROM.');
    }

    const response = await fetch('https://api.resend.com/domains', {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    });

    if (!response.ok) {
      throw new Error(`Resend API rejected the key (HTTP ${response.status}).`);
    }

    return;
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Gmail credentials are not configured.');
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
      <td style="padding: 16px 0; border-bottom: 1px solid #e6ded5;">
        <p style="margin:0; font-family: Georgia, serif; font-size: 18px; color: #1a1a1a;">${b.roomName}</p>
        <p style="margin: 4px 0 0; font-size: 13px; color: #6f6259;">
          ${formatDate(b.checkIn)} &rarr; ${formatDate(b.checkOut)} &middot; ${b.nights} night${b.nights > 1 ? 's' : ''} &times; ${b.quantity} room${b.quantity > 1 ? 's' : ''}
        </p>
      </td>
      <td style="padding: 16px 0; border-bottom: 1px solid #e6ded5; text-align: right; font-family: Georgia, serif; font-size: 18px; color: #a66f45; white-space: nowrap;">
        $${b.totalPrice}
      </td>
    </tr>`
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0; padding:0; background-color:#ffffff; font-family: Arial, Helvetica, sans-serif; color:#171513;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; max-width: 600px; width: 100%; border:1px solid #e6ded5;">

            <tr>
              <td style="background-color:#171513; padding: 40px; text-align:center;">
                <p style="margin:0; color:#a66f45; font-size:12px; letter-spacing:4px; text-transform:uppercase; font-weight:bold;">
                  Sheraton Hotel &amp; Resort
                </p>
                <h1 style="margin:12px 0 0; color:#ffffff; font-family: Georgia, serif; font-size: 28px; font-weight:normal;">
                  Booking Confirmed
                </h1>
              </td>
            </tr>

            <tr><td style="height:6px; background-color:#a66f45;"></td></tr>

            <tr>
              <td style="padding: 40px;">
                <p style="margin:0 0 4px; font-size:13px; color:#999; text-transform:uppercase; letter-spacing:2px;">
                  Confirmation
                </p>
                <p style="margin:0 0 24px; font-size:14px; color:#6f6259;">
                  Order #${orderId.slice(0, 8).toUpperCase()}
                </p>

                <p style="font-size:16px; color:#171513; margin: 0 0 24px;">
                  Hi ${guestName}, thank you for booking with us. Here's a summary of your reservation:
                </p>

                <table width="100%" cellpadding="0" cellspacing="0">
                  ${rows}
                  <tr>
                    <td style="padding: 20px 0 0; font-weight:bold; color:#171513; font-size:15px;">Total</td>
                    <td style="padding: 20px 0 0; text-align:right; font-family: Georgia, serif; font-size:24px; color:#a66f45;">$${total}</td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
                  <tr>
                    <td style="background-color:#faf7f4; border-left:4px solid #a66f45; padding: 20px; font-size:13px; color:#6f6259; line-height:1.6;">
                      We'll be in touch shortly to finalize your stay. If you have any questions, reach us anytime at
                      <a href="mailto:charlesdauda676@gmail.com" style="color:#a66f45;">charlesdauda676@gmail.com</a>
                      or call +233 546 627 2444.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding: 24px 40px; text-align:center; background-color:#171513;">
                <p style="margin:0; color:#d8c9bd; font-size:12px;">
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
  const html = buildReceiptHtml({ orderId, guestName, bookings });

  if (isResendProvider()) {
    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
      throw new Error('Resend is not configured. Set RESEND_API_KEY and EMAIL_FROM.');
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to: [email],
        subject: `Booking Confirmation — Order #${orderId.slice(0, 8).toUpperCase()}`,
        html,
      }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || `Resend returned HTTP ${response.status}.`);
    }

    return result.id;
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Gmail credentials are not configured.');
  }

  const mailTransporter = getTransporter();

  const result = await mailTransporter.sendMail({
    from: `"Sheraton Hotel & Resort" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Booking Confirmation — Order #${orderId.slice(0, 8).toUpperCase()}`,
    html,
  });

  return result.messageId;
};