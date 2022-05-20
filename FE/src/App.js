import "./App.css";
import Button from "./components/Button";
import useFetch from "./hooks/useFetch";
import Histogram from "./components/Histogram/index";
function App() {
  const { data, loading, error, refetch } = useFetch(
    `http://localhost:4000/get_array`
  );
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const handleOnClick = () => {
    refetch();
  };
  return (
    <div className="main-container">
      <Histogram
        dimensions={{
          width: 600,
          height: 300,
          margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 60,
          },
        }}
        data={data.message}
      />
      <Button onClick={handleOnClick}>New Data</Button>
    </div>
  );
}

export default App;
