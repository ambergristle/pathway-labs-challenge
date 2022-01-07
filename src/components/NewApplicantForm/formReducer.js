import { updateNested } from "../../utils";

/*
  @prop state current state object
  @prop action { type: string, field: string, value: string}
  returns updated state object
*/
export const formReducer = (state, { type, field, value }) => {
  switch (type) {
    // could be expanded to support more granular change types
    case "update":
      // check if field name is dot-delimited (indicated nested value)
      if (/\./.test(field)) {
        // recursively step into object to update specified key
        return updateNested(state, field.split("."), value);
      }
      // if field is not nested, simply update
      return { ...state, [field]: value };
  }
};

// define initial form values, including hidden/defaults
export const initialValues = {
  first_name: "",
  last_name: "",
  address: {
    street: "",
    city: "",
    state: "AL",
    zip_code: "",
  },
  created_at: null,
  application_status: "started",
  document_ids: [],
  payment_id: null,
};
