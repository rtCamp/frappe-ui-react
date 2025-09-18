export interface AlertProps {
  title?: string;
  type?: 'warning';
  actions?: React.ReactNode;
  children: React.ReactNode;
}