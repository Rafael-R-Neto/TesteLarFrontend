
import { Routes, Route, Navigate } from 'react-router-dom';
import { PersonListPage } from '../../features/person/pages/PersonListPage';
import { PersonFormPage } from '../../features/person/pages/PersonFormPage';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/pessoas" />} />
    <Route path="/pessoas" element={<PersonListPage />} />
    <Route path="/pessoas/novo" element={<PersonFormPage />} />
    <Route path="/pessoas/editar/:id" element={<PersonFormPage />} />

  </Routes>
);
