import axios from "axios";

const verifyRecaptcha = async token => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

  var verificationUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    secretKey +
    "&response=" +
    token;

  return await axios.post(verificationUrl);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;

  const { token } = data;

  try {
    const response = await verifyRecaptcha(token);

    if (response.data.success && response.data.score >= 0.5) {
      //INSERT LOGIC for saving data once the validation is complete
      return res.status(200).json({ status: "Success", message: "Yey! You are human" });
    } else {
      return res.json({status: "Failed", message: "Something went wrong, please try again!"});
    }

  } catch(error) {
    res.json({status: "Failed", message: "Something went wrong, please try again!"});
  }
};