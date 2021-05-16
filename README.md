# final-project-tagflix

How to get api working:
make sure you have node js and node package manager installed
if you do not have nodemon installed paste:
```npm install -g nodemon```

using command line or terminal:
1. navigate to ```backend``` folder
2. type ```npm install``` this will install all of our dependencies
3. type ```nodemon server``` You should recieve a message saying ```listening on port <portnumber>```
4. go to http://localhost:<your_port_number>/api/v1/movies/

This should display an array of movie objects sorted by most recent year

api commands:

This api will only show 20 movies at a time to see the next page of movies use

http://localhost:<your_port_number>/api/v1/movies?page=<enter_page_number>

To only get movies within a certain year range use the command:

http://localhost:<your_port_number>/api/v1/movies?year_range=<year_1>_<year_2>


To find movies above a certain IMDB rating use:
http://localhost:<your_port_number>/api/v1/movies?IMDB=<your_min_score>