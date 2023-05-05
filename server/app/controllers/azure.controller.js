// azureController.js
const azure = require('azure-storage')
const path = require('path')
const multer = require('multer')
const crypto = require('crypto')

const connectionString = 'DefaultEndpointsProtocol=https;AccountName=imgimg;AccountKey=MFqaarpBtSzpQdS753wpGhwRSmMnECcSUvNoBF6+VtbYXVZiAo79brs7lpq6w7lkQM0qoXGkpe+X+AStfJngNA==;EndpointSuffix=core.windows.net'
const containerName = 'example'
const blobService = azure.createBlobService(connectionString)

const storage = multer.diskStorage({
 destination: (req, file, cb) => {
  cb(null, '')
 },
 filename: (req, file, cb) => {
  const hash = crypto.createHash('sha256').update(crypto.randomBytes(5)).digest('hex').substr(0, 8)
  cb(null, hash + file.originalname)
 },
})

const uploadBlob = (filePath, blobName) => {
 return new Promise((resolve, reject) => {
  blobService.createBlockBlobFromLocalFile(containerName, blobName, filePath, (err, result) => {
   if (err) {
    reject(err)
   } else {
    console.log('Image uploaded successfully!')
    console.log(result)
    resolve(result)
   }
  })
 })
}

const upload = multer({ storage: storage })

exports.uploadToOSS = upload.single('image')

exports.azureControl = async (req, res) => {
 try {
  const file = req.file
  console.log(file)
  const filePath = path.join(file.destination, file.filename)
  const blobName = file.filename
  const result = await uploadBlob(filePath, blobName)
  const uuu = "https://imgimg.blob.core.windows.net/example/" + file.filename
  console.log(uuu)
  res.send(uuu)
 } catch (error) {
  console.error(error)
  res.status(500).json({
   success: false,
   message: 'upload failed',
  })
 }
}
