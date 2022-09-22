import Box from "../components/box";
import Village from "../components/Village";

const TopPage = () => {
  return (
    <div className="bg-base-200">
      <div className="container mx-auto p-5 lg:max-w-4xl bg-base-100">
        <div className="font-bold text-5xl mb-5 border-b-8">Babyron.js</div>
        <div className="flex flex-col gap-5">
          <Box />
          <Village />
        </div>
      </div>
    </div>
  );
};

export default TopPage;