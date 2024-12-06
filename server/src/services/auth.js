import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();
const operationsToSkipAuthentication = ['login', 'addUser']; // token not need for these operations
export const authenticateToken = ({ req }) => {
    if (req.body && req.body.operationName) {
        const operationName = req.body.operationName;
        // Skip authentication if not needed
        if (operationsToSkipAuthentication.includes(operationName)) {
            return {};
        }
    }
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
        token = token.split(' ')[1];
    }
    if (!token) {
        throw new GraphQLError("Authorization token missing", {
            extensions: { code: 'UNAUTHENTICATED' },
        });
    }
    try {
        const { data } = jwt.verify(token, process.env.JWT_SECRET_KEY || '');
        return { user: data };
    }
    catch (err) {
        console.log(`Invalid token: ${err}`);
        throw new GraphQLError("Invalid or expired token", {
            extensions: { code: 'UNAUTHENTICATED' },
        });
    }
};
export const signToken = (username, email, _id) => {
    const payload = { username, email, _id };
    const secretKey = process.env.JWT_SECRET_KEY || '';
    return jwt.sign({ data: payload }, secretKey, { expiresIn: '1h' });
};
export class AuthenticationError extends GraphQLError {
    constructor(message) {
        super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
        Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
    }
}
;
