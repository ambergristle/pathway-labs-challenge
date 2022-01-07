import {
  differenceInCalendarDays as dayDiff,
  fromUnixTime as fromUnix,
} from "date-fns";

/*
  check which requirements are incomplete, if any, and return application state
  @param steps object indicating the state of each requirement
  @returns object with keys missing (array of incomplete requirements) and complete (boolean completness)
*/
const validateSteps = (steps) =>
  Object.keys(steps).reduce(
    (reduced, key) => {
      const step = steps[key];

      if (step.complete) {
        return reduced;
      } else {
        return { missing: [...reduced.missing, step.type], complete: false };
      }
    },
    { missing: [], complete: true }
  );

/*
  consolidate application status into single value, indicate missing
  requirements, if any, and convert datetime stamp to days elapsed
  @param applicantData object with applicant's data
  returns object with applicant data transformed for presentation
*/
export const parseData = (applicantData) => {
  const {
    name,
    created_at,
    application_status,
    document_ids,
    payment_id,
  } = applicantData;

  const steps = {
    application: { type: "app", complete: application_status === "completed" },
    documentsReceived: { type: "docs", complete: document_ids.length === 2 },
    paymentReceived: { type: "pay", complete: payment_id !== null },
  };

  const { missing, complete } = validateSteps(steps);

  return {
    name,
    status: complete,
    daysPending: dayDiff(new Date(), fromUnix(created_at)),
    missing,
  };
};

/*
  update a nested value by recursively returning current values
  until nested key is reached and value updated
  @param state object with current state
  @param path array of keys pointing to value that needs to be modified
  @param value new value
  @returns state object with specified key updated
*/
export const updateNested = (state, path, value) => {
  // get first key in array
  const [key, ...keys] = path;

  if (path.length === 1) {
    // if first key is last/only, return state with updated key
    return {
      ...state,
      [key]: value,
    };
  }

  // if value is more deeply nested, step deeper into object
  return {
    ...state,
    [key]: updateNested(state[key], keys, value),
  };
};

// store list of state options for select field
export const statesList = [
  "AK",
  "AL",
  "AR",
  "AS",
  "AZ",
  "CA",
  "CO",
  "CT",
  "DC",
  "DE",
  "FL",
  "GA",
  "GU",
  "HI",
  "IA",
  "ID",
  "IL",
  "IN",
  "KS",
  "KY",
  "LA",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MS",
  "MT",
  "NC",
  "ND",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VA",
  "VI",
  "VT",
  "WA",
  "WI",
  "WV",
  "WY",
];
