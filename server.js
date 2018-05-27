const express=require('express');
const hbs=require('hbs');
const fs=require('fs')
const port=process.env.PORT || 3000 ;

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

 app.listen(port,()=>{
 	console.log(`Server is running on port ${port}`)
 });