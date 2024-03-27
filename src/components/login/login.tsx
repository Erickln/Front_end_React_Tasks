import { Button } from "baseui/button";
import { Input } from "baseui/input";
import styled from "styled-components";
import {
  HeadingXXLarge,
  HeadingXLarge,
  HeadingLarge,
  HeadingMedium,
  HeadingSmall,
  HeadingXSmall,
} from "baseui/typography";
import {
  Container,
  ErrorText,
  InnerContainer,
  InputWrapper,
  StyledInput,
} from "../commons";

import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

function Login(props: any) {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    console.log("Values: ", values);
    setError("");
    
    // hash password and store it before sending to server
    var hashedPassword = await bcrypt.hash(values.password, 10);
    // hash password and print it 5 veces in order to see the hashed password

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        {
          email: values.email,
          password: hashedPassword,
        }
      );
      // response.data is the hashed password and user id spitted by a ":" character

      const hashedPasswordR = response.data.split(":")[0];
      const userID = response.data.split(":")[1];

      console.log("Response: ", response.data);
      console.log("Hashed Password: ", hashedPasswordR);
      console.log("User ID: ", userID);
        
      // if response is HttpStatus.UNAUTHORIZED (401) then show error message
      if (response.status === 401) {
        setError("Invalid email or password");
        return;
      } else{

        
      // check is password is correct with the hashed password in response.data
      // if not, show error message
      if (!await bcrypt.compare(values.password, hashedPasswordR)){
        setError("Invalid email or password");
        return;
      } else {
        // Handle success, maybe show a success message or navigate to a different page
        console.log("Login successful:", userID);
        // store response.data.token in local storage or cookies
        // set token in cookie
      }



      signIn({
        token: response.data,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email },
      });

      // set token in cookie
      document.cookie = `token=${userID}; max-age=3600`;

      // add string to .txt file report at src\components\report.txt

      // use file hanlder to generate the report

      navigate("/tasks"); // Redirect to login page after successful registration
    }
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  

  return (
    <Container>
      <InnerContainer>
        <form onSubmit={formik.handleSubmit}>
          <HeadingXXLarge>Log in</HeadingXXLarge>
          <ErrorText>{error}</ErrorText>
          <InputWrapper>
            <StyledInput
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
              type="email"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              type="password"
            />
          </InputWrapper>
          <InputWrapper>
            <Button type="submit" size="large" kind="primary" isLoading={formik.isSubmitting}>
              Login
            </Button>
          </InputWrapper>
          <InputWrapper>
            {/* Link to the register page */}
            <Link to="/register">
              <Button size="large" kind="secondary">
                Register
              </Button>
            </Link>
          </InputWrapper>
        </form>
      </InnerContainer>
    </Container>
  );
}

export { Login };
