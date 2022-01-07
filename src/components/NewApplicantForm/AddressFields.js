import { Box, TextField, Select, MenuItem } from "@mui/material";
import { statesList } from "../../utils";

const styles = {
  addressBlock: { display: "flex", flexDirection: "column" },
  inputField: { flex: 1, m: "0.5em 0.5em 0em 0.5em" },
  selectField: { flex: 1, m: "0.5em 0em 0em 0em" },
};

/*
  renders address fields in modular fashion, allowing field-set to be swapped
  out or modified independently
*/
function AddressFields({ address, handleChange }) {
  return (
    <Box sx={styles.addressBlock}>
      <TextField
        name="address.street"
        label="street"
        type="text"
        value={address.street}
        onChange={handleChange}
        variant="outlined"
        sx={styles.inputField}
      />
      <Box>
        <TextField
          name="address.city"
          label="city"
          type="text"
          value={address.city}
          onChange={handleChange}
          variant="outlined"
          sx={styles.inputField}
        />
        <Select
          name="address.state"
          label="state"
          type="text"
          value={address.state}
          onChange={handleChange}
          variant="outlined"
          sx={styles.selectField}
        >
          {statesList.map((state, i) => (
            <MenuItem key={`state ${i}`} name="address.state" value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
        <TextField
          name="address.zip_code"
          label="zip code"
          type="text"
          value={address.zip_code}
          onChange={handleChange}
          variant="outlined"
          sx={styles.inputField}
        />
      </Box>
    </Box>
  );
}

export default AddressFields;
