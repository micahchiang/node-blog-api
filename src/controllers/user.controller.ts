import User from '../models/user.model';

export let getUser = (req, res) => {
    let email = req.body.email;
    let pw = req.body.password;

    User.findOne({email: email, password: pw}, (err, user) => {
        if (err) {
            console.log(`Error retrieving user: ${err}`);
            return;
        }
        return res.json(user);
    })
}