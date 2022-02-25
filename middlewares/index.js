import express from 'express';
import expressJwt from 'express-jwt';
import req from 'express/lib/request';

export const requireSignin = expressJwt({
  // add token to cookie
  getToken: () => req.cookies.token,
  // verify token
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});
