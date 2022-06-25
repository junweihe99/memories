import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        //get token from request
        const token = req.headers.authorization.split(" ")[1];
        //Check to see if its web authen or google authen
        const isCustomAuth = token.length < 500;
        let decodedData;

        //get user data
        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;