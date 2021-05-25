import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import moviesDAO from "./DAO/moviesDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config()

const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000
MongoClient.connect(
    process.env.DB_URI,
    {
        poolSize: 50,
        wtimeout: 2500,
        useNewUrlParser: true
    }
)
.catch(err=>{
    console.error(err)
    process.exitCode(1)
})
.then(async client =>{ //start web server here
    await moviesDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)

    app.listen(port, ()=>{
        console.log(`listening on port ${port}`)
    })
})