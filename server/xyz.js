import https from 'https';
import fs from 'fs'

const options = {
	method: 'GET',
	hostname: 'cricbuzz-cricket.p.rapidapi.com',
	port: null,
	path: '/mcenter/v1/92840',
	headers: {
		'x-rapidapi-key': '33692e1a65mshb5409f761d142bfp1fbc64jsn057b114ebff9',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};

const req = https.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		const jsonString = body.toString();

		// console.log(jsonString);

		// Save the JSON string to a file
		fs.writeFile('matchInfo.json', jsonString, 'utf8', (err) => {
			if (err) {
				console.error('Error writing to file', err);
			} else {
				console.log('File has been saved.');
			}
		});
	});
});

req.end();