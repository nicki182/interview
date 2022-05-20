import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
class Server {
  static async start() {
    app.get("/get_array", (req, res) => {
      const randomSize = Math.ceil(Math.random() * Number(process.env.MAX));
      const arrayWithNumbers = [];
      for (let i = 0; i < randomSize; i++) {
        arrayWithNumbers.push(
          Math.ceil(Math.random() * Number(process.env.MAX))
        );
      }
      res.send({
        message: arrayWithNumbers
      });
    });
    app.use((req, res, err) => {
      console.error(err);
      res.status(400).json({
        message: err,
      });
    });
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on port ${process.env.SERVER_PORT}`);
    });
  }
}
Server.start();
