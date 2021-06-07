# final-project-tagflix

# frontend

to load the frontend use the url

http://localhost:3000/


# How to get api working:
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

Note: for multiple words use _ instead of spaces

http://localhost:5000/api/v1/movies?title=<your_title>

To search movies by genre use:

Note: for multiple genres use _ between each genre

http://localhost:5000/api/v1/movies?genre=<your_genre>

To search movies by tag use:

Note: for multiple tags use _ between each tags

http://localhost:5000/api/v1/movies?tag=<your_tag>

Return an array listing all the genres:

http://localhost:5000/api/v1/movies/genres

Return an array listing all the tags:

http://localhost:5000/api/v1/movies/tags

Pull the most recent reviews:

http://localhost:5000/api/v1/movies/reviews


# how to use the review api:

NOTE for testing this I reccomend Insomnia : https://insomnia.rest/


use the url http://localhost:5000/api/v1/movies/review

to post a review send a post request with the json fomatted like so:

```
{
	"movie_id": "<mongoDB_movie_ID>",
	"text": "<the_review>",
	"user_id": "<your_user_ID>",
	"name": "<your_user_name>"
}
```

to update a review send a put request with the json fomatted like so:

NOTE: must be the name and user_id of the person who posted the review

```
{
	"review_id": "<mongoDB_movie_ID>",
	"text": "<the_review>",
	"user_id": "<your_user_ID>",
	"name": "<your_user_name>"
}
```

to delete a review send a delete request to the url:

NOTE: must be the name and user_id of the person who posted the review


http://localhost:5000/api/v1/movies/review?id=<mongoDB_review_id>

with the json fomatted like so:

```
{
	"user_id": "<your_user_ID>"
}
```

to recieve all reviews for a particular movie:

send a get request to:
http://localhost:5000/api/v1/movies/id/<MongoDB_movie_id>


# To update the tags of a movie

send a put request to:

http://localhost:5000/api/v1/movies/tags

with the json fomatted like so:

```
{
	"movie_id": "<mongoDB_movie_ID>",
	"tags": ["<tag_1>", "<tag_2>", "<tag_n>"]
}
```

Note this will only update the database with tags that are not already in the array.

# Adding a new movie to the database

send a post request to:

 http://localhost:5000/api/v1/movies/addMovie

with the json fomatted like so:

```
{
	"title": "<your_title>",
	"plot": "<your_plot>",
	"genres": ["<genre_1>", "<genre_2>", "<genre_n>"],
	"year": <your_year>,
	"poster": "<image_addresss>",
	"tags": ["<tag_1>", "<tag_n>"],
	"directors": ["<Name>"],
	"rated": "<MPAA_rating>"
}
```

Note this will only update the database with tags that are not already in the array.

