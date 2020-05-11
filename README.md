# Lambda S3 Sign URL for upload
Lambda function to sign an S3 URL to be used for file upload


## Policy for IAM user

``` json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "s3:Put*",
            "Resource": "arn:aws:s3:::sap20-temp-jfurh332li76/*"
        }
    ]
}
```
