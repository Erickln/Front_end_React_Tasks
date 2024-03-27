// src/components/home/Home.tsx
import { Container, InnerContainer } from "../commons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin: 10px;
  text-decoration: none;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function Home() {
  return (
    <Container>
      <InnerContainer>
        <h2>Welcome to Our Website!</h2>
        <StyledButton to="/register">Register</StyledButton>
        <StyledButton to="/login">Login</StyledButton>
      </InnerContainer>
    </Container>
  );
}

export default Home;
