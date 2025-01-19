const express = require('express');//to create server
const bodyParser =  require('body-parser');//to convert json coming from frontend to JS obj in backend
const openAIApi = require('openai');//to make connection with openAI

const app = express();//to create server
app.use(bodyParser.json());
app.use(express.static("public"));//to make html,css files open in the browser

const openAI= new openAIApi({
    apiKey: "Secret Key"//U get this from openAI playground
})

//Create the API endpoint for code debugging
//Anyone who makes a call to 127.0.0.1/debug they will come inside this
app.post("/debug",async (req,res)=>{
const{code,language}=req.body;
//Make a call to openAI to debug the code
try{
    const response= await openAI.chat.completions.create({
        model:'gpt-4',
        messages:[
            {
                role:'system',
                content :'You are a code debugging assistant specialising in ${language}.'
            },
            {
                role:'user',
                content : 'Please debug the following ${language} code:\n\n ${code}'
            }
        ]
    });
const result= response.choices[0].message.content;
res.json({result});//result returned to the frontend
}catch(err){
    console.error(err);
    res.statusCode(500).json({
        error:"Something went wrong"
    })
}
})
app.listen(8000,()=>console.log("Server has started on port 8000"));
