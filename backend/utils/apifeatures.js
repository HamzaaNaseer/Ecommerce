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
    return this; //returning the instance
  }

  filter() {
    //if query does not have category then simply quit without doing anything
    if (!this.queryString["category"]) {
      return this;
    }
    // TODO ** : REFACTOR REDUNDATNT CODE IF NOT UNDERSTOOD WHY IT WAS THERE

    //TODO : IMPLEMENT PRICE FILTER

    //make a copy of orignal query
    const queryCopy = { ...this.queryString };
    //removing these queries from query
    const removeFromQuery = ["keyword", "page", "limit"];
    removeFromQuery.forEach((element) => {
      delete queryCopy[element];
    });

    this.query = this.query.find(queryCopy);

    return this;
  }
}

module.exports = ApiFeatures;
