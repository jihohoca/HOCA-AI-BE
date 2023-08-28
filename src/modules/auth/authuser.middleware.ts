
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import  Jwt  from 'jsonwebtoken';
import config from '../../config/config';
export const authMiddleware = catchAsync(async (req: Request, _res: Response, next:NextFunction) => {
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if(token) {
               Jwt.verify(token, config.jwt.secret);
            
                next()
            }
        } catch(error) {
            throw new Error("Not authorized token expired, please login agin")
        }
    }
    
  });
  