const http = require('http');
const fs = require('fs');

const PORT = 3005;
let logArray = []; // Array to store log messages

const server = http.createServer((req, res) => {
    res.write("Hello Welcome");
    let logMessage;

    // Perform array operations based on URL
    if (req.url === '/') {
        logMessage = `New request noted on HOME page.\n`;
        logArray.push(logMessage); // Using 'push' to add log to the array
    } else if (req.url === '/about') {
        logMessage = `New request noted on ABOUT page.\n`;
        logArray.unshift(logMessage); // Using 'unshift' to add log at the start of the array
    } else if (req.url === '/content') {
        logMessage = `New request noted on CONTENT page.\n`;
        if (logArray.length > 0) {
            logArray.pop(); // Using 'pop' to remove the last log if available
        }
        logArray.push(logMessage); // Adding a new log to the end
    } else {
        logMessage = `Request on UNKNOWN page.\n`;
        logArray.push(logMessage);
    }

    // Write the log array to a file using 'join' to combine array entries
    fs.appendFile('log.txt', logArray.join(''), (err) => {
        if (err) {
            console.log("Error occurred while updating the log.");
        } else {
            console.log('Log updated successfully.');
        }
    });

    res.end();
});

server.listen(PORT, () => {
    console.log("Server is running on", PORT);
});
