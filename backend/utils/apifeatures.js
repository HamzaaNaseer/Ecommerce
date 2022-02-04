class ApiFeatures {
  constructor(query, queryString) {
    this.query = query; //query = Product.find()
    this.queryString = queryString;
  }
  //TODO: IMPLEMENT SEARCH FEATURE
  search() {
    //getting the keyword from the queryString.
    //if we found a keyword then we need to make a new query
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i", // 'i' is for case Insensitive
          },
        }
      : {};
    //here we have modified the query .. this query will find us only those products that contain the keyword
    //keyword is an object so i'm taking out it's properties using spread operator ('...')
    // query = Product.find().find({name:{$regex: this.queryString.keyword, $options: "i",})
    this.query = this.query.find({ ...keyword });
    return this;//returning the instance
  }
}

module.exports = ApiFeatures;
