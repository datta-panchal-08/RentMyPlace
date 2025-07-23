import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import listingRoutes from './routes/listing.routes.js';
import bookingRoutes from './routes/booking.routes.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions ={
    // origin:"https://rentmyplace-frontend.onrender.com",
    origin:"http://localhost:5173",
    credentials:true
}

app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser());

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/listing',listingRoutes);
app.use('/api/v1/booking',bookingRoutes);


app.listen(PORT,()=>{
   console.log(`Server is running on PORT: ${PORT}`);
});

connectDB();