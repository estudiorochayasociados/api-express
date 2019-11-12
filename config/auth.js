const checkToken = (req,res,next) => {
    const bearerHeader = (typeof(req.headers["authorization"]) !== 'undefined') ? req.headers["authorization"].split(" ") : false;
    req.token = bearerHeader[1]
    if(req.token) {
        next();
    } else {
        
    }
}

const adminPassword = 'faAr2010';

module.exports = {
    jwtVerify: checkToken,
    admin : adminPassword
};