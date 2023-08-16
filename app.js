const http = require('http');
const server = http.createServer((req,res)=>{
    if (req.url === '/'){
        res.write(
        `<h1>Welcome to Home page</h1>
         <a href="/about">go to About page</a>`)
        res.end();
    } else if (req.url === '/about'){
        res.write(`
        <h1> Welcome to my ABOUT PAGE!</h1>
        <a href="/">go to Home page</a>`)
        res.end();
    } else {
        res.write(
        `<h1>Oooops!</h1>
        <p>Page not found...........</p>
        <a href="/">go to Home page`
        )
        res.end()
        
    }
}).listen(4000);
 


