import { NextResponse } from "next/server";
import {verify} from "jsonwebtoken"

const secret = process.env.SECRET;

export default function middleware (req){
  const {cookies} = req;
  const jwt = cookies.MySiteJWT;
  const url = req.url;
  const {origin } = req.nextUrl


  if (url.includes('/authorize')){
    if(jwt){
      try {      
        verify(jwt, secret);
        return NextResponse.redirect(`${origin}/authorize`);
      } catch (error) {
        return NextResponse.next();

      }
    }

  }


  if (url.includes('/admin')){
    if(jwt=== undefined){
      return NextResponse.redirect(`${origin}/authorize`);
    }

    try{
     const user = verify(jwt, secret);
      return NextResponse.next();

    }catch(e){
return NextResponse.redirect(`${origin}/authorize`);
    }

  }
  return NextResponse.next();
}

/* let $Function = Function;
export default middleware = (expressionSyntax)=> {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
}; */