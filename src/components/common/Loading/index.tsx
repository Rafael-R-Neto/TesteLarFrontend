import { useLoadingStore } from '../../../stores/loadingStore';
import { loadingStyle } from './style';

export const Loading = () => {
  const { isLoading } = useLoadingStore();
  if (!isLoading) return null;

  return (

    <div style={loadingStyle.overlay}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
    </div>
  );
};
