const http = require('http');
const app = require('./app');
const connectDB = require('./db/connect');

const server = http.createServer(app);


server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});