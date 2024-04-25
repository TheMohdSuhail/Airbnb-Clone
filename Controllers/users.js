const User = require("../models/user");

module.exports.renderSignupForm = (req,res) =>{
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res)=>{
    try{

        let {username, email, password} = req.body;
        const newUser = new User({email,username});
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        });
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }

};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

// module.exports.login =  async(req, res)=>{
//     req.flash("success","Welcome back to Wanderlust!");
//     let redireectUrl = res.locals.redirectUrl || "/listings";
//     res.redirect(redireectUrl);
//     // res.redirect("/listings");
// };

module.exports.login = async (req, res) => {
    try {
        req.flash("success", "Welcome back to Wanderlust!");

        // Corrected variable name
        let redirectUrl = res.locals.redirectUrl || "/listings";

        // Redirect to the determined URL
        res.redirect(redirectUrl);
    } catch (error) {
        // Handle any errors that occur during redirection
        console.error("Error occurred during login redirection:", error);
        req.flash("error", "An error occurred during login redirection");
        res.redirect("/listings"); // Redirect to a generic error page or homepage
    }
};

module.exports.logout = (req, res,next)=>{
    req.logout((err)=>{
        if(err){
          return next(err);
        }
        req.flash("success", "You are logged Out!");
        res.redirect("/listings");
    });
};