import express from "express";
import cors from "cors";
// Initialize App
const app = express();
app.use(cors());    // Allow cors

// Health Route
app.get('/' , (_, res) => {
    console.log('Collaborative Dashboard Up & Running!');
});

// Export app
export default app;