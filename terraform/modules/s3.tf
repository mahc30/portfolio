resource "aws_s3_bucket" "s3" {
  bucket = var.creds_s3
    
  tags = {
    Name = var.creds_s3
  }
}

resource "aws_s3_bucket_public_access_block" "example" {
  bucket = aws_s3_bucket.s3.id
  
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "s3_policy" {
  bucket = aws_s3_bucket.s3.id

  # Bucket policy to allow getObject on all objects
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*"
        Action    = ["s3:GetObject"]
        Resource  = "${aws_s3_bucket.s3.arn}/*"
      }
    ]
  })
}
