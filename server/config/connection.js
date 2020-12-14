const mongoose = require('mongoose');



/*
const connection = "mongodb+srv://username:<password>@<cluster>/<database>?retryWrites=true&w=majority";
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));
    ~~~
    
*/

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fixmyship', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
})
.then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));

module.exports = mongoose.connection;
