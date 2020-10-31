const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/full-app', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(async () => {
    console.log('Database connection successfull!');
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
