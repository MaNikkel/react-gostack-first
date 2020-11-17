import React from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { useRouteMatch, Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  return (
    <>
      <Header>
        <img src={logoImg} alt="logo" />
        <Link to="/">
          <FiChevronLeft size={16} />
          voltar
        </Link>
      </Header>
      <RepositoryInfo>
        <header>
          <img
            src="https://avatars2.githubusercontent.com/u/13185705?s=460&u=c628599d893cde7567950d839d7d74c2176a877d&v=4"
            alt="repo"
          />
          <div>
            <strong>teste</strong>
            <p>teste</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>777</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>777</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>777</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>
      <Issues>
        <Link to="repository">
          <div>
            <strong>teste</strong>
            <p>teste</p>
          </div>
          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </>
  );
};

export default Repository;
