
export async function encodeMessage(imageFile: File, message: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Binary representation of the message + a terminator
        const binaryMessage = stringToBinary(message + '\0');
        
        if (binaryMessage.length > data.length * 0.75) {
          reject(new Error('Message is too long for this image capacity.'));
          return;
        }

        for (let i = 0; i < binaryMessage.length; i++) {
          // data is [R, G, B, A, R, G, B, A, ...]
          // We only use R, G, B channels
          const dataIdx = Math.floor(i / 3) * 4 + (i % 3);
          
          // Clear LSB and set to bit
          data[dataIdx] = (data[dataIdx] & 254) | parseInt(binaryMessage[i]);
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(imageFile);
  });
}

export async function decodeMessage(imageFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let binaryMessage = '';
        let extractedString = '';

        for (let i = 0; i < data.length; i++) {
          if (i % 4 === 3) continue; // Skip Alpha

          binaryMessage += (data[i] & 1).toString();

          if (binaryMessage.length === 8) {
            const charCode = parseInt(binaryMessage, 2);
            if (charCode === 0) { // Terminator found
              resolve(extractedString);
              return;
            }
            extractedString += String.fromCharCode(charCode);
            binaryMessage = '';
          }

          // Safety break if we go too far without terminator
          if (extractedString.length > 50000) break;
        }
        
        resolve(extractedString || 'No hidden message found or corrupted data.');
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(imageFile);
  });
}

function stringToBinary(str: string): string {
  return str
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
}
