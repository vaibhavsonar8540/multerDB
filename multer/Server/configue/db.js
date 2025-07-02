const mongosse= require('mongoose');

const connectDB = async () => {
    try {
        await mongosse.connect('mongodb://127.0.0.1:27017/multerDB')
        console.log('MongoDB connected successfully');
    }
    catch (error) { 
        console.error('Error connecting to MongoDB:', error);
    }
}

const fileSchema = new mongosse.Schema({
    filename: {
        type: String,
        required: true
    }
});

const File = mongosse.model('File', fileSchema);
module.exports = {connectDB , File};