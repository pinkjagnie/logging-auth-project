import nodemailer from "nodemailer";

export default async function handler(req, res) {

  const { firstName, email } = req.body;
  
  // TBD: CUSTOM LINK

  let mailTransporter = nodemailer.createTransport({
    host: 'mail55.mydevil.net',
    port: 587,
    secure: false,
    auth: {
      user: 'noreply@pinkjagnie.pl',
      pass: process.env.NEXT_PASS_CONFIRM_MAIL
    }
  });

  let mailDetails = {
    from: 'noreply@pinkjagnie.pl',
    to: email,
    subject: 'Confirm singing in to our site',
    text: `Please confirm singing in to our site by clicking to link below`, // plain text body
    html: `<b>Hello, ${firstName}! Please confirm singing in to our site by clicking to link below</b> <br/> <a href='http://www.google.pl'>www.google.pl</a>`, // html body
  };

  // let info = await mailTransporter.sendMail(mailDetails, function(err, data) {
  //   if(err) {
  //     console.log('Error Occurs');
  //     console.log(err)
  //   } else {
  //     console.log('Email sent successfully');
  //     console.log("Message sent: %s", info.messageId);
  //   }
  // });

  try {
    await mailTransporter.sendMail(mailDetails);
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
  return res.status(200).json({ error: "" });

}