import { createContext, useContext, useState } from "react";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import FormOverlay from "./FormOverlay";

// context created to pass popup open state and handlers w/o drilling
const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

/*
  display page header/navigation and view content
  render children and form popup
*/
function Layout({ children }) {
  const formOverlayState = useState(false);
  const [showForm, setShowForm] = formOverlayState;

  const handleClick = () => {
    setShowForm(!showForm);
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>applicants</Typography>
          <Button variant="contained" color="secondary" onClick={handleClick}>
            add new
          </Button>
        </Toolbar>
      </AppBar>
      <AppContext.Provider value={{ formOverlayState }}>
        {children}
        <FormOverlay />
      </AppContext.Provider>
    </Container>
  );
}

export default Layout;
