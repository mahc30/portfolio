resource "aws_iam_user" "pipeline_user" {
  name = "pipeline-bot"
}

resource "aws_iam_policy" "pipeline_user_policy" {
  name_prefix = "pipeline-bot-policy-"
  path = "/"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = [
          "s3:PutObject",
          "s3:PutObjectAcl",
          "s3:GetObject",
          "s3:ListObjectsV2",
          "s3:ListBucket",
          "s3:CopyObject", 
          "s3:GetObject", 
          "s3:PutObject", 
          "s3:DeleteObject"
        ]
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = [
          "cloudfront:CreateInvalidation"
        ]
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "pipeline_user_policy_attachment" {
  name       = "pipeline-user-policy-attachment"
  policy_arn = aws_iam_policy.pipeline_user_policy.arn
  users      = [aws_iam_user.pipeline_user.name]
}