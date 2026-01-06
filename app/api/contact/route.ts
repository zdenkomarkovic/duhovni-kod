import { NextRequest, NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY || '',
  process.env.MAILJET_SECRET_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ime, prezime, email, telefon, message } = body;

    // Validate required fields
    if (!ime || !prezime || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Сва обавезна поља морају бити попуњена.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Неисправна емаил адреса.' },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailHtml = `
      <h2>Нова порука са контакт форме</h2>
      <p><strong>Име:</strong> ${ime}</p>
      <p><strong>Презиме:</strong> ${prezime}</p>
      <p><strong>Емаил:</strong> ${email}</p>
      ${telefon ? `<p><strong>Телефон:</strong> ${telefon}</p>` : ''}
      <p><strong>Порука:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    const emailText = `
Нова порука са контакт форме

Име: ${ime}
Презиме: ${prezime}
Емаил: ${email}
${telefon ? `Телефон: ${telefon}` : ''}
Порука:
${message}
    `;

    // Send email via Mailjet
    const result = await mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.SITE_MAIL_SENDER || '',
              Name: 'Duhovni Kod Kontakt Forma'
            },
            To: [
              {
                Email: process.env.SITE_MAIL_RECEIVER || '',
                Name: 'Duhovni Kod'
              }
            ],
            ReplyTo: {
              Email: email,
              Name: `${ime} ${prezime}`
            },
            Subject: `Контакт форма: Порука од ${ime} ${prezime}`,
            TextPart: emailText,
            HTMLPart: emailHtml
          }
        ]
      });

    return NextResponse.json(
      { success: true, message: 'Порука је успешно послата!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Mailjet error:', error);
    return NextResponse.json(
      { success: false, message: 'Дошло је до грешке приликом слања поруке. Покушајте поново.' },
      { status: 500 }
    );
  }
}
