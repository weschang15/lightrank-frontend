import React from "react";
import styled from "styled-components";
import { Icon, Spinner, TableRow, TableCell } from "Elements";
import Score from "../Scores/Score";
import ScoreWrapper from "../Scores/ScoreWrapper";

const renderScores = (scores, uuid) => {
  return scores.map(score => (
    <Score key={`${uuid}${score.name}`} score={score} />
  ));
};

const ReportListItem = ({
  report: { id, url, uuid, scores, completed, updated_at }
}) => {
  return (
    <TableRow className="no-hover">
      <TableCell>{id}</TableCell>
      <TableCell>{url}</TableCell>
      <TableCell>
        <ScoreWrapper>{renderScores(scores, uuid)}</ScoreWrapper>
      </TableCell>
      <TableCell>{new Date(updated_at).toLocaleString()}</TableCell>
      <CenterCell>
        <span>
          {completed ? (
            <Icon name="checkmark" size="16px" color="#00f836" />
          ) : (
            <Spinner />
          )}
        </span>
      </CenterCell>
    </TableRow>
  );
};

const CenterCell = styled(TableCell)`
  text-align: center;
  > span {
    display: block;
    svg {
      margin: 0 auto;
    }
  }
`;

export default ReportListItem;
