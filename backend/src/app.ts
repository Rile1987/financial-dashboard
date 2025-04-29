import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import transactionRoutes from "./routes/transactionRoutes";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", transactionRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;