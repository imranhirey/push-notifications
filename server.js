const express= require('express')
const webpush= require('web-push')
const bodyparser= require('body-parser')
const path=require('path')
const { json } = require('express/lib/response')
const app= express()
app.use(bodyparser())
app.use(express.static(path.join(__dirname,"client")))
let Public_Key='BAEarYF6J-EMXwHN8MYmCBK1DpEar0LHHBhU5CuLcFc22NN6ePTitDY4IEmOdk-qIQCoTx7jKa6nQszCLbL-vQY'
let Private_Key='BM2JrzPkH2Qz51r-0VNEl4wKL7bksGwe4bKzYuxIAZE'
webpush.setVapidDetails('mailto:test@test.com',Public_Key,Private_Key)
let subscription;
let payload;

app.post('/subscribe',(req,res)=>{
    subscription= req.body
    console.log('gh',subscription)
    res.status(201).json({})
    payload= JSON.stringify({title:'imran notification'})
    webpush.sendNotification(subscription,payload).catch((err)=>console.log(err))
})


app.listen(3000,()=>{
    console.log('server started at port 3000 ...')
})