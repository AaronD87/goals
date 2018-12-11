const express = require('express');
const client = require('../db-client');
const Router = express.Router;
const router = Router(); //eslint-disable-line new-cap

router
  .get('/', (req, res) => {
    client.query(`
      SELECT id, title, type, start, end
      FROM goals
      WHERE profile_id = $1;
    `,
    [req.userId])
      .then(result => {
        res.json(result.rows);
      });
  })

  .post('/', (req, res) => {
    const body = req.body;

    client.query(`
      INSERT INTO goals (title, type, profile_id, start, end)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *;
    `,
    [body.title, body.type, req.userId, body.start, body.end])
      .then(result => {
        res.json(result.rows[0]);
      });
  })
  
  // pseudo example for goals
  // okay to have "virtual" sub-resource
  .put('/:id/completed', (req, res) => {
    const completed = req.body.completed;

    client.query(`
      UPDATE goals
      SET completed = $1
      WHERE id = $2
      AND profile_id = $3
      RETURNING *;
    `,
    [completed, req.params.id, req.userId]
    )
      .then(result => {
        res.json(result.rows[0]);
      });
  });
  

module.exports = router;