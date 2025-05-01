import type { Car as CarType } from "../../../types/global";

const Car = ({ car }: { car: CarType }) => {
  const { make, model, body_type } = car;

  return (
    <div className="rounded-2xl shadow-md p-5 bg-white hover:shadow-lg transition-shadow duration-300 w-full max-w-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {make} {model}
      </h2>
      <p className="text-gray-500">Body type: <span className="font-medium text-gray-700">{body_type}</span></p>
    </div>
  );
};

export default Car;