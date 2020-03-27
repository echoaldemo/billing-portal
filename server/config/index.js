const dynamoose = require('dynamoose')

dynamoose.AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
})

module.exports = { dynamoose }
