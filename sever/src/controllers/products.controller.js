const pool = require('../database');

const productCtrl = {};


productCtrl.getProduct = async (req, res) => {
    await pool.query('SELECT *FROM products', (err, rows) => {
        res.json(rows);
    });
};

productCtrl.consultProduct = async (req, res) => {
    await pool.query('SELECT *FROM products WHERE id = ?', [req.params.id], (err, rows) => {
        res.json(rows);
    });

};

productCtrl.createProduct = async (req, res) => {
    const result = await pool.query('INSERT INTO products set ?', [req.body]);
    console.log(req.body);
    res.send(result);

};

productCtrl.updateProduct = async (req, res) => {
    const { id, product, category, subcategory, price, quantity, provider, observations } = req.body;
    const query = `UPDATE products SET id=${id},product = '${product}', category = '${category}', subcategory = '${subcategory}', price = '${price}', quantity = ${quantity}, provider = '${provider}', observations = '${observations}' WHERE id = ?`;
    const result = await pool.query(query, id);
    res.send(result);

};

productCtrl.deleteProduct = async (req, res) => {
    const result = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.send(result);
};



module.exports = productCtrl;