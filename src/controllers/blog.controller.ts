import BlogModel from '../models/blog.model'

export let addEntry = (req,res) => {
    const entry = new BlogModel({
        date: req.body.date,
        title: req.body.title,
        entry: req.body.entry
    });

    entry.save((err) => {
        if (err) {
            console.log(`Error saving to db: ${err}`);
            return;
        }
        res.send('successfully saved to db');
    });
}

