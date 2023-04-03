const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
const path = require("path");
const publicPath = path.join(__dirname, "/dist/my-app");
const yelpautocopmlete = 'https://api.yelp.com/v3/autocomplete?';
const yelpsearch = 'https://api.yelp.com/v3/businesses/search?';
const yelpbusinesssearch = 'https://api.yelp.com/v3/businesses/';
api_key = 'nqFkfT0v5ny8f6P705ahQTjTbRnlMSAJrQTI_dhbEHDf7C6CP0g-9I4TOdkddP9-HPlQqp4uNNbCgjz-J1Ti7wtgPXN701k5ltflqNTjaCRZ61kN9qCJrogTx4U3Y3Yx';
//app.use(cors());
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

app.use(express.static(publicPath));




app.get('/searchall', async(req, res) => {
    
    var url = yelpsearch;
    for (const pair of Object.entries(req.query)) {
        url+=`${pair[0]}=${encodeURIComponent(pair[1])}&`
    }
    url=url.slice(0,-1);
    console.log(url)
    var response = await fetch(url,{
        method:'GET',
        headers: {
            'Authorization': `Bearer ${api_key}`,
        }
    })
    var json = await response.json()
    res.send(json)
})


app.get('/autocomplete', async(req, res) => {
    
   // console.log(req.query.key);
    var key = req.query.key;
  //  console.log(yelpautocopmlete+`text=${key}`);
    response = await fetch(yelpautocopmlete+`text=${key}`,{method:'get',headers:{'Authorization':`Bearer ${api_key}`}})
    response = await response.json();
   // response = response.terms;
    res.send(response);
})

app.get('/searchbusiness', async(req, res) => {
 
     var id = req.query.id;
     response = await fetch(yelpbusinesssearch+`${id}`,{method:'get',headers:{'Authorization':`Bearer ${api_key}`}})
     response = await response.json();
     res.send(response);
 })


 app.get('/reviews', async(req, res) => {
 
    var id = req.query.id;
    response = await fetch(yelpbusinesssearch+`${id}`+'/reviews',{method:'get',headers:{'Authorization':`Bearer ${api_key}`}})
    response = await response.json();
    res.send(response);
})

app.get("/*", (req, res) => {
  //res.send('Hello World!')
  res.sendFile(path.join(__dirname + "/dist/my-app/index.html"));
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})