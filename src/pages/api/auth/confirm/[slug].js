import connectToDatabase from '../../../../../lib/db';
import UserSchema from '../../../../../models/User';

async function handler(req, res) {
  if (req.method === 'PATCH') {
    const {slug} = req.query;

    const { active } = req.body;

    await connectToDatabase();

    try {
      await UserSchema.findOneAndUpdate({ userID: slug }, { active: true });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Failed" });
      return;
    }

    res
    .status(200)
    .json({ message: "User data updated!" });
    } else {
      console.log("TUTAJ")
      
      const {slug} = req.query;

      const { active } = req.body;

      await connectToDatabase();

      let results;

      try {
        results = await UserSchema.find({ userID: slug })
      } catch (error) {
        res.status(500).json({ message: "Failed" });
        return;
      }
      
      console.log('z apiiiiii results  ' + results)

      res.status(200).json(results);
    }
}

export default handler;