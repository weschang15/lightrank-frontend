import { gql } from "apollo-boost";

export default gql`
  mutation CreateReport($input: ReportInput!) {
    createReport(input: $input) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
