import { PORT } from './config/env.config.js';
import app from "./app/app.js";

app.listen(PORT, () => {
    console.log(`run on port ${PORT}`);
});