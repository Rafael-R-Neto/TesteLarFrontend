
import { useEffect } from 'react';
import { usePersonStore } from '../../../stores/personStore';
import { PersonList } from '../components/PersonList';
import { Link } from 'react-router-dom';
import { useLoadingStore } from '../../../stores/loadingStore';
import { FaPlus } from 'react-icons/fa';

export const PersonListPage = () => {
  const { people, loadPeople } = usePersonStore();
  const { show, hide } = useLoadingStore.getState();

  useEffect(() => {
    show();
    loadPeople();
    hide();
  }, [loadPeople]);

  return (
    <>
      <h1>Pessoas Cadastradas</h1>
      <div className="row mb-5 mt-5">
        <div className="col-md-9"></div>
        <Link to="/pessoas/novo" className="col-md-3 btn btn-primary">
          <FaPlus className="me-2" />
          Criar Pessoa
        </Link>
      </div>
      <div className='row'>
        <PersonList people={people} />
      </div>
    </>
  );
};
