const express = require('express')
require('dotenv').config()
const cors = require('cors');
const moment = require('moment')
const bodyParser = require('body-parser');
require('./database/database')
const router = require('./index.js')


const AdminRoter = require('./routers/AdminRouter')
const ItemRouter = require('./routers/ItemRouter')
const SubItemRouter = require('./routers/SubItemRouter')
const SubChildRouter = require('./routers/SubChildRouter')
const SellerRouter = require('./routers/SellerRouter')
const ProductRouter = require('./routers/ProductRouter')
const UserRouter = require('./routers/UserRouter')
const CartRouter = require('./routers/CartRouter')
const WhishlistRouter = require('./routers/WhishlistRouter')
const AddressRouter = require('./routers/AddressRouter')
const OrderRouter = require('./routers/OrderRouter')
const PaymentRouter = require('./routers/PaymentRouter')
const ForgetPasswordRouter = require('./routers/ForgetPasswordRouter')
const Photo = require('./routers/photo')
const FindProductRouter = require('./routers/FindProductRouter')
const Backup = require('./routers/BackupRouter');
const DemoRouter = require('./routers/DemoRouter');
const BannerRouter = require('./routers/BannerRouter')


const app = express()
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

app.use(AdminRoter)
app.use(ItemRouter)
app.use(SubItemRouter)
app.use(SubChildRouter)
app.use(SellerRouter)
app.use(ProductRouter)
app.use(UserRouter)
app.use(CartRouter)
app.use(WhishlistRouter)
app.use(AddressRouter)
app.use(OrderRouter)
app.use(PaymentRouter)
app.use(ForgetPasswordRouter)
app.use(Photo)
app.use(FindProductRouter)
app.use(Backup)
app.use(DemoRouter)
app.use(BannerRouter)
// app.use(router)



const time = moment(Date.now()).format('hh:mm:ss')
app.listen(3000, '192.168.29.2', () => {
    console.log(`server running on ${port} (last start: ${time})`);
})
