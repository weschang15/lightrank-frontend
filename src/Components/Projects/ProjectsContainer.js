import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import { SectionContainer } from "Elements";
import {
  GET_AUTH,
  GET_PROJECTS,
  PROJECT_ADDED_SUBSCRIPTION
} from "../../graphql";
import ProjectList from "./ProjectList";

class ProjectsContainer extends Component {
  subscribe = (fn, user) => () =>
    fn({
      document: PROJECT_ADDED_SUBSCRIPTION,
      variables: {
        userId: user
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newProject = subscriptionData.data.project;
        const updatedQuery = {
          ...prev.projects,
          ...prev.pageInfo,
          projects: {
            ...prev.projects,
            rows: [...prev.projects.rows, newProject]
          }
        };

        return updatedQuery;
      }
    });

  loadMore = (fn, list) => () =>
    fn({
      variables: {
        input: { after: list[list.length - 1].createdAt }
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          projects: {
            ...fetchMoreResult.projects
          }
        };
      }
    });

  render() {
    const { subscribe, loadMore } = this;
    return (
      <Query query={GET_AUTH}>
        {({ data: { auth }, loading: gettingUser }) => (
          <Query query={GET_PROJECTS} variables={{ input: { after: null } }}>
            {({ data, loading, fetchMore, subscribeToMore }) => {
              const isLoading = gettingUser || loading;
              if (isLoading) return null;
              const { user } = auth;
              return (
                <SectionContainer>
                  <Header>Your Projects</Header>
                  <ProjectList
                    data={data}
                    loadMore={loadMore(fetchMore, data.projects.rows)}
                    subscribeToMore={subscribe(subscribeToMore, user)}
                  />
                </SectionContainer>
              );
            }}
          </Query>
        )}
      </Query>
    );
  }
}

const Header = styled.h3`
  text-transform: uppercase;
  color: #272838;
  letter-spacing: 0.005em;
  font-weight: 900;
`;

export default ProjectsContainer;
