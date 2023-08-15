import newWatchList from '../models/WatchList.js'
import UserModel from '../models/User.js'; 


class AddWatchlist {
    
    static Watchlist = async (req, res) => {
      const { stockSymbol, stockName,type, userId } = req.body;

      try {
        // Find the existing user by userId
        const existingUser = await UserModel.findById(userId);

        if (!existingUser) {
          return res.status(404).send({ status: 'failed', message: 'User not found' });
        }

        const newWatchListItem = new newWatchList({
          userId: existingUser._id, // Use the _id of the existing user document
          stockSymbol: stockSymbol,
          stockName: stockName,
          Type: type?.toLowerCase() == 'c' ? "CRYPTO" : "STOCK",
        });

        await newWatchListItem.save();
        return res.status(201).send({ status: 'success', message: 'WatchList Added successfully' });
      } catch (error) {
        console.error(error);
        return  res.status(500).send({ status: 'failed', message: 'Cannot add the watchlist' });
      }
    };
  }

  export default AddWatchlist;