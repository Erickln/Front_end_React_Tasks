import axios from "axios";
import { Button } from "baseui/button";
import { HeadingXXLarge } from "baseui/typography";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Container } from "../commons";
import Cookies from "js-cookie";

function Home() {
  const singOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    singOut();
    navigate("/login");
    // remove all cookies
    Cookies.remove("token");
  };

  const getTasks = async () => {
    const response = await axios.get("http://localhost:9000/api/v1/payment", {
      withCredentials: true,
    });
    console.log("Response: ", response);
  };

  return (
    <Container>
      <HeadingXXLarge color="secondary500">Welcome back</HeadingXXLarge>
      <Button kind="secondary" onClick={getTasks}>
        Get Tasks
      </Button>
      <Button kind="secondary" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
}

export { Home };
