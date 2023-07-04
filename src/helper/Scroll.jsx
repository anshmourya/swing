//funtion to handel the infinite scroll
export const handelScroll = ({
  visibleData,
  setVisibleData,
  data,
  itemsPerScroll,
}) => {
  //if scroll bar not reaches to the end then retrun
  if (
    window.innerHeight + document.documentElement.scrollTop !==
    document.documentElement.offsetHeight
  ) {
    return;
  } else {
    const nextBatch = data.slice(
      visibleData.length,
      visibleData.length + itemsPerScroll
    );
    //storing the previous data as well as the next batch(new data)
    setVisibleData((prev) => [...prev, ...nextBatch]);
  }
};
