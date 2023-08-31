import { IUserDoc, UserData } from './../user/user.interfaces';

import catchAsync from '../utils/catchAsync';
import { NextFunction, Response } from 'express';
import  Jwt  from 'jsonwebtoken';
import config from '../../config/config';
import User from '../user/user.model';

export const authMiddleware = catchAsync(async (req: UserData, _res: Response, next:NextFunction) => {
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if(token) {
                const decoded = Jwt.verify(token, config.jwt.secret);
                const userLogin = await User.findById(decoded.sub)
                let user:IUserDoc = userLogin as IUserDoc;
                req.user = user;
                next()
            }
        } catch(error) {
            throw new Error("Not authorized token expired, please login agin")
        }
    } else {
        throw new Error("there is no token attached to header")
    }
    
  });


  
  