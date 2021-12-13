import bodyParser from 'body-parser';
import express from 'express';

const app = express();

var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 9010);

app.use(cors())


app.get('/', (req, res) => {
      res.send('Hello World!');
      
});


app.listen(app.get('port'), () => {
      console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
      console.log('  Press CTRL-C to stop\n');
});

