# final-project-tagflix

How to get api working:
make sure you have node js and node package manager installed
if you do not have nodemon installed paste:
```npm install -g nodemon```

using command line or terminal:
1. navigate to ```backend``` folder
2. type ```npm install``` this will install all of our dependencies
3. type ```nodemon server``` You should recieve a message saying ```listening on port 5000```
4. go to http://localhost:5000/api/v1/movies/

This should display an array of movie objects sorted by most recent year

# api commands:

This api will only show 20 movies at a time to see the next page of movies use

http://localhost:5000/api/v1/movies?page=<enter_page_number>

To only get movies within a certain year range use the command:

http://localhost:5000/api/v1/movies?year_range=<year_1>_<year_2>


To find movies above a certain IMDB rating use:
http://localhost:5000/api/v1/movies?IMDB=<your_min_score>

To search movies by title use:

http://localhost:5000/api/v1/movies?title=<your_title>


# how to use the review api:

NOTE for testing this I reccomend Insomnia : https://insomnia.rest/


use the url http://localhost:5000/api/v1/movies/review

to post a review send a post request with the json fomatted like so:

{
	"movie_id": "<mongoDB_movie_ID>",
	"text": "<the_review>",
	"user_id": "<your_user_ID>",
	"name": "<your_user_name>"
}

to update a review send a put request with the json fomatted like so:
NOTE: must be the name user who posted the review

{
	"review_id": "<mongoDB_movie_ID>",
	"text": "<the_review>",
	"user_id": "<your_user_ID>",
	"name": "<your_user_name>"
}

to delete a review send a delete request to the url:
NOTE: must be the name user who posted the review


http://localhost:5000/api/v1/movies/review?id=<mongoDB_review_id>

with the json fomatted like so:

{
	"user_id": "<your_user_ID>",
	"name": "<your_user_name>"
}

to recieve all reviews for a particular movie:

send a get request to:
http://localhost:5000/api/v1/movies/id/<MongoDB_movie_id>


# To update the tags of a movie 

send a put request to:

http://localhost:5000/api/v1/movies/tags

with the json fomatted like so:

{
	"movie_id": "<mongoDB_movie_ID>",
	"tags": ["<tag_1>", "<tag_2>", <tag_n>"]
}

Note this will only update the database with tags that are not already in the array.