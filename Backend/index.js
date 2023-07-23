// app.js
const express = require('express');
const cors = require('cors');
const { create } = require("ipfs-http-client");

const app = express();
const ipfs = create();
 // Connect to IPFS node using default settings

app.use(cors());
app.use(express.json());

// Endpoint for handling JSON data and storing it on IPFS
app.post('/json', async (req, res) => {
  try {
    const { body, title } = req.body;
    const jsonData = JSON.stringify({ body, title }); // Convert to JSON string
    const { cid } = await ipfs.add(jsonData); // Convert to IPFS Buffer
    res.status(200).json({ hash: cid.toString() });
  } catch (error) {
    console.error('Failed to publish JSON data to IPFS:', error);
    res.status(500).json({ error: 'Failed to publish JSON data to IPFS' });
  }
});

app.get('/json/:ipfsHash', async (req, res) => {
  try {
    const { ipfsHash } = req.params;

    // Retrieve the JSON data from IPFS using the hash
    const chunks = [];
    for await (const chunk of ipfs.cat(ipfsHash)) {
      chunks.push(chunk);
    }

    const jsonData = JSON.parse(Buffer.concat(chunks).toString());
    return res.json(jsonData);
  } catch (err) {
    console.error('Failed to fetch JSON data from IPFS:', err);
    return res.status(500).json({ error: 'Failed to fetch JSON data from IPFS' });
  }
});


// app.js
// (Keep the other code from the previous example)
// ...

// Endpoint for handling basic text and storing it on IPFS
app.post('/text', async (req, res) => {
  try {
    const { text } = req.body;
    const { cid } = await ipfs.add(Buffer.from(text)); // Convert text to IPFS Buffer
    res.status(200).json({ hash: cid.toString() });
  } catch (error) {
    console.error('Failed to publish text data to IPFS:', error);
    res.status(500).json({ error: 'Failed to publish text data to IPFS' });
  }
});

app.get('/text/:ipfsHash', async (req, res) => {
  try {
    const { ipfsHash } = req.params;

    // Retrieve the text data from IPFS using the hash
    const chunks = [];
    for await (const chunk of ipfs.cat(ipfsHash)) {
      chunks.push(chunk);
    }

    const textData = Buffer.concat(chunks).toString();
    return res.send(textData);
  } catch (err) {
    console.error('Failed to fetch text data from IPFS:', err);
    return res.status(500).json({ error: 'Failed to fetch text data from IPFS' });
  }
});


const port = 3001; // Replace with your desired port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
