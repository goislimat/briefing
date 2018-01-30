import React from 'react';
import PropTypes from 'prop-types';

import { CardGutter, Card, CardButton, UserInput } from './styles';

const UserCard = ({ omit, user }) => (
  <CardGutter className={`col-xl-6 ${user.template && omit ? 'blank' : ''}`}>
    <Card cardColor={user.color} className="col-xl-12 row">
      <div className="image col-xl-3">{user.image}</div>
      <div className="w100 col-xl d-flex justify-content-center align-items-start flex-column">
        <div className="w100 company">
          {user.template ? <UserInput type="text" placeholder={user.company} /> : user.company}
        </div>
        <div className="w100">
          {user.template ? <UserInput type="text" placeholder={user.name} /> : user.name}
        </div>
        <div className="w100">
          <small>
            {user.template ? <UserInput type="text" placeholder={user.email} /> : user.email}
          </small>
        </div>
      </div>
      <div className="col-xl-1">
        {user.template ? (
          <CardButton save title="Salvar">
            <i className="fa fa-floppy-o" aria-hidden="true" />
          </CardButton>
        ) : (
          <div>
            <CardButton delete title="Excluir">
              <i className="fa fa-times" aria-hidden="true" />
            </CardButton>
            <CardButton title="Editar">
              <i className="fa fa-cog" aria-hidden="true" />
            </CardButton>
            <CardButton move title="Mover">
              <i className="fa fa-bars" aria-hidden="true" />
            </CardButton>
          </div>
        )}
      </div>
    </Card>
  </CardGutter>
);

export default UserCard;

UserCard.propTypes = {
  omit: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    color: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    company: PropTypes.string,
  }).isRequired,
};
