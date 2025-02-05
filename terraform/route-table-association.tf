
resource "aws_route_table_association" "public_1" {
  subnet_id      = aws_subnet.public_1.id
  route_table_id = aws_route_table.public.id

  depends_on = [aws_subnet.public_1, aws_route_table.public]
}

resource "aws_route_table_association" "public_2" {
  subnet_id      = aws_subnet.public_2.id
  route_table_id = aws_route_table.public.id

  depends_on = [aws_subnet.public_2, aws_route_table.public]
}

resource "aws_route_table_association" "private_1" {
  subnet_id      = aws_subnet.private_1.id
  route_table_id = aws_route_table.private_1.id

  depends_on = [aws_subnet.private_1, aws_route_table.private_1]
}

resource "aws_route_table_association" "private_2" {
  subnet_id      = aws_subnet.private_2.id
  route_table_id = aws_route_table.private_2.id

  depends_on = [aws_subnet.private_2, aws_route_table.private_2]
}

