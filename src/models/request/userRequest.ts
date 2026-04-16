export type LoginRequest = {
   email: string;
   password: string;
};

export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
    companyName: string;
};

export type ForgotPasswordRequest = {
    email: string;
}

export type ResetPasswordRequest = {
    token: string;
    newPassword: string;
}

export type CompleteEnrollmentRequest = {
    otp: string;
    userEmail: string;
};

export type InitiatePasswordResetRequest = {
    userEmail: string;
};

export type CompletePasswordResetRequest = {
    otp?: string;
    userEmail?: string;
    userPassword?: string;
};

export type ChangePasswordRequest = {
    oldPassword: string;
    newPassword: string;
};

export type ResendOtpRequest = {
    userEmail: string;
};