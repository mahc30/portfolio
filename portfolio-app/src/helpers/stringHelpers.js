export function stringToS3Url(bucketName, route){
    return `https://${bucketName}.s3.amazonaws.com/${route}`
}