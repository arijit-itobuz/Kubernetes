
resource "aws_nat_gateway" "nat_gateway_1" {
  allocation_id = aws_eip.nat_gateway_eip_1.id
  subnet_id     = aws_subnet.public_1.id

  tags = {
    Name = "NAT GATEWAY 1"
  }

  depends_on = [aws_eip.nat_gateway_eip_1, aws_subnet.public_1]
}

resource "aws_nat_gateway" "nat_gateway_2" {
  allocation_id = aws_eip.nat_gateway_eip_2.id
  subnet_id     = aws_subnet.public_2.id

  tags = {
    Name = "NAT GATEWAY 2"
  }

  depends_on = [aws_eip.nat_gateway_eip_2, aws_subnet.public_2]
}
