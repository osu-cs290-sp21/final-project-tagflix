import mongodb from "mongodb" 
const ObjectId = mongodb.ObjectID 
let reviews // we will fill this later with a refrence to the reviews collection 
export default class ReviewsDAO { 
  static async injectDB(conn) { 
    if (reviews) { 
      return 
    } 
    try { 
      reviews = await conn.db(process.env.MFLIX_NS).collection("reviews") 
    } catch (e) { 
      console.error(`Unable to establish collection handles in userDAO: ${e}`) 
    } 
  } 
  static async addReview(movieId, user, review, date) { 
    try { 
      const reviewDoc = { name: user.name, 
          user_id: user._id, 
          date: date, 
          text: review, 
          movie_id: ObjectId(movieId), } //takes all the data and puts it into a doc 
      return await reviews.insertOne(reviewDoc) // uploads it to the database 
    } catch (e) { 
      console.error(`Unable to post review: ${e}`) 
      return { error: e } 
    } 
  } 
  static async updateReview(reviewId, userId, text, date) { //text is the text of the review 
    try { 
      const updateResponse = await reviews.updateOne( 
        { user_id: userId, _id: ObjectId(reviewId)}, //makes sure it had the correct review ID AND user ID 
        { $set: { text: text, date: date  } }, 
      ) 
      return updateResponse 
    } catch (e) { 
      console.error(`Unable to update review: ${e}`) 
      return { error: e } 
    } 
  } 
  static async deleteReview(reviewId, userId) { 
    try { 
      const deleteResponse = await reviews.deleteOne({ 
        _id: ObjectId(reviewId), 
        user_id: userId, 
      }) 
      return deleteResponse 
    } catch (e) { 
      console.error(`Unable to delete review: ${e}`) 
      return { error: e } 
    } 
  }
  static async getReviews({ // default values
    page = 0,
    entriesPerPage = 30
} = {}){
    let query
    let cursor
    try{
        cursor = await reviews
        .find(query)
        .sort([["date", -1]])
    }catch(e){
        console.error(`Unable to issue find command ${e}`)
        return{reviewsList: [], numReviews: 0}
    }
    const displayCursor = cursor.limit(entriesPerPage).skip(entriesPerPage * page)
    try{
        const reviewsList = await displayCursor.toArray()
        const numReviews = await reviews.countDocuments(query) 
        return{reviewsList, numReviews}
    }catch(e){
        console.error(
            `unable to convert cursor to array and/ or problem counting documents ${e}`
        )
        return{reviewsList: [], numReviews: 0}
    }

    
} 
}