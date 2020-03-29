function streamToBuffer(stream) {  
    return new Promise((resolve, reject) => {
      const buffers = [];
      stream.on('error', reject);
      stream.on('data', (data) => buffers.push(data))
      stream.on('end', () => resolve(Buffer.concat(buffers)))
    });
}

const b64string = 123;
const buf = Buffer.from(b64string, 'base64');