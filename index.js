import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import axios from "axios";
import problemRoutes from "./src/routes/problem.routes.js";
import executionRoutes from "./src/routes/execution.routes.js";
// import executionRoute from "./routes/executeCode.routes.js";
// import submissionRoutes from "./routes/submission.routes.js";
// import playlistRoutes from "./routes/playlist.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080

app.use(
    cors({
      origin: "http://localhost:5174",
      credentials: true,
    })
  );
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello Guys welcome to leetlab🔥");
});
app.get('/test-judge0', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.JUDGE0_API}/languages`);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Cannot connect to Judge0',
      error:err
     });
  }
});


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execution-code",executionRoutes)
// app.use("/api/v1/submission", submissionRoutes);

// app.use("/api/v1/playlist", playlistRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});