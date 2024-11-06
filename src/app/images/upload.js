import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

const accountName = process.env.AZURE_ACCOUNT_NAME; // Thay bằng tên tài khoản Azure của bạn
const accountKey = process.env.AZURE_ACCOUNT_KEY; // Thay bằng khóa tài khoản của bạn
const containerName = 'images'; // Tên container

export const config = {
  api: {
    bodyParser: false,
  },
};

async function upload(req, res) {
  if (req.method === 'POST') {
    const blobServiceClient = new BlobServiceClient(
      'https://${accountName}.blob.core.windows.net',
      new StorageSharedKeyCredential(accountName, accountKey)
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const fileName = req.query.fileName; // Đặt tên file từ query hoặc body tùy nhu cầu
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    // Đọc file từ request
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', async () => {
      const buffer = Buffer.concat(chunks);
      await blockBlobClient.uploadData(buffer, buffer.length);

      // Trả về URL của ảnh đã tải lên
      res.status(200).json({ url: blockBlobClient.url });
    });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}

export default upload;