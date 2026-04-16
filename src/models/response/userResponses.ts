export type Role = "admin" | "editor" | "viewer";

export type User = {
    id: number;
    name: string;
    email: string;
    role: Role;
};


export type BaseResponse = {
    responseCode?: string;
    responseMessage?: string;
};

export type VerifyEmailResponse = {
    status?: number;
    message?: string;
}

export type RegisterResponse = {
    message?: string;
}

export type LoginResponse = {
    token: string;
    user: User;
    expiresIn: number;
};

export type ForgotPasswordResponse = {
    message?: string;
}

export type ResetPasswordResponse = {
    message?: string;
}

// export type AuthLoginResponse = LoginResponse;
// export type AuthRegisterResponse = BaseResponse;
