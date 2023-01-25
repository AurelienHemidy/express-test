module.exports = ({ res }) => {
  res.status(404).json({ error: 'Resource not found. Try another URL.' });
};
