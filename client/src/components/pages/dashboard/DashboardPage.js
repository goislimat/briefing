import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import data from './data';
import { Content, GutterCard, Card, Button } from './styles';
import UserRoute from '../../routes/UserRoute';
import Container from '../../styles/Container';
import TopMenu from '../../menus/topMenu/TopMenu';
import SideBar from '../../menus/sidebar/SideBar';
import UsersPage from '../users/UsersPage';
import QuestionsPage from '../questions/QuestionsPage';
import NewBriefing from '../briefings/new/NewBriefing';
import NewSection from '../sections/new/NewSection';

class DashboardPage extends Component {
  componentDidMount() {
    document.body.style.backgroundImage = 'none';
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <div className="h100 row">
        <SideBar />
        <div className="h100 col-xl-9">
          <TopMenu />
          <Content>
            {this.props.location.pathname === '/dashboard' && (
              <Container>
                <div className="row">
                  {data.cards.map(card => (
                    <GutterCard key={card.id} className="col-xl-4 text-center">
                      <Card cardColor={card.color}>
                        <div>{card.image}</div>
                        <h5 className="title">{card.title}</h5>
                        <p>{card.text}</p>
                        <div>
                          <Link to={card.action}>
                            <Button>{card.cta}</Button>
                          </Link>
                        </div>
                      </Card>
                    </GutterCard>
                  ))}
                </div>
              </Container>
            )}
            <UserRoute
              isAuthenticated={isAuthenticated}
              path="/dashboard/clientes"
              component={UsersPage}
            />
            <UserRoute
              isAuthenticated={isAuthenticated}
              path="/dashboard/briefings"
              component={QuestionsPage}
            />
            <UserRoute
              isAuthenticated={isAuthenticated}
              path="/dashboard/notificacoes"
              component={() => <div>Notificacoes</div>}
            />
            <UserRoute
              isAuthenticated={isAuthenticated}
              path="/dashboard/briefing/novo"
              component={NewBriefing}
            />
            <UserRoute
              isAuthenticated={isAuthenticated}
              path="/dashboard/briefing/:id/secao/novo"
              component={NewSection}
            />
            <UserRoute
              isAuthenticated={isAuthenticated}
              path="/dashboard/secao/:id/perguntas"
              component={QuestionsPage}
            />
          </Content>
        </div>
      </div>
    );
  }
}

export default DashboardPage;

DashboardPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
