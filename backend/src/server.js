import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";



const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;


//payload too large error (fix by adding limit parameter)
app.use(express.json({ limit: "5mb" })) // req.body
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }))
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)

// make ready for deployment
// only if deploying frontend and backend together, if deploying separately, then no need to serve static files from backend
// if (ENV.NODE_ENV == "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")))

//   app.get("*", (_, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   })
// }

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`)
  connectDB()
}
);