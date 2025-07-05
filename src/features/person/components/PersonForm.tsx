import { useEffect, useState } from 'react';
import { personSchema, type PersonInput } from '../validation/personSchema';
import { useToastStore } from '../../../stores/toastStore';
import { useLoadingStore } from '../../../stores/loadingStore';
import { IMaskInput } from 'react-imask';
import { getPhoneTypes } from '../services/phoneService';

interface PhoneInput {
  id?: number;
  number: string;
  typeId: string;
  phoneType?: { id: number };
}

interface PhoneType {
  id: string;
  name: string;
}

type Props = {
  onSubmit: (person: PersonInput & { phones: PhoneInput[] }) => void;
  initialData?: PersonInput & { phones: PhoneInput[] };
};

export const PersonForm = ({ onSubmit, initialData }: Props) => {
  const [form, setForm] = useState<PersonInput>({ name: '', cpf: '', birthDate: '', phone: [] });
  const [phones, setPhones] = useState<PhoneInput[]>([{ number: '', typeId: '' }]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [phoneTypes, setPhoneTypes] = useState<PhoneType[]>([]);

  const { showToast } = useToastStore();
  const { show, hide } = useLoadingStore.getState();

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        cpf: initialData.cpf,
        birthDate: initialData.birthDate.slice(0, 10), // formata para input date
        phone: []
      });
      setPhones(
        (initialData.phone ?? []).map((p: any) => ({
          id: p.id,
          number: p.number,
          typeId: p.phoneType?.id?.toString() ?? p.typeId ?? ''
        }))
      );
    }
  }, [initialData]);

  const loadPhoneTypes = async () => {
    try {
      show();
      const response = await getPhoneTypes();
      setPhoneTypes(response);
    } catch (error: any) {
      showToast(`Erro ao carregar tipos de telefone! Erro: ${error}`, 'error');
    } finally {
      hide();
    }
  };

  useEffect(() => {
    loadPhoneTypes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateField = (fieldName: keyof PersonInput, value: string) => {
    try {
      const fieldSchema = personSchema.shape[fieldName];
      fieldSchema.parse(value);
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, [fieldName]: err.errors?.[0]?.message || 'Campo inválido' }));
    }
  };

  const validatePhoneField = (index: number) => {
    const phone = phones[index];
    const digits = phone.number.replace(/\D/g, '');
    const isValid = digits.length === 10 || digits.length === 11;

    const newErrors = { ...errors };
    if (!isValid) {
      newErrors[`phone_${index}`] = 'Telefone inválido';
    } else {
      delete newErrors[`phone_${index}`];
    }
    setErrors(newErrors);
  };

  const handlePhoneChange = (index: number, field: keyof PhoneInput, value: string) => {
    const updated = [...phones];
    if (field === 'typeId' || field === 'number') {
      updated[index][field] = value as string;
    } else if (field === 'id') {
      updated[index][field] = Number(value) as number;
    }
    setPhones(updated);
  };

  const addPhone = () => setPhones([...phones, { number: '', typeId: '' }]);
  const removePhone = (index: number) => setPhones(phones.filter((_, i) => i !== index));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = personSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        const path = err.path[0];
        if (path) fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    onSubmit({ ...result.data, phones });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="mb-4">Dados da Pessoa</h5>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Nome</label>
          <input
            name="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={form.name}
            onChange={handleChange}
            onBlur={() => validateField('name', form.name)}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="col-md-3">
          <label className="form-label">CPF</label>
          <IMaskInput
            mask="000.000.000-00"
            name="cpf"
            className={`form-control ${errors.cpf ? 'is-invalid' : ''}`}
            value={form.cpf}
            onAccept={(value) => setForm({ ...form, cpf: value })}
            onBlur={() => validateField('cpf', form.cpf)}
          />
          {errors.cpf && <div className="invalid-feedback">{errors.cpf}</div>}
        </div>
        <div className="col-md-3">
          <label className="form-label">Data de Nascimento</label>
          <input
            name="birthDate"
            type="date"
            className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
            value={form.birthDate}
            onChange={handleChange}
            onBlur={() => validateField('birthDate', form.birthDate)}
          />
          {errors.birthDate && <div className="invalid-feedback">{errors.birthDate}</div>}
        </div>
      </div>

      <div className="mb-3">
        <button type="button" className="btn btn-outline-secondary" onClick={addPhone}>
          + Adicionar Telefone
        </button>
      </div>

      <h5 className="mt-4">Telefones</h5>
      {phones?.map((phone, index) => (
        <div className="row mb-3" key={index}>
          <div className="col-md-6">
            <label className="form-label">Número</label>
            <IMaskInput
              mask={phone.typeId === 'FIXO' ? '(00) 0000-0000' : '(00) 00000-0000'}
              className={`form-control ${errors[`phone_${index}`] ? 'is-invalid' : ''}`}
              value={phone.number}
              onAccept={(value) => handlePhoneChange(index, 'number', value)}
              onBlur={() => validatePhoneField(index)}
            />
            {errors[`phone_${index}`] && <div className="invalid-feedback">{errors[`phone_${index}`]}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label">Tipo</label>
            <select
              className="form-select"
              value={phone.typeId}
              onChange={(e) => handlePhoneChange(index, 'typeId', e.target.value)}
            >
              <option value="">Selecione</option>
              {phoneTypes?.map((pt) => (
                <option key={pt.id} value={pt.id}>{pt.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-outline-danger w-100"
              onClick={() => removePhone(index)}
              disabled={phones.length === 1}
            >
              Remover
            </button>
          </div>
        </div>
      ))}

      <button type="submit" className="btn btn-primary">Salvar</button>
    </form>
  );
};
