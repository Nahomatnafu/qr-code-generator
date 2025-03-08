/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import qr from 'qr-image';
import fs from 'fs';
import inquirer from 'inquirer';

const generateQRCode = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter a URL:',
    },
  ]);

  const userURL = answers.url;
  console.log(`You entered: ${answers.url}`);

  // Generate QR code image
  const qrCode = qr.image(answers.url, { type: 'png' });

  // Save the QR code as an image file
  const qrImagePath = 'qrcode.png';
  qrCode.pipe(fs.createWriteStream(qrImagePath));

  // Save the URL to a text file
  const textFilePath = 'URL.txt';
  fs.writeFile(textFilePath, userURL, (err) => {
    if (err) {
      console.error('Error saving URL to text file:', err);
    } else {
      console.log(`URL saved in ${textFilePath}`);
    }
  });

  console.log(`QR code saved as ${qrImagePath}`);
};

generateQRCode();
