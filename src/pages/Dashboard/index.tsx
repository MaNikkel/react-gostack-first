import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );
    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setInputError('');
    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }
    try {
      const res = await api.get<Repository>(`/repos/${newRepo}`);
      const repository = res.data;
      setRepositories([...repositories, repository]);
      setNewRepo('');
    } catch (err) {
      setInputError('Erro na busca do repositório');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github.</Title>
      <Form onSubmit={handleAddRepository} hasError={!!inputError}>
        <input
          type="text"
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
        />

        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map(repository => (
          <Link
            to={`repository/${repository.full_name}`}
            key={repository.full_name}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
