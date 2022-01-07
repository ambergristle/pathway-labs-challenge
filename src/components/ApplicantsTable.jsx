import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { default as CrossIcon } from "@mui/icons-material/ClearOutlined";
import { default as Application } from "@mui/icons-material/Mail";
import { default as Docs } from "@mui/icons-material/InsertDriveFile";
import { default as Payment } from "@mui/icons-material/CreditCard";
import { parseData } from "../utils";

/*
  render appropriate icon to represent "next" required step
*/
function NextStep({ next }) {
  switch (next) {
    case "app":
      return <Application sx={{ opacity: "50%" }} />;
    case "docs":
      return <Docs sx={{ opacity: "50%" }} />;
    case "pay":
      return <Payment sx={{ opacity: "50%" }} />;
    default:
      return null;
  }
}

// statically define column names
const COLUMNS = ["name", "status", "next step", "days as applicant"];

/*
  render table with specified columns and applicant data (transformed to
  represent holistic application status and next steps)
*/
function ApplicantsTable({ applicantData }) {
  const tableRows = applicantData.map((applicant) => parseData(applicant));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {COLUMNS.map((columnName, index) => (
              <TableCell key={`column-${index}`}>{columnName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((applicant, index) => (
            <TableRow key={`applicant-${index}`}>
              <TableCell>{applicant.name}</TableCell>
              <TableCell>
                {applicant.status ? <CheckIcon /> : <CrossIcon />}
              </TableCell>
              <TableCell>
                <NextStep next={applicant.missing[0]} />
              </TableCell>
              <TableCell>{applicant.daysPending}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ApplicantsTable;
