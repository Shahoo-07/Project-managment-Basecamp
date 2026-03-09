import {body} from "express-validator"

const userRegisterValidator = () =>{
    return [
        body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("email is invalid"),
        body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLowercase()
        .withMessage("username is invalid")
        .isLength({min: 3}),
        body("password")
        .trim()
        .notEmpty(),

        

    ];
}

const userLoginValidator = () =>{
    return [
        body("email").optional().isEmail().withMessage("Email is invalid"),
        body("password").notEmpty().withMessage("Password is required"),
    ];
};

export{
    userRegisterValidator,userLoginValidator
};