const {getUser}=require("../service/auth");

async function restrictToLoggedinUserOnly(req,res,next){
  const token=req.cookies?.uid;
  if(!token) return res.redirect("/login");
  const user=getUser(token);
  if(!user) return res.redirect("/login");
  req.user=user;
  next();
}

async function checkAuth(req,res,next){
  const token=req.cookies?.uid;
  const user=getUser(token);
  req.user=user;
  next();
}

function restrictTo(roles=[]){
  return function(req,res,next){
    if(!req.user) return res.redirect("/login");
    if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
    return next();
  };
}

module.exports={
  restrictToLoggedinUserOnly,
  checkAuth,
  restrictTo,
};
