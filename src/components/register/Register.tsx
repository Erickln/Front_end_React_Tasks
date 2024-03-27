// src/components/register/Register.tsx
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import styled from "styled-components";
import {
  Container,
  InnerContainer,
  InputWrapper,
  StyledInput,
  ErrorText,
} from "../commons"; // Importing common components from commons.ts

import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeadingXXLarge } from "baseui/typography";
import Cookies from "js-cookie";
import bcrypt from 'bcryptjs';
import { useSignIn } from "react-auth-kit";

function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const signIn = useSignIn();

  const onSubmit = async (values: any) => {
    console.log("Values: ", values);
    // hash password before sending to server
    const hashedPassword = await bcrypt.hash(values.password, 10);
    setError("");


    try {
      const response = await axios.post(
        "http://localhost:8080/api/user",
        {
          email: values.email,
          password: hashedPassword,
        }
      );

      // Handle success, maybe show a success message or navigate to a different page
      console.log("Registration successful:", response.data);
      // store response.data.token in local storage or cookies

      signIn({
        token: response.data,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email },
      });
      navigate("/tasks"); // Redirect to login page after successful registration

    } catch (err) {
      // Handle errors
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message || "An error occurred");
      else if (err && err instanceof Error) setError(err.message);

      console.error("Error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      // Add other fields as needed for registration
    },
    onSubmit,
  });

  return (
    <Container>
      <InnerContainer>
        <form onSubmit={formik.handleSubmit}>
          <HeadingXXLarge>Register</HeadingXXLarge>
          <ErrorText>{error}</ErrorText>
          <InputWrapper>
            <StyledInput
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
              clearOnEscape
              size="large"
              type="email"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              clearOnEscape
              size="large"
              type="password"
            />
          </InputWrapper>
          <InputWrapper>
            <Button size="large" kind="primary" isLoading={formik.isSubmitting}>
              Login
            </Button>
          </InputWrapper>
        </form>
      </InnerContainer>
    </Container>
  );
}

export default Register;
