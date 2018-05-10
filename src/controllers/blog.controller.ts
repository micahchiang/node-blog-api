import BlogModel from '../models/blog.model';
import * as moment from 'moment';

export let getEntries = (req, res) => {
    BlogModel.find({}).sort({_id: -1}).exec((err, entries) => {
        if (err) {
            return res.json(err);
        }
       return res.json(entries);
    });
};

export let addEntry = (req, res) => {
    let currentDate = moment().format('MMMM Do YYYY').toString();
    const entry = new BlogModel({
        date: currentDate,
        title: req.body.title,
        entry: req.body.entry
    });

    entry.save((err) => {
        if (err) {
            return res.json(err);
        }
        return res.json({
            'message': 'successfully saved to database',
            'status': 201
        });
    });
};

