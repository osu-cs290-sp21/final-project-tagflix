import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

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
            else if ("title" in filters) { 
                query = { $text: { $search: filters["title"] } } // anywhere in the text we will search for name 
            }
         }
        let cursor

        try{
            cursor = await movies
            .find(query)
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

    static async getMovieByID(id) { //we are trying to get the reviews from one collection and put them into the movie 
        try { 
          const pipeline = [ //this pipeline will help us match collections together 
            { 
                $match: { 
                    _id: new ObjectId(id), 
                }, 
            }, 
                  { 
                      $lookup: { 
                          from: "reviews", //from the reviews collection 
                          let: { 
                              id: "$_id", 
                          }, 
                          pipeline: [ 
                              { 
                                  $match: { 
                                      $expr: { 
                                          $eq: ["$movie_id", "$$id"],//we will find all of the reviews which = the movie id 
                                      }, 
                                  }, 
                              }, 
                              { 
                                  $sort: { 
                                      date: -1, 
                                  }, 
                              }, 
                          ], 
                          as: "reviews", 
                      }, 
                  }, 
                  { 
                      $addFields: { 
                          reviews: "$reviews", 
                      }, 
                  }, 
              ] 
          return await movies.aggregate(pipeline).next() //put the two together and return that 
        } catch (e) { 
          console.error(`Something went wrong in getMovieByID: ${e}`) 
          throw e 
        } 
      } 

}