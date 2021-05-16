let movies
export default class MoviesDAO{
    
    static async injectDB(conn){
        if(movies){
            return
        }
        try{
            movies = await conn.db(process.env.MFLIX_NS).collection("movies")
        }catch(e){
            console.error(
                `Unable to establish a connection handle in moviesDAO ${e}`
            )
        }
    }

    static async getMovies({ // default values
        filters = null,
        page = 0,
        entriesPerPage = 20
    } = {}){
        let query
        if(filters){
            if("directors" in filters){
                query = {"directors": filters["directors"]}
            }
            else if("year_range" in filters){
                query = {"year": {"$gt":filters["year_range"][0], "$lt":filters["year_range"][1]}}
            }
            else if ("IMDB" in filters){
                query  = {"imdb.rating" : { $gt: filters["IMDB"] } }
            }
        }
        let cursor

        try{
            cursor = await movies
            .find(query, {projection: {_id:0, year:1, directors:1, "imdb.rating":1, title: 1}})
            .sort([["year", -1]])
        }catch(e){
            console.error(`Unable to issue find command ${e}`)
            return{moviesList: [], numMovies: 0}
        }
        const displayCursor = cursor.limit(entriesPerPage).skip(entriesPerPage * page)
        try{
            const moviesList = await displayCursor.toArray()
            const numMovies = await movies.countDocuments(query) 
            return{moviesList, numMovies}
        }catch(e){
            console.error(
                `unable to convert cursor to array and/ or problem counting documents ${e}`
            )
            return{moviesList: [], numMovies: 0}
        }


    }
}