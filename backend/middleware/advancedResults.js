// put a function inside a function

const advancedResults = (model, populate) => async(req, res, next) => {
  let query; //req.query
    
    //copy req.query
    const reqQuery = { ...req.query};
    
    // fields to exclude, goal= we dont want to match it as a field
    const removeFields = ['select','sort','page','limit'];

    // loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    
    // create query string
    let queryStr = JSON.stringify(reqQuery);

    // create operators($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    // finding resource
    query = model.find(JSON.parse(queryStr));

    // select fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');       //get what is inquery url?select = ... , ... =>... ...
        query = query.select(fields);                               //update query,with only select fields, with specification of ... ...
    }

     // sort fields 
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }else{
        query = query.sort('-name');
    }

    // pagination
    const page = parseInt(req.query.page, 10) || 1;           //parsing query from string to int, 10 based. page default by 1
    const limit = parseInt(req.query.limit, 10) || 25 ;
    const startIndex = (page - 1) * limit; 
    const endIndex = (page * limit);
    const total = await model.countDocuments();

    query = query.skip(startIndex).limit(limit);

    if(populate){
      query = query.populate(populate);
    }

    // executing resource
    const results = await query;

    // pagination result
    const pagination = {};

    // we dont have previous page, or next page pn the last page, we dont want to show that
    if(endIndex < total ){
        pagination.next = {
            page: page+1,
            limit
        }
    }

    if(startIndex > 0 ) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    res.advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results
    }

    next();
};

module.exports = advancedResults;