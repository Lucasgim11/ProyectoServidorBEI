import fs from 'fs';

import  { isSubset } from '../utils/sets.js';

const PATH = './src/files/products.json';

export default class ProductsManager {
    constructor(){
        if(!fs.existsSync(PATH)){
            this.init();
        }else{
            console.log("products file found")
        }

    }
    async init() {
        await fs.promises.writeFile(PATH,JSON.stringify([]))
    }

    async getProducts(filters = {}) {
        const data = await fs.promises.readFile(PATH,'utf-8');
        const products = JSON.parse(data);
        const filteredProducts = products.filter(product=>isSubset(product,filters))
        return filteredProducts;
    }

    async getProductById(productId){
        const data = await fs.promises.readFile(PATH,'utf-8')
        const products = JSON.parse(data);
        const product = products.find(p => p.id === productId);
        return product
    }
}
