import * as auth from './auth.controller';
import * as login from './login.controller';
import * as logout from './logout.controller';
import * as resetPassword from './resetPassword.controller';
import * as signup from './signup.controller';

export const restrictTo = auth.restrictTo;
export const authenticateUser = auth.authenticateUser;
export const loginUserHandler = login.loginUserHandler;
export const refreshAccessTokenHandler = login.refreshAccessTokenHandler;
export const invalidateSession = logout.invalidateSession;
export const logoutUserHandler = logout.logoutUserHandler;
export const forgotPasswordHandler = resetPassword.forgotPasswordHandler;
export const resetPasswordHandler = resetPassword.resetPasswordHandler;
export const verifyEmailHandler = signup.verifyEmailHandler;
export const createUserHandler = signup.createUserHandler;
