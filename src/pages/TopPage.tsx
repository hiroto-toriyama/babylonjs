import Box from "../components/box";
import Village from "../components/Village";

const TopPage = () => {
  return (
    <div className="container mx-auto my-5">
      <div className="font-bold text-3xl my-5">Babyron.js</div>
      <div className="flex flex-col gap-5">
        <Box />
        <Village />
      </div>
    </div>
  );
};

export default TopPage;