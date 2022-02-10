const pool = require('../database');

const providerCtrl = {};

providerCtrl.getProviders = async (req, res) => {
    await pool.query('SELECT *FROM providers', (err, rows) => {
        res.json(rows);
    });
};

providerCtrl.getProvider = async (req, res) => {
    await pool.query('SELECT *FROM providers WHERE id = ?', [req.params.id], (err, rows) => {
        res.json(rows);
    });
    res.send(req.body);
}

providerCtrl.createProviders = async (req, res) => {
    await pool.query('INSERT INTO providers set ?', [req.body], (err, rows) => {
        res.json(rows);
    });
    console.log(req.body);
    res.send('added');
}

providerCtrl.updateProvider = async (req, res) => {
    await pool.query('UPDATE providers set ? WHERE id= ?', [req.body, req.params.id]);
    res.send('update');
}

providerCtrl.deleteProvider = async (req, res) => {
    const result = await pool.query('DELETE FROM providers WHERE id= ?', [req.params.id]);
    res.send(result);
}


module.exports = providerCtrl;