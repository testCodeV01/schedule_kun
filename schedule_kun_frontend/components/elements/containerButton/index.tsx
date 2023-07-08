import { Button } from 'react-bootstrap';

import styles from './styles.module.css';

const ContainerButton = ({
  children,
  className = '',
  onClick,
}: {
  children?: any;
  className: string;
  onClick?: () => void;
}) => {
  return (
    <>
      <Button className={`${className} ${styles.iconButton}`} onClick={onClick}>
        {children}
      </Button>
    </>
  );
};

export default ContainerButton;
