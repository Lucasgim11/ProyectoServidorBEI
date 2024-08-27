import express from "express";
import ProductsManager from "./managers/ProductsManager.js"

const app = express();

const PORT = process.env.PORT || 8080;

const productsManager = new ProductsManager();

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

app.use(express.json());

const products = [];

app.get('/products',async (req,res)=>{
    try{
        const query = req.query;
        console.log(query);
        const products = await productsManager.getProducts(query);
        return res.send({products})
    }catch(error){
        console.log(error); 
        return res.send("Cannot get products")
    }
})

app.get('/products/:pid',async (req,res)=>{
    try{
        const {pid} = req.params;
        const parseId = parseInt(pid);
        if(isNaN(parseId)){ //En el caso de que se ingrese un id no numérico 
            return res.send("Invalid ID ")
        }
        const product = await productsManager.getProductById(parseId)
        if(!product){
            return res.send("Product not found");
        }
        return res.send({product})
    }catch(error){
        console.log(error)
        return res.send("Cannot get product")
    }
})

app.post('/products',(req,res)=>{
    //Añadir o crear un producto
    const {id,title,description,code,price,status,stock,category} = req.body;
    //Valido el cuerpo de la petición
    if(!id||!title||!description||!code||!price||!status||!stock||!category){
        return res.status(400).send({status:"error",error:"Incomplete values"});
    }
    const newProduct = {
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category
    }
    users.push(newUser);
   // res.send({status:"success",message:"User created", id});
    res.sendStatus(201); //Created
})

app.put('/products/:pid',(req,res)=>{
    //¿Cuál sería su intención? : Actualizar un usuario
    const {pid} = req.params;
    const {firstName, lastName} = req.body;
    const userIndex = users.findIndex(u=>u.id===uid);
    if(userIndex === -1){
        return res.status(400).send({status:"error",error:"User doesn't exist"})
    }
    users[userIndex] = {...users[userIndex],firstName,lastName};

    res.send({status:"success",message:"User updated"});
})

app.delete('/products/:pid',(req,res)=>{
    //¿Cuál sería su intención? : Borrar un usuario
    const {uid} = req.params;
    const userIndex = users.findIndex(u=>u.id===uid);
    if(userIndex === -1){
        return res.status(400).send({status:"error",error:"User doesn't exist"})
    }
    users.splice(userIndex,1);
    res.sendStatus(204);
})

