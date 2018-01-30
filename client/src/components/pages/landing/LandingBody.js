import React from 'react';
import { Link } from 'react-router-dom';

import data from './data';
import {
  TransparentSection,
  LoginButton,
  Title,
  Paragraph,
  ArticleFooter,
  CTAButton,
} from './styles';

const LandingBody = () => {
  const {
    logo, title, body, call,
  } = data.content;

  return (
    <TransparentSection className="row d-flex justify-content-center align-items-center">
      <div className="col-xl-6">
        <header className="row">
          <div className="col-xl">
            <img src={logo} alt="Petrol Logo" width="80" />
          </div>
          <div className="col-xl d-flex justify-content-end align-items-center">
            <Link to="/acesso">
              <LoginButton rounded>Login</LoginButton>
            </Link>
          </div>
        </header>
        <article>
          <header>
            <Title dangerouslySetInnerHTML={{ __html: title }} />
          </header>
          <Paragraph>{body}</Paragraph>
          <ArticleFooter>
            <strong>{call}</strong>
          </ArticleFooter>
        </article>
        <div className="text-center">
          <Link to="/acesso">
            <CTAButton rounded>Então, vamos começar!</CTAButton>
          </Link>
        </div>
      </div>
    </TransparentSection>
  );
};

export default LandingBody;
