terraform {
  required_version = ">= 1.1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region     = "us-east-1"
  access_key = "AKIATQZCSHLE3CN7YKUP"
  secret_key = "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"
  profile    = "snapee-test"
}
