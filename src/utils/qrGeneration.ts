import qr from 'qrcode'

export const generateQR = async (text: string, color = '#000000',) => {
  try {
    const image = await qr.toBuffer(text, {
      type: 'png',
      errorCorrectionLevel: 'H',
      color: {
        dark: color
      }
    });
    return image;
  } catch (err) {
    console.error(err)
    return;
  }
}
