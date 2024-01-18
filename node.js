const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// AWS S3 configuration
const s3 = new AWS.S3();

// Replace 'your-bucket-name' with your actual S3 bucket name
const bucketName = 'your-bucket-name';

app.post('/register', (req, res) => {
    const userData = req.body;

    // Save user data to S3 bucket
    const params = {
        Bucket: bucketName,
        Key: `users/${userData.username}.json`,
        Body: JSON.stringify(userData),
        ContentType: 'application/json'
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error('Error uploading data to S3:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Data uploaded to S3:', data);
            res.json({ message: 'Registration successful!' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

