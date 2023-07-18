//creating 6 div by ruuning the map method for 6 times.

const Loading = () => {
  return (
    <div className="grid w-screen h-screen place-items-center">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
