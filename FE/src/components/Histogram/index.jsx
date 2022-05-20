import useCreateHistogram from "../../hooks/useCreateHistogram";
const Histogram = ({ dimensions, data }) => {
  const refHisto = useCreateHistogram(dimensions, data);
  return (
    <svg width={dimensions.width} height={dimensions.height} ref={refHisto} />
  );
};
export default Histogram;
