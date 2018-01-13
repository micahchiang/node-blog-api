import app from './src/app';
require('./src/mongoose.config');

const port = process.env.SERVER_PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }

    return console.log(`listening on port ${port}`);
})