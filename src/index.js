
import app  from './app.js';


const PORT = app.locals.settings.port

app.listen( PORT , ()=>{ 
    console.log(`listening on port http://localhost:${PORT}`);
})