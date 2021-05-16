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
            numGrades: numMovies
        }
        res.json(response)
    }
}