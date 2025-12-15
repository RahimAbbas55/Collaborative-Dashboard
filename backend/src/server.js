import { createServer} from "http";
import { Server } from 'socket.io';
import app from './app.js';
import { env } from "./config/env.js";

const server = createServer(app);

server.listen(env.PORT , () => {
    console.log(`Server Running on port ${env.PORT}`);
});