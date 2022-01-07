import { useReducer } from "react";
import { getUnixTime } from "date-fns";
import { Box, TextField, Button } from "@mui/material";

import { formReducer, initialValues } from "./formReducer";
import AddressFields from "./AddressFields";

const styles = {
  formBlock: { display: "flex", flexDirection: "column" },
  nameBlock: { display: "flex", justifyContent: "space-between" },
  inputField: { flex: 1, m: "0.5em 0.5em 0em 0.5em" },
  submitBtn: { m: "1.5em 4em 0.5em 4em" },
};

/*
  render applicant form taking name (first, last) and address, with
  "hidden" values like application date and status auto-filled
  uses reducer to manage form state, logs form value son submission
*/
function NewApplicantForm({ handleClose }) {
  const [applicant, dispatch] = useReducer(formReducer, initialValues);

  const handleChange = ({ target }) => {
    dispatch({
      type: "update",
      field: target.name,
      value: target.value,
    });
  };

  const submitForm = () => {
    const { first_name, last_name, ...rest } = applicant;
    const applicantData = {
      name: `${first_name} ${last_name}`,
      ...rest,
      created_at: getUnixTime(new Date()),
    };
    console.log(applicantData);
    handleClose();
  };

  return (
    <Box sx={styles.formBlock}>
      <Box sx={styles.nameBlock}>
        <TextField
          name="first_name"
          label="first name"
          type="text"
          value={applicant.first_name}
          onChange={handleChange}
          variant="outlined"
          sx={styles.inputField}
        />
        <TextField
          name="last_name"
          label="last name"
          type="text"
          value={applicant.last_name}
          onChange={handleChange}
          variant="outlined"
          sx={styles.inputField}
        />
      </Box>
      <AddressFields address={applicant.address} handleChange={handleChange} />
      <Button
        onClick={submitForm}
        variant="contained"
        color="secondary"
        sx={styles.submitBtn}
      >
        submit
      </Button>
    </Box>
  );
}

export default NewApplicantForm;
