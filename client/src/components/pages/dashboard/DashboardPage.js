import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Link } from 'react-router-dom';

import data from './data';
import { Content, GutterCard, Card, Button } from './styles';

import UserRoute from '../../routes/UserRoute';
import AdminRoute from '../../routes/AdminRoute';

import Container from '../../styles/Container';
import TopMenu from '../../menus/topMenu/TopMenu';
import SideBar from '../../menus/sidebar/SideBar';
import UsersPage from '../users/UsersPage';
import BriefingsPage from '../briefings/BriefingsPage';
import SectionsPage from '../sections/SectionsPage';
import QuestionsPage from '../questions/QuestionsPage';
import NotFoundPage from '../notFound/NotFound';

class DashboardPage extends Component {
  componentDidMount() {
    document.body.style.backgroundImage = 'none';
  }

  render() {
    const { isAuthenticated, isAdmin, location: { pathname } } = this.props;

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
                        <div>
                          <img src={card.image} alt={`${card.title}-img`} height="80" />
                        </div>
                        <h5 className="title">{card.title}</h5>
                        <p>{card.text}</p>
                        <div>
                          <Link to={card.location}>
                            <Button>{card.cta}</Button>
                          </Link>
                        </div>
                      </Card>
                    </GutterCard>
                  ))}
                </div>
              </Container>
            )}
            <Switch>
              <AdminRoute
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                exact
                path="/dashboard/clientes"
                component={UsersPage}
              />
              <AdminRoute
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                exact
                path="/dashboard/briefings"
                component={BriefingsPage}
              />
              <AdminRoute
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                exact
                path="/dashboard/briefing/:id/secao"
                component={SectionsPage}
              />
              <AdminRoute
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                exact
                path="/dashboard/secao/:id/perguntas"
                component={QuestionsPage}
              />
              <UserRoute
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                exact
                path="/dashboard/notificacoes"
                component={() => <div>Notificacoes</div>}
              />
              {pathname !== '/dashboard' && (
                <UserRoute
                  isAuthenticated={isAuthenticated}
                  isAdmin={isAdmin}
                  component={NotFoundPage}
                />
              )}
            </Switch>
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
