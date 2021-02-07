import React from 'react';
import QRCode from "react-qr-code";

export default function QRcode({ link }) {
  // Copy link to clipboard
  function copyLink() {
    navigator.clipboard.writeText(link)
      .then(() => {
        console.log(`Copied ${link}`);
        alert('Copied to clipboard');
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // Share link
  function shareLink() {
    navigator.share(link)
      .then(() => {
        console.log(`Sharing ${link}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function getDeviceWidth() {
    return window.screen.width > 1025;
  };

  return (
    <div className='dashboard-qrcode-container'>
      <h1>Survey Link</h1>
      <div className='inline-block center'>
        <QRCode value={link} size={190} />
      </div>
      <div className='inline-block center'>
        <button
          className='btn-outline'
          onClick={copyLink}
        >
          Copy link
        </button>
        <br />
        <button
          className='btn-fill'
          onClick={shareLink}
          disabled={getDeviceWidth()}
        >
          Share link
        </button>
      </div>
    </div>
  );
}
