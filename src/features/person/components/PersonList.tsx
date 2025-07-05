import { Link, useNavigate } from 'react-router-dom';
import type { Person } from '../types/person';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { removePerson } from '../services/personService';
import { useToastStore } from '../../../stores/toastStore';
import { ConfirmModal } from '../../../components/common/ConfirmModal';
import { useConfirmModalStore } from '../../../stores/confirmModalStore';
import { useLoadingStore } from '../../../stores/loadingStore';

type Props = {
  people: Person[];
};

export const PersonList = ({ people }: Props) => {
  const navigate = useNavigate();
  const { show, hide } = useLoadingStore.getState();
  const { showToast } = useToastStore();
  const { showModal } = useConfirmModalStore();

  const handleRemove = async (id: number) => {
    show();
    await removePerson(id)
      .then((resp: any) => {
        showToast("Registro deletado com sucesso!", "success");
      }).catch((error: any) => {
        showToast("Erro ao deletar registro!", "error");
      }).finally(() => {
        hide();
        navigate("../pessoas")
      })
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Data de Nascimento</th>
          <th>Acões</th>
        </tr>
      </thead>
      <tbody>
        {people?.map((p, i) => (
          <tr key={i}>
            <td>{p.name}</td>
            <td>{p.cpf}</td>
            <td>{p.birthDate}</td>
            <td>
              <a onClick={() => navigate(`/pessoas/editar/${p.id}`)} className="btn btn-success">
                <FaEdit className="me-2" />
              </a>
              <a onClick={() => showModal({
                title: 'Confirmar exclusão',
                message: `Tem certeza que deseja excluir ${p.name}?`,
                onConfirm: () => {
                  handleRemove(p.id);
                }
              })} className="btn btn-danger">
                <FaTrash className="me-2" />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table >
  );
}