import { FC } from "react";

type ChechboxProps = {
  isDone: boolean;
  onClick: () => void;
  isDisabled?: boolean;
};

const Checkbox: FC<ChechboxProps> = ({ isDone, onClick, isDisabled }) => (
  <input
    disabled={isDisabled}
    onClick={onClick}
    type="checkbox"
    defaultChecked={isDone}
  />
);

export default Checkbox;
