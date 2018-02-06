import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import history from '../../../history';
import BriefingQuery from '../../../queries/Briefing';
import Loader from '../../styles/Loader';
import {
  ActionsHolder,
  ActionsList,
  ActionsMenuListItem,
  BriefingList,
  SectionList,
} from './styles';

const isBriefingActive = (sections) => {
  const idPattern = /\w*\d\w*/i;
  const idFromURL = idPattern.exec(history.location.pathname)[0];

  const indexFound = sections.findIndex(el => el._id === idFromURL);

  return indexFound !== -1;
};

const isSectionActive = (sectionId) => {
  const idPattern = /\w*\d\w*/i;
  const idFromURL = idPattern.exec(history.location.pathname)[0];

  return sectionId === idFromURL;
};

const ActionMenu = ({ data: { loading, briefings } }) => {
  if (loading) return <Loader />;

  return (
    <ActionsHolder className="row">
      <ActionsList className="col-xl-auto">
        <Link to="/dashboard">
          <ActionsMenuListItem>
            <i className="fas fa-home" />
          </ActionsMenuListItem>
        </Link>
        <Link to="/dashboard/clientes">
          <ActionsMenuListItem>
            <i className="fas fa-users" />
          </ActionsMenuListItem>
        </Link>
        <Link to="/dashboard/briefings">
          <ActionsMenuListItem className="active">
            <i className="fab fa-wpforms" />
          </ActionsMenuListItem>
        </Link>
        <Link to="/dashboard/configuracoes">
          <ActionsMenuListItem>
            <i className="fas fa-cogs" />
          </ActionsMenuListItem>
        </Link>
      </ActionsList>
      <div className="col-xl">
        <BriefingList>
          {briefings.map(briefing => (
            <li key={briefing._id}>
              <Link to={`/dashboard/briefing/${briefing._id}/secao`}>
                <div>{briefing.title}</div>
              </Link>
              {isBriefingActive(briefing.sections) && (
                <SectionList>
                  {briefing.sections.map(section => (
                    <li key={section._id}>
                      <Link to={`/dashboard/secao/${section._id}/perguntas`}>
                        <div className={isSectionActive(section._id) ? 'active' : ''}>
                          {section.title}
                        </div>
                      </Link>
                    </li>
                  ))}
                </SectionList>
              )}
            </li>
          ))}
        </BriefingList>
      </div>
    </ActionsHolder>
  );
};

const ActionMenuWithData = graphql(BriefingQuery.menuBriefings)(ActionMenu);

export default ActionMenuWithData;
