const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

  // serve our static stuff like style.css
app.use('/', express.static('./build/public'));

// Import routes
app.use('/', require('./build/routes/index.js'));
app.use('/api', require('./build/routes/api.js'));

// Our port the application will listen on.
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running at localhost:${PORT}`);
});
