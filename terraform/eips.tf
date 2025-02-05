
resource "aws_eip" "nat_gateway_eip_1" {
  depends_on = [aws_internet_gateway.main]
}

resource "aws_eip" "nat_gateway_eip_2" {
  depends_on = [aws_internet_gateway.main]
}
