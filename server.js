import app from './scr/app.js';
import "dotenv/config";
import connectDB from './scr/config/db.js';

connectDB();

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})