const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const url = process.env.MONGODB_URL;

mongoose.connect(url).then(() => {
    console.log("Mongoose connected");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

app.use(bodyParser.json());
app.use(cors());

const port = 6700;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

const signupSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    phonenumber: String,
    usertype: String,
    password: String,
});

const SignupDetails = mongoose.model('SignupDetails', signupSchema);

app.post('/signup', async (req, res) => {
    try {
        const { firstname, lastname, email, phonenumber, usertype, password } = req.body;
        const existingUser = await SignupDetails.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const signupData = new SignupDetails({
            firstname,
            lastname,
            email,
            phonenumber,
            usertype,
            password: hashedPassword,
        });

        await signupData.save();
        res.status(201).json({ message: 'Signed up successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { verify_email, verify_password } = req.body;
        const user = await SignupDetails.findOne({ email: verify_email });
        if (!user) {
            return res.status(400).json({ message: 'Email not found!' });
        }
        const passwordMatch = await bcrypt.compare(verify_password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Wrong credentials' });
        }
        res.json({ message: `${user.firstname} signed in` });
    } catch (error) {
        console.error("Error:", error);
        res.json({ message: 'Server error' });
    }
});

app.get('/userType',async(req,res)=>
{
    try{
        const {searchFirstName} = req.query;
        const type = await SignupDetails.findOne({firstname:searchFirstName});
        if (!type) {
            return res.status(400).json({ message: 'User not found' });
        }
        const userType = type.usertype;
        res.json({ message: `${userType}` });
    }
    catch(error)
    {
        console.error("Error:", error);
        res.json({ message: 'Server error' });   
    }
})


const propertySchema = new mongoose.Schema(
    {
        firstname:String,
        image:String,
        place:String,
        area:String,
        bedrooms:String,
        bathrooms:String,
        college:String,
        hospital:String,
        market:String,
    }
)

const propertyDetails = mongoose.model("properties", propertySchema);


app.post('/addproperty',async (req,res)=>
{
    try{
        // console.log(req.body);
        const {firstname,image,place,area,bedrooms,bathrooms,college,hospital,market} = req.body;
        const addProperty=new propertyDetails({
            firstname:firstname,
            image:image,
            place:place,
            area:area,
            bedrooms:bedrooms,
            bathrooms:bathrooms,
            college:college,
            hospital:hospital,
            market:market,
        })
        await addProperty.save();
        res.json({message:'added successfully'});
    }
    catch(error)
    {
        console.error("Error:", error);
        res.json({ message: 'Server error' }); 
    }
})

app.get('/property-details', async (req, res) => {
    try {
        const Details = await propertyDetails.find();
        res.json(Details);
    } catch (error) {
        console.error('Error fetching car details:', error);
        res.json({ message: 'Server error' });
    }
});

app.post("/update-property",async(req,res)=>
    {
        try{
            // console.log(req.body);
            const {image,place,area,bedrooms,bathrooms,college,hospital,market} = req.body;
            const propId = req.body.id;
            // console.log(carId);
            const updatedProp = await propertyDetails.findByIdAndUpdate(propId, {image,place,area,bedrooms,bathrooms,college,hospital,market }, { new: true });
            if (!updatedProp) {
                return res.json({ message: 'Car not found' });
            }
            res.json({message:'updated successfully!'})
        }
        catch(error){
            console.log(error);
            res.json({message:'Server error'});
        }
    })

    app.get("/sellerdetails", async (req, res) => {
        try {
            // console.log(req.body);
            const { propId } = req.query;
            // console.log(propId);
            const property = await propertyDetails.findById(propId);
            if (!property) {
                return res.json({ message: 'Property not found' });
            }
    
            const name = property.firstname;
    
            const detailsWithSameName = await propertyDetails.find({ firstname: name });
            console.log(detailsWithSameName);
            res.json({ message: 'Details with the same name', details: detailsWithSameName });
        } catch (error) {
            console.log(error);
            res.json({ message: 'Server error' });
        }
    });
    
