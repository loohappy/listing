import express, { Application, Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./connect";
import "dotenv/config";
import router from "./routes/image";

const app: Application = express();

app.use(express.json());
app.use(cors());

// Example route for handling image creation and retrieval
app.use(router);
app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

const PORT: Number = parseInt(process.env.PORT!) || 5000;

// Call the connectDB function to establish the connection
connectDB()
  .then(() => {
    // Code that depends on the database connection
    app.listen(PORT, () => {
      console.log(`server url is http://localhost:${PORT} `);
    });
  })
  .catch((error: Error) => {
    console.error("Failed to connect to the database:", error);
  });
