const express = require('express');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();
require('./startups/db')();

app.use(express.json());

app.use('/api/users', users);
app.use('/api/auth', auth);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is listening on port no: ${PORT}`);
})



