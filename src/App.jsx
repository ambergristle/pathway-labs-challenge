import { useState, useEffect } from "react";
import { Layout, ApplicantsTable } from "./components";
import styles from "./styles.css";

/*
  render layout and children; could be further abstracted
  for the introduction of routing
*/
function App() {
  // would likely be best to use persistent global storage
  const [data, setData] = useState([]);

  useEffect(() => {
    // get mock applicant data from json file on mount
    // ideally moved to a different file, requested only on table load
    fetch(`${process.env.PUBLIC_URL}/applicantData.json`)
      .then((response) => {
        if (!response.ok) {
          // handle response errors
          throw new Error("data could not be retrieved");
        }
        return response.json();
      })
      .then((applicants) => setData(applicants))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <Layout>
      <ApplicantsTable applicantData={data} />
    </Layout>
  );
}

export default App;
