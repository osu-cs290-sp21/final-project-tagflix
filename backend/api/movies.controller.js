import moviesDAO from "../DAO/moviesDAO.js"

export default class MoviesController{
    static async apiGetMovies(req,res){
        const entriesPerPage = req.query.entriesPerPage ? parseInt(req.query.entriesPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0
        let filters = []
        if(req.query.directors){
            filters.directors = req.query.directors.replace("_", " ")
        }
        else if(req.query.year_range){
            filters.year_range = req.query.year_range.split("_").map(Number)
        }
        else if(req.query.IMDB){
            filters.IMDB = parseFloat(req.query.IMDB)
        }
        else if (req.query.title) { 
            filters.title = req.query.title 
          }
        else if (req.query.genre){
            filters.genre = req.query.genre
        }

        const{moviesList, numMovies} = await moviesDAO.getMovies({
            filters,
            entriesPerPage,
            page
        })

        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entriesPerPage: entriesPerPage,
            numMovies: numMovies
        }
        res.json(response)
    }
    static async apiGetMovieById(req, res, next) { 
        try { 
          let id = req.params.id || {} 
          let movie = await moviesDAO.getMovieByID(id) // after searching the movie by ID we get the movie back 
          if (!movie) { 
            res.status(404).json({ error: "Not found" }) 
            return 
          } 
          res.json(movie) 
        } catch (e) { 
          console.log(`api, ${e}`) 
          res.status(500).json({ error: e }) 
        } 
      } 

      static async apiAddTag(req, res, next) { 
        try { //before we got information from the query parameter but now we are getting information from the body of the request 
          const movieId = req.body.movie_id 
          const tags = req.body.tags 
          const reviewResponse = await moviesDAO.addTags(
            movieId, 
            tags
          ) 
          var { error } = reviewResponse 
          if (error) { 
            res.status(400).json({ error }) 
          } 
          if (reviewResponse.modifiedCount === 0) { // if modified count == 0 that means that the review was not updated and we can throw an error 
            throw new Error( 
              "unable to update tags - user may not be original poster", 
            ) 
          } 
          res.json({ status: "success" }) 
        } catch (e) { 
          res.status(500).json({ error: e.message }) 
        } 

    }
}