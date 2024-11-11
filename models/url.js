
import mongoose from "mongoose";


// Define URL Schema
const urlSchema = new mongoose.Schema({
    shortId: String,
    originalUrl: String,
});

const Url = mongoose.model('Url', urlSchema);

// Export Url as a default export
export default Url;