import Express from 'express';

const app = Express();
const port = process.env.PORT || 3000;

app.get('/', (_, res) => {
	res.send('Hello, World!');
});

app.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});
