import * as crypto from 'crypto';
const { subtle } = crypto.webcrypto;
const { dialog } = require('electron');
const fs = require('fs');
const pjson = require('./private.pmspro.json');

export function getUserChosenPath(filename) {
  var userChosenPath = dialog.showSaveDialog({ defaultPath: filename });

  return userChosenPath.then((data) => {
    return data;
    console.log(data);
  });
}

export function saveImage(fromPath: string, savePath: string) {
  fs.copyFile(fromPath, savePath, (error) => {
    console.log(error);
    if (error) {
      return {
        isSuccessful: false,
        error,
        message: 'Image cannot be saved',
      };
    }
    return {
      isSuccessful: true,
      message: 'Image saved successfully',
    };

    // At that point, store some information like the file name for later use
  });
}

export function getSoftwareDetails() {
  return {
    name: 'PMS PRO',
    company: 'Third Eye Technologies',
    loginSlogan: '',
    author: 'Akshat Singh',
    website: 'www.thirdeyetechnologies.in',
    email: 'akshat.singh1718@gmail.com',
    phone: ['9312376463', '8860937995'],
  };
}

export const digest = async ({ algorithm = 'SHA-256', message }) =>
  Array.prototype.map
    .call(
      new Uint8Array(
        await subtle.digest(algorithm, new TextEncoder().encode(message))
      ),
      (x) => ('0' + x.toString(16)).slice(-2)
    )
    .join('');
