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
      "Brochure_compressed.pdf"
    );

    const brochure2Path = path.join(
      process.cwd(),
      "public",
      "Sponsorship Brochure_compressed.pdf"
    );

    const brochure1Buffer = fs.readFileSync(brochure1Path);
    const brochure2Buffer = fs.readFileSync(brochure2Path);

    companiesEmailList.map(async (companiesData: any) => {

      const template = `<!DOCTYPE html>
<html>
<head>
    <title>E-Summit '26 Invitation</title>
</head>
<body>

<p>Dear ${companiesData.companyName},</p>

<p><strong>Greetings from E-Cell IIT Ropar!</strong></p>

<p>
We are delighted to invite your institution to participate in 
<strong>E-Summit ’26</strong>, our flagship entrepreneurial event that brings together 
<strong>innovators, founders, investors, and students from across the country</strong>.
</p>

<p>
The summit offers a wide range of opportunities for students to 
<strong>learn, compete, and network</strong>. Key highlights of the event include the 
<strong>Startup Expo</strong>, where budding startups can showcase their ideas and receive 
support like <strong>AWS and PayU credits</strong>, and the 
<strong>Investors Arena</strong>, featuring an impressive investment pool of 
<strong>over ₹20 Crores</strong> for aspiring founders.
</p>

<p>
To enrich learning, <strong>E-Summit ’26</strong> will host 
<strong>Leaders Talk sessions</strong> with renowned personalities like 
<strong>Anubhav Dubey</strong>, along with the 
<strong>Creators Conclave</strong>, focusing on the rapidly growing 
<strong>creator economy</strong>. Participants can also engage in 
<strong>hands-on workshops in Finance and Entrepreneurship</strong> to gain practical insights.
</p>

<p>
The summit also provides excellent career opportunities through the 
<strong>Intern Fair</strong>, enabling students to connect directly with 
<strong>recruiters for internship roles</strong>.
</p>

<p>
Adding to the excitement, <strong>E-Summit ’26</strong> will feature a vibrant lineup of 
<strong>cultural and entertainment events</strong>, including a 
<strong>Bike Stunt Show</strong>, 
<strong>Comedy Show</strong>, 
<strong>live singing performances</strong>, 
<strong>Fashion Show</strong>, and an 
<strong>electrifying Light Dance Show</strong>, ensuring a perfect blend of 
<strong>learning and entertainment</strong>.
</p>

<p>
Students can also participate in <strong>11–12 dynamic competitions</strong> such as 
<strong>Pitch120, GTM Case, Brand Remix, Startup Sprint, Trade League, Sigma Sprint, 
Case Study, IPL Auction House, and AI Hackathon</strong>, with 
<strong>cash prizes ranging from ₹15,000 to ₹20,000</strong>.
</p>

<p>
Additionally, immersive simulations like 
<strong>Lok Sabha and Corporation Crisis Board</strong> will offer participants a chance to experience 
<strong>real-time decision-making and problem-solving</strong> in high-pressure environments.
</p>

<p>
We encourage you to share this opportunity with your students and motivate them to be a part of this 
<strong>enriching experience</strong>.
</p>

<p>
For further details and registration, please visit:<br>
<a href="https://unstop.com/college-fests/e-summit-2026-indian-institute-of-technology-iit-ropar-446778">
https://unstop.com/college-fests/e-summit-2026-indian-institute-of-technology-iit-ropar-446778
</a>
</p>

<p>
<strong>We look forward to your institution’s enthusiastic participation.</strong>
</p>

<p>
Warm regards,<br>
<strong>Team E-Cell IIT Ropar</strong>
</p>

</body>
</html>`


      await transporter.sendMail({
        from: `"E-Cell IIT Ropar" <${process.env.GMAIL_USER}>`,
        bcc: companiesData.emailList,
        subject: "Invitation to Participate in E-Summit ’26 | IIT Ropar",
        html: template,
        attachments: [
          {
            filename: "E-Summit'26 Brochure.pdf",
            content: brochure1Buffer,
            contentType: "application/pdf"
          },
          {
            filename: "Sponsorship Brochure.pdf",
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