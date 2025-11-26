const success  = (res, status = 200, message = "Success", data = {},aToken = null,rToken= null) => {
    const response = {
      success: true,
      status,
      message,
      data
    };

    if(aToken) response.access_token = aToken;
    if(rToken) response.refresh_token = rToken;

    return res.status(status).json(response);

}

const error  = (res, status = 500, message = "Failed", data = {},aToken = null,rToken= null) => {
    const response = {
      success: false,
      status,
      message,
      data
    };

    if(aToken) response.access_token = aToken;
    if(rToken) response.refresh_token = rToken;


    return res.status(status).json(response);

}
module.exports = {
    success,
    error
}