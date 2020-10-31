class ApiFeatures {
  constructor(query, queryString, model) {
    this.query = query;
    this.queryString = queryString;
    this.Model = model;
  }

  helper() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'limit'];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    return queryStr;
  }

  filter() {
    let queryStr = this.helper();

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  count() {
    const queryStr = this.helper();
    return this.Model.countDocuments(JSON.parse(queryStr));
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;

    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;
