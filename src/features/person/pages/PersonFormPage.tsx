
import { PersonForm } from '../components/PersonForm';
import { useToastStore } from '../../../stores/toastStore';
import { useNavigate, useParams } from 'react-router-dom';
import { createPerson, getPersonById, updatePerson } from '../services/personService';
import { useLoadingStore } from '../../../stores/loadingStore';
import { useEffect, useState } from 'react';

export const PersonFormPage = () => {
  const { id } = useParams();
  const { showToast } = useToastStore();
  const { show, hide } = useLoadingStore.getState();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      show();
      getPersonById(Number(id))
        .then((data) => {
          setInitialData(data);
        })
        .catch(() => {
          showToast('Erro ao carregar dados da pessoa.', 'error');
        })
        .finally(hide);
    }
  }, [id]);

  const handleSubmit = async (person: any) => {
    const date = new Date(person.birthDate);
    if (isNaN(date.getTime())) {
      showToast('Data de nascimento inválida.', 'error');
      return;
    }

    const payload = {
      id: id ? Number(id) : 0,
      name: person.name,
      cpf: person.cpf,
      birthDate: date.toISOString(),
      phone: person?.phones?.map((p: any) => ({
        id: p.id || 0,
        number: p.number,
        phoneTypeId: Number(p.typeId)
      }))
    };

    show();
    const action = id ? updatePerson : createPerson;

    await action(payload)
      .then(() => {
        showToast(`Pessoa ${id ? 'atualizada' : 'cadastrada'} com sucesso!`, 'success');
        navigate('/pessoas');
      })
      .catch((error: any) => {
        showToast(`Erro ao ${id ? 'atualizar' : 'cadastrar'} pessoa.`, 'error');
        console.error(error);
      })
      .finally(hide);
  };

  return (
    <div className="card shadow-sm">
      <PersonForm onSubmit={handleSubmit} initialData={initialData} />
    </div>
  );
};
