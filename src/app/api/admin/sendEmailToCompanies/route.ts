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
      "E-Summit'26 Brochure (2)-compressed.pdf"
    );

    const brochure2Path = path.join(
      process.cwd(),
      "public",
      "Proposal for Collobration (1).pdf"
    );

    const brochure1Buffer = fs.readFileSync(brochure1Path);
    const brochure2Buffer = fs.readFileSync(brochure2Path);

    companiesEmailList.map(async (companiesData: any) => {

      const template = `<!DOCTYPE html>
<html>
<body>

<p><strong>Dear ${companiesData.companyName} Team,</strong></p>

<p><strong>Greetings from IIT Ropar!</strong><br>
I hope this message finds you well.</p>

<p>We are pleased to invite <strong>${companiesData.companyName}</strong> to collaborate with <strong>E-Summit 2026</strong>, the flagship entrepreneurial event of IIT Ropar and Punjab’s largest entrepreneurship festival, organized by the Entrepreneurship Cell, scheduled for <strong>11-12 April 2026</strong>. IIT Ropar, an Institute of National Importance, is known for its strong academic foundation, growing startup ecosystem, and focus on technology-driven innovation.</p>

<p>E-Summit serves as a dynamic platform bringing together startups, innovators, investors, industry leaders, and over <strong>3,000+ students</strong> from premier institutions across the country. Over the years, the summit has hosted eminent personalities and industry leaders such as Ashneer Grover, Suresh Prabhu, Praveer Sinha, and Shankar Venugopal, among other distinguished speakers.</p>

<p>As a leading organization in the <strong>Food/Healthcare sector</strong>, your association with E-Summit presents an excellent opportunity to engage with a young, health-conscious, and innovation-driven audience.</p>

<p><strong>Key Events to Highlight:</strong></p>

<ul>
  <li><strong>Startup Expo</strong> – A dynamic exhibition space featuring promising startups, product demos, and emerging technologies.</li>
  <li><strong>Intern Fair</strong> – A curated recruitment platform connecting companies with skilled students seeking internships and project opportunities.</li>
  <li><strong>Hackathons</strong> – High-intensity innovation challenges where participants build scalable solutions to real-world problems.</li>
  <li><strong>Leadership Talk</strong> – A featured address by senior leadership on innovation in nutrition/healthcare and preventive wellness trends.</li>
</ul>

<p><strong>Proposed Collaboration Deliverables:</strong></p>

<ul>
  <li>On-Ground Branded Kiosk for product display, sampling, health check-ups, or interactive engagement</li>
  <li>High-Visibility Branding through banners, backdrops, and stage integration</li>
  <li>Product Integration Opportunities during competitions or delegate kits</li>
  <li>Title/Associate Partnership with relevant event segment</li>
  <li>Social Media Amplification across pre-event promotions and live coverage</li>
  <li>Speaking Opportunity for leadership engagement</li>
</ul>

<p>This partnership would enable <strong>${companiesData.companyName}</strong> to strengthen its brand presence among health-conscious students and emerging entrepreneurs while contributing to a more wellness-driven and sustainable innovation ecosystem.</p>

<p>We would be delighted to explore a meaningful collaboration with your organization and engage with a highly ambitious and academically driven student community. Please find attached the event brochure and a brief pitch deck outlining E-Summit 2026 and potential avenues for collaboration.</p>

<p>We would be happy to connect at your convenience to discuss this further.</p>

<p><strong>We look forward to your positive response.</strong></p>

</body>
</html>
`


      await transporter.sendMail({
        from: `"E-Cell IIT Ropar" <${process.env.GMAIL_USER}>`,
        bcc: companiesData.emails,
        subject: "Invitation to Collaborate with E-Summit | IIT Ropar",
        html: template,
        attachments: [
          {
            filename: "E-Summit'26 Brochure.pdf",
            content: brochure1Buffer,
            contentType: "application/pdf"
          },
          {
            filename: "Proposal.pdf",
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