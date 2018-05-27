const express=require('express');
const hbs=require('hbs');
const fs=require('fs')


 let app=express()
hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');


app.use((req,res,next)=>{
	var now=new Date().toString();
	var log=`${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n',(err)=>{
		if(err){
			console.log(err);
		}
	})
	next();
});

//app.use((req,res,next)=>{
//	res.render('maintain.hbs');
//})
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});
 app.get('/',(req,res)=>{
 	res.render('home.hbs',{
 		pageTitle:"Home Page",
 		user:"Vikram",
 		currentYear:new Date().getFullYear()
 	});
 });

 app.get('/about',(req,res)=>{
 	res.render('about.hbs',{
 		pageTitle:"About Page",
 		currentYear:new Date().getFullYear()
 	});
 });

 app.listen(3000,()=>{
 	console.log("Server is running on port 3000!")
 });