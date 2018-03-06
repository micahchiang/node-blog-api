import BlogModel from '../models/blog.model'

export let getEntries = (req, res) => {
    BlogModel.find({}).sort({_id: -1}).exec((err, entries) => {
        if (err) {
            return res.json(err);
        }
       return res.json(entries);
    });
}

export let addEntry = (req, res) => {

    const entry = new BlogModel({
        date: req.body.date,
        title: req.body.title,
        entry: req.body.entry
    });

    entry.save((err) => {
        if (err) {
            return res.json(err);
        }
        return res.json({
            'message': 'successfully saved to database',
            'status': '200'
        });
    });
}

