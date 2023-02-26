const express = require('express');
const config= require('config');
const routes= require('./router/routes');

const app = express();  
const port = config.get("PORT")||3001
app.use('/',routes)

app.listen(port,function () {
    console.log(`Server Started at PORT ${port}`);
})


