const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users', (err, registro) =>{
            if(err){
                res.json(err);
            }
            res.render('index', {
                data: registro
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO users set ?', [data], (err, users) => {
            console.log(users);
            res.redirect('/');
        })
    })
}

module.exports = controller;