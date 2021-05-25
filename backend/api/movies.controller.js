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
}