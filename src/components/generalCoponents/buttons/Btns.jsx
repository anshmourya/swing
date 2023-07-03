const Btns = ({ buttonTitle, onClickFuntion, buttonStyle }) => {
  return (
    <button onClick={() => onClickFuntion()} className={buttonStyle}>
      {buttonTitle}
    </button>
  );
};

export default Btns;
