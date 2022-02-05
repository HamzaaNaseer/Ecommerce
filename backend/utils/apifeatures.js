class ApiFeatures {
  constructor(query, queryString) {
    this.query = query; //query = Product.find()
    this.queryString = queryString;
  }
  //searching product using the name.
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

  //filter for categories && price.
  filter() {
    //if query does not have category and price then simply quit without doing anything
    if (!this.queryString["category"] && !this.queryString["price"]) {
      return this;
    }
    // TODO ** : REFACTOR REDUNDATNT CODE IF NOT UNDERSTOOD WHY IT WAS THERE(deletion of querystrings)

    //make a copy of orignal query
    //bcz don't want to change orignal object.
    const queryCopy = { ...this.queryString };

    //filtering for categories.
    //all other querystrings are removed except category and price.
    const removeFromQuery = ["keyword", "page", "limit"];
    removeFromQuery.forEach((element) => {
      delete queryCopy[element];
    });

    // ---filtering for price.
    //first convert the query object into string
    //then use regex to replace the gt|gte|lt|lte with a $ in front of them
    //then convert the result back into the object form and set equals to the query
    let queryStr = JSON.stringify(queryCopy); //convert the object into string.
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (char) => `$${char}`);
    this.query = this.query.find(JSON.parse(queryStr)); //convert json like string to object

    return this;
  }
  // pagination
  pagination(resultPerpage) {
    let currentPage = this.queryString.page || 1;
    //if we're on page 3 and we have result perpage = 10
    //then we would skip products 1-20 and show 21-30
    //so we need to skip 20 products  (currentPage -1) * result per page
    const pagesToSkip = (currentPage - 1) * resultPerpage;

    //not using find here because at this time in code we already
    //have the products, so just apply pagination on those products
    this.query = this.query.limit(resultPerpage).skip(pagesToSkip);
    return this;
  }
}

module.exports = ApiFeatures;
