const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const apptest

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(port, () => console.log(`Listening on port ${port}`));
