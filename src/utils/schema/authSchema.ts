import { object } from "yup";
import {
    defaultValidation,
    emailValidation,
    passwordValidation,
    phoneValidation,
    bvnValidation,
    confirmPasswordValidation
} from "@/utils/validation/validate";


export const LoginSchema = object({
    email: emailValidation(),
    password: passwordValidation(),
});

export const registerSchema = object({
    name: defaultValidation("Full name"),

    email: emailValidation(),

    password: passwordValidation(),

});
