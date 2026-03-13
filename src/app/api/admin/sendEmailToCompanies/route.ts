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
                    <html lang="en">
                    <head>
                      <meta charset="UTF-8">
                      <title>Invitation to Collaborate with E-Summit | IIT Ropar</title>
                    </head>
                    <body style="font-family: Arial, Helvetica, sans-serif; line-height:1.6; color:#333;">

                    <p>Dear <strong>${companiesData.companyName}</strong> Team,</p>

                    <p><strong>Greetings from IIT Ropar!</strong><br>
                    I hope this message finds you well.</p>

                    <p>
                    We are pleased to invite <strong>${companiesData.companyName}</strong> to collaborate with 
                    <strong>E-Summit 2026</strong>, the flagship entrepreneurial event of 
                    <strong>IIT Ropar</strong> and <strong>Punjab’s largest entrepreneurship festival</strong>, 
                    organized by the <strong>Entrepreneurship Cell</strong>, scheduled for 
                    <strong>11–12 April 2026</strong>.
                    </p>

                    <p>
                    <strong>IIT Ropar</strong>, an <strong>Institute of National Importance</strong>, is known for its 
                    strong academic foundation, growing startup ecosystem, and focus on 
                    <strong>technology-driven innovation</strong>.
                    </p>

                    <p>
                    <strong>E-Summit</strong> serves as a dynamic platform bringing together 
                    <strong>startups, innovators, investors, industry leaders</strong>, and over 
                    <strong>8,000+ students</strong> from premier institutions across the country.
                    </p>

                    <p>
                    Over the years, the summit has hosted eminent personalities and industry leaders such as 
                    <strong>Ashneer Grover</strong>, <strong>Suresh Prabhu</strong>, 
                    <strong>Praveer Sinha</strong>, and <strong>Shankar Venugopal</strong>, 
                    among other distinguished speakers, reflecting the event’s credibility, scale, and impact 
                    within the entrepreneurial ecosystem.
                    </p>

                    <p>
                    As a leading organization in the <strong>Education/EdTech sector</strong>, your association with 
                    <strong>E-Summit</strong> would enable direct engagement with ambitious students seeking 
                    <strong>skill development, mentorship, and career advancement opportunities</strong>.
                    </p>

                    <p><strong>Key Events to Highlight:</strong></p>

                    <ul>
                    <li><strong>Startup Expo</strong> – A dynamic exhibition space featuring promising startups, product demos, and emerging technologies.</li>

                    <li><strong>Intern Fair</strong> – A curated recruitment platform connecting companies with skilled students seeking internships and project opportunities.</li>

                    <li><strong>Hackathons</strong> – High-intensity innovation challenges where participants build scalable solutions to real-world problems.</li>

                    <li><strong>Workshops</strong> – Interactive, hands-on learning sessions designed to equip participants with practical skills, industry insights, and career-ready competencies.</li>

                    <li><strong>Leadership Talk</strong> – A special address by senior leadership on the evolving landscape of education, future-ready skills, and bridging the gap between academia and industry.</li>
                    </ul>

                    <p><strong>Proposed Collaboration Deliverables:</strong></p>

                    <ul>
                    <li><strong>Branded Workshop Slot</strong> with exclusive visibility and curated participant base</li>

                    <li><strong>On-Ground Kiosk/Booth</strong> for student engagement, registrations, and counseling</li>

                    <li><strong>High-Visibility Branding</strong> through banners, backdrops, and stage integration</li>

                    <li><strong>Social Media Amplification</strong> across pre-event campaigns and coverage</li>

                    <li><strong>Speaking Opportunity</strong> for leadership engagement</li>

                    <li><strong>Logo Integration</strong> across website, creatives, and official event collaterals</li>

                    <li><strong>Certificate Branding</strong> for workshops or competitions (where applicable)</li>
                    </ul>

                    <p>
                    This partnership would enable <strong>${companiesData.companyName}</strong> to strengthen its brand presence 
                    among ambitious learners and future entrepreneurs while contributing to the development of an 
                    <strong>industry-ready and skill-driven talent ecosystem</strong>.
                    </p>

                    <p>
                    We would be delighted to explore a meaningful collaboration with your organization, offering the 
                    opportunity to engage with a <strong>highly ambitious and academically driven student community</strong>.
                    Please find attached the <strong>event brochure</strong> and a brief <strong>pitch deck</strong> 
                    outlining <strong>E-Summit 2026</strong> and potential avenues for collaboration.
                    </p>

                    <p>
                    We would be happy to connect at your convenience to discuss this further and tailor a partnership 
                    that aligns with your objectives.
                    </p>

                    <p>
                    <strong>We look forward to your positive response.</strong>
                    </p>

  <p>
    Thanks & Regards<br><br>

    <strong>E-Summit Sponsorship Team Heads</strong><br>

    <strong>Dev Jain | +91 9811776785</strong><br>
    <strong>Aditi Garg | +91 9306039034</strong><br>
  </p>

</body>
</html>
`


      await transporter.sendMail({
        from: `"E-Cell IIT Ropar" <${process.env.GMAIL_USER}>`,
        bcc: companiesData.emailList,
        subject: "Invitation to Collaborate with E-Summit | IIT Ropar",
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