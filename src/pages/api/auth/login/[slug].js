import connectToDatabase from '../../../../../lib/db';
import User from '../../../../../models/User';

async function handler(req, res) {
  if (req.method === 'PATCH') {
    const {slug} = req.query;

    const { email, userID, otpCode } = req.body;

    await connectToDatabase();

    try {
      await User.findOneAndUpdate({ userID: userID }, { otpCode: otpCode });
      console.log('GOTOWEEEEEEEEEEEEEEEEEEEEEEEEEEEE UPDATE O CODE ' + userID + 'CODDEEEEE ' + otpCode)
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Failed" });
      return;
    }

    res
    .status(200)
    .json({ message: "User data updated!" });
    } 
    // else {
    //   console.log("TUTAJ")
      
    //   const {slug} = req.query;

    //   const { active } = req.body;

    //   await connectToDatabase();

    //   let results;

    //   try {
    //     results = await User.find({ userID: slug })
    //   } catch (error) {
    //     res.status(500).json({ message: "Failed" });
    //     return;
    //   }
      
    //   console.log('z apiiiiii results  ' + results)

    //   res.status(200).json(results);
    // }
}

export default handler;