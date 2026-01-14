import net from 'net';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 14000;

const server = net.createServer((socket) => {
	const remote = `${socket.remoteAddress}:${socket.remotePort}`;
	console.log('Client connected:', remote);
	socket.write('Welcome to terminal-chat net server!\n');

	socket.on('data', (data) => {
		const msg = data.toString().trim();
		console.log(`Received from ${remote}:`, msg);
		socket.write(`${msg}\n`);
	});

	socket.on('close', () => {
		console.log('Client disconnected:', remote);
	});

	socket.on('error', (err) => {
		console.error('Socket error', err);
	});
});

server.on('error', (err) => {
	console.error('Server error', err);
});

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
