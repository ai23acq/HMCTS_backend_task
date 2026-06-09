import { NextFunction, Response, Request } from "express";
import { ResponseHelper } from "../utils/response_helper";

export const validate = (validations: any, _body = true) => {
    return async (req: Request, res:Response, next:NextFunction) => {
      console.log("CONTENT-TYPE:", req.headers["content-type"]);
      console.log("BODY:",req.body)
      const validationExp = _body ? req.body : req.params;
      const {error} =  validations.validate(validationExp);
      if (error) {
        console.log(error)
        ResponseHelper.error(res, error.details[0].message, 422);
        return;
      }
      next();
    }
};