var db = require("../config/connection")
const { v4: uuid } = require('uuid');

module.exports = {
    addProduct:(product,callback)=>{
        console.log(product)
        db.getDatabase().collection('products').insertOne(product).then((data)=>{
           
            callback(data.insertedId)
        })
    },
    getAllProducts:()=>{
        return new Promise(async (resolve,reject)=>{
            let products = await db.getDatabase().collection("products").find().toArray()
            resolve(products)
        })
    },
    getProduct:(productid)=>{
        return new Promise( async(resolve,reject)=>{
            let product = await db.getDatabase().collection("products").find({productid:productid}).toArray()
            resolve(product)
        })
    },
    addToCart:(item,callback)=>{
         db.getDatabase().collection("cart").insertOne(item).then((datas)=>{
            let cartitems = db.getDatabase().collection("cart").find({ cartid:item.cartid}).toArray()
            console.log(cartitems)
            callback(cartitems)
            
        })
    },
    getAllCartItems:()=>{
        return new Promise(async (resolve,reject)=>{
            let cartitems = await db.getDatabase().collection("cart").find().toArray()
            resolve(cartitems)
        })
    },
    purchaseItem:(cartid)=>{
        return new Promise( async(resolve,reject)=>{
            let cartdata = await db.getDatabase().collection("cart").find({cartid:cartid}).toArray()
            var puchasedata = {
                orderid:uuid(),
                orderstatus:"",
                deliveryperson:"",
                cartdetails:cartdata
            }
            db.getDatabase().collection('order').insertOne(puchasedata).then((purchaseinfo)=>{
                db.getDatabase().collection("cart").deleteOne({cartid:cartid}).then((data)=>{
                    resolve(purchaseinfo.insertedId)
                })
                
            })
        })
    },
    getAllOrders:()=>{
        return new Promise(async(resolve,reject)=>{
            let orderdata = await db.getDatabase().collection("order").find().toArray()
            resolve(orderdata)
        })
    }
}