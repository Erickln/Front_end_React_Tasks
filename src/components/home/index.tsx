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

  const generateReport = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/report",
        { responseType: "blob" }
      );
      
      // Create a blob from the response data
      const blob = new Blob([response.data], { type: "text/plain" });
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.txt");
      
      // Append the link to the document body
      document.body.appendChild(link);
      
      // Trigger the click event on the link to initiate the download
      link.click();
      
      // Remove the link from the document body
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <Container>
      <div style={{ position: "absolute", top: 0, left: 0, padding: "10px" }}>
        <Button onClick={generateReport}>Generate Report</Button>
      </div>
      <HeadingXXLarge color="secondary500">Welcome back</HeadingXXLarge>
      <Button kind="secondary" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
}

export { Home };
