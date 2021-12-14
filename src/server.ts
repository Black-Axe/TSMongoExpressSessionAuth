import bodyParser from 'body-parser';
import express from 'express';
import initAndFill from './database/initAndFill';
import initPassportAndSessions from './passport/passport.sessions.config';
import routerInit from './routes/router';
import flash from 'connect-flash';

const app = express();

initAndFill();

var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 9010);

initPassportAndSessions(app);

app.use(cors())


app.get('/', (req, res) => {
      res.send('Hello World!');
      
});
routerInit(app);


app.listen(app.get('port'), () => {
      console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
      console.log('  Press CTRL-C to stop\n');
      
});

