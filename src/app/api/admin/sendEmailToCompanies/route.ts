import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import path from "path";
import fs from "fs"

export async function POST(req: NextRequest) {
  try {
    const companiesEmailList = require('@/lib/output.json')
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });



    const brochure1Path = path.join(
      process.cwd(),
      "public",
      "E-Summit Brochure (1).pdf"
    );

    const brochure2Path = path.join(
      process.cwd(),
      "public",
      "E-summit Sponsorship Brochure (2) (1).pdf"
    );

    const brochure1Buffer = fs.readFileSync(brochure1Path);
    const brochure2Buffer = fs.readFileSync(brochure2Path);

    companiesEmailList.map(async (companiesData: any) => {

      const template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>E-Summit 2026 Invitation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .bold {
      font-weight: bold;
    }
    p {
      margin-bottom: 15px;
    }
  </style>
</head>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Following up: Collaboration Opportunity with E-Summit 2026, IIT Ropar</title>
</head>
<body>
    <p>Dear <strong>${companiesData.companyName} Team</strong>,</p>

    <p>Greetings from the <strong>Entrepreneurship Cell, IIT Ropar</strong>.</p>

    <p>
    I hope you are doing well. I wanted to follow up on my previous email regarding a potential collaboration with 
    <strong>E-Summit 2026</strong>, scheduled for <strong>11–12 April 2026</strong> at IIT Ropar.
    </p>

    <p>
    As one of North India’s largest entrepreneurship gatherings, the summit brings together 
    <strong>startups, industry leaders, innovators, and 5,000+ students from premier institutions</strong>, 
    offering brands a strong platform to engage with a highly talented and future-focused audience. 
    Being hosted at an IIT, the event also provides access to some of the most promising minds across 
    the IIT and startup ecosystem.
    </p>

    <p>
    Given <strong>${companiesData.companyName}</strong>’s strong presence in the <strong>automotive/civil/infrastructure sector</strong>, 
    we believe this collaboration could create meaningful engagement through platforms such as the 
    <strong>Startup Expo, Leadership Talks, Innovation Showcases, and Intern Fair</strong>, 
    enabling both brand visibility and interaction with talented engineering students interested in 
    infrastructure development, mobility, and emerging technologies.
    </p>

    <p>
    We would love to explore how we can tailor this partnership to align with your current priorities — 
    whether that is <strong>brand positioning, talent engagement, recruitment visibility, or industry presence</strong>.
    </p>

    <p>
    If this email has reached someone outside the relevant team, we would truly appreciate it if you could kindly loop in the appropriate person.
    </p>

    <p>
    Please let us know a convenient time for a quick 10–15 minute discussion. We would be happy to share a concise overview and explore possible collaboration formats.
    </p>

    <p>
    Looking forward to hearing from you.
    </p>

  <p>Thanks and Regards,<br/>
  <span class="bold">E-Summit Sponsorship Team Heads
  <br/>
  Dev Jain |  +91 9811776785
  <br/>
  Aditi Garg | +91 9306039034</p>
</body>
</html>
`


      await transporter.sendMail({
        from: `"E-Cell IIT Ropar" <${process.env.GMAIL_USER}>`,
        bcc: companiesData.emailList,
        subject: "Following up: Collaboration Opportunity with E-Summit 2026, IIT Ropar",
        html: template,
        attachments: [
          {
            filename: "E-Summit Brochure.pdf",
            content: brochure1Buffer,
            contentType: "application/pdf"
          },
          {
            filename: "E-Summit Sponsorship Brochure.pdf",
            content: brochure2Buffer,
            contentType: "application/pdf"
          }
        ]
      });


    })


    return NextResponse.json({
      success: true,
      message: "Email sent successfully"
    }, { status: 200 })

  } catch (error: any) {
    console.log(error)
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 })

  }
}