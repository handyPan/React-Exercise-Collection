import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
import cors from 'cors';
// import testRoute from './routes/test.js';
import { userRoute } from './routes/user.js';
import { residencyRoute } from './routes/residency.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())
// app.use(bodyParser.json());
app.use(cors());

// app.use('/test', testRoute);
app.use('/api/user', userRoute);
app.use('/api/residency', residencyRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



