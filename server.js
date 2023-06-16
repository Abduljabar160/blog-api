const express = require('express');
const app = express();
const cors = require('cors');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
const verifyToken = require('./middleware/verifyToken');

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use('/api/posts', verifyToken, postsRouter);
app.use('/api/auth', authRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
