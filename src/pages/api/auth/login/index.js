import nodemailer from "nodemailer";

export default async function handler(req, res) {

  const { firstName, email, userID, otpCode } = req.body;
  
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
    subject: '🔐 Your secret code to confirm login in',
    text: `Please confirm that you are the one trying to log into your account.`, // plain text body
    html: `<b>Hello, ${firstName}! Please confirm that you are the one trying to log into your account.</b> <br/> 
      <b>Your secret code is:</b> <br/> 
      <b>${otpCode}</b> <br/> 
      <b>Click on the link below and enter the above code there</b> <br/> 
      <a href='http://localhost:3000/user/login/${userID}' target="_blank">click here</a>`, // html body
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