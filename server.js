const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const MilkHumidity = require('./models/milkHumidityModel');
const app = express();
const cron = require('node-cron');
const generateUrl = require('./data/generateChartUrl');
require('dotenv').config();


//'0 18 * * *' every day at 18 
//'*/10 * * * * *' every 10 seconds  

// const task = cron.schedule('*/10 * * * * *', async () =>  {
//     try{
//         const humidity = generateMilkHumidiy();
//         const pressure = generateMilkPressure();
//         const temp = generateMilkTemperature();
//         const airTemp = generateAirTemperature();
//         console.log(humidity, pressure, temp, airTemp);
//         //await MilkHumidity.create({value})
//     }catch(e) {
//         console.log(e);
//     }
  
// });

const milkHumidity = [
    5,
    3.46, 3.47,
    3.48,
    3.49,3.5,3.5,3.5,
];
const milkPressure = [
   
    139,  139.5, 139.5, 
    139.5, 140, 140, 140.5, 
    140.5, 140.9, 140.9, 
];
const milkTemperature = [
    78.6, 78.6, 78.9, 78.9, 
    79.5, 
   79.8, 80, 80,80.2,
];
const airTemperature = [
    178, 178.3, 178.3, 
    178.5, 178.5, 178.9,  178.9, 178.9,  179.3, 179.3,  179.7, 179.7, 180, 180,   180.5, 180.5, 
   181,
];


const humidityUrl = generateUrl('Вологість висушеного молока', milkHumidity);
const milkPressureUrl = generateUrl('Напір молока', milkPressure);
const milkTemperatureUrl = generateUrl('Температура молока на вході в сушарку', milkTemperature);
const airTemperatureUrl = generateUrl('Температура повітря на вході в сушарку', airTemperature);

const nodemailer = require("nodemailer");

//async..await is not allowed in global scope, must use a wrapper
async function main() {


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SENDER_USER, // generated ethereal user
      pass: process.env.SENDER_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.ADRES_FROM, // sender address
    to: process.env.ADRES_TO, // list of receivers "bar@example.com, baz@example.com"
    subject: "Щоденний звіт процесу автоматизації 17.05.2023", // Subject line
    text: "Звіт по основним контурам регулювання за останню добу", // plain text body
    html: `<div>
    <tbody>
    <tr>
    <td>
        <img style="width: 600px" src="${humidityUrl}"/>
        <div>
        <b>Максимальне динамічне відхилення: 1.5</b>
        </div>
        <div>
        <b>Перерегулювуння - немає</b>
        </div>
    </td>
    <td>
        <img style="width: 600px" src="${milkPressureUrl}"/>
        <div>
        <b>Максимальне динамічне відхилення: 0.5</b>
        </div>
        <div>
        <b>Перерегулювуння - немає</b>
        </div>
    </td>
    </tr>
    <tr>
    <td>
        <img style="width: 600px" src="${milkTemperatureUrl}"/>
        <div>
        <b>Максимальне динамічне відхилення: 2</b>
        </div>
        <div>
        <b>Перерегулювуння - немає</b>
        </div>
    </td>
    <td>
        <img style="width: 600px" src="${airTemperatureUrl}"/>
        <div>
        <b>Максимальне динамічне відхилення: 1</b>
        </div>
        <div>
        <b>Перерегулювуння - немає</b>
        </div>
    </td>
    </tr>
    </tbody>
    </div>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
    


app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin')
});

app.post('/resource', async (req, res) => {
    const resource = req.body;
    resources.push(resource);
    res.send(resource);
    console.log('');
    console.log(resource);
   
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product

app.delete('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb://127.0.0.1:27017/testDatabase')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})