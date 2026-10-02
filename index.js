 
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const ENVIREMENT = process.env.ENVIREMENT || "development";

const app = express();

// middlewares
app.use(express.json());

if (ENVIREMENT === "development") {
    app.use(cors());
} else {
    app.use(
        cors({
            origin: "https://testing-client-ashen.vercel.app",
            credentials: true,
        })
    );

    app.set("trust proxy", 1);
}

// routes
require("./routes/postsRoute")(app);

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 