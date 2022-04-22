const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');
const guide_exp = require('./guide');
const guide  = new guide_exp()

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.get('/ts', (req, res)=>{
    let guideList = guide.getAll();
    if(guideList !== null)
        res.json(guideList);
    res.status(400).send();
});

app.post('/ts', (req, res)=>{
    if(guide.add(req)){
        res.json({ message: 'Line is posted'});
    }
    else{
        res.status(400).json({ message: 'One or more of parameters are missing'});
    }
});

app.put('/ts', async (req, res)=>{
    if(guide.upd(req)){
        res.json({ message: 'Line is updated'});
    }
    else{
        res.status(400).json({ message: 'One or more of parameters are missing'});
    }
});

app.delete('/ts', (req, res)=>{
    if(guide.del(req.query.id)){
        res.json({ message: 'Line is deleted'});
    }
    else{
        res.status(400).json({ message: 'One or more of parameters are missing'});
    }
});

app.listen(PORT, () =>
{
    console.log(`http://localhost:${PORT}/swagger`);
})
