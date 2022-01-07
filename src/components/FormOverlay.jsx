import { Dialog, DialogContent } from "@mui/material";
import { useAppContext } from "./Layout";
import NewApplicantForm from "./NewApplicantForm";

/*
  render dialog when showForm, includes semi-transparent overlay to
  focus attention on form, and form block that closes on submission
  or clickaway
*/
function FormOverlay() {
  const { formOverlayState } = useAppContext();
  const [showForm, setShowForm] = formOverlayState;

  const handleClose = () => setShowForm(false);

  return (
    <Dialog open={showForm} onClose={handleClose}>
      <DialogContent>
        <NewApplicantForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

export default FormOverlay;
