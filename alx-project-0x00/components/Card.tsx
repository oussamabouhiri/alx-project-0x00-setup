import Image from "next/image";
import Pill from "./Pill";

const Card: React.FC = () => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src="/assets/images/house.png"
          alt="House"
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex gap-2 mb-3">
          <Pill title="Featured" />
          <Pill title="Popular" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Beautiful House</h3>
        <div className="flex items-center gap-1 mb-2">
          <Image
            src="/assets/images/star.png"
            alt="Star"
            width={16}
            height={16}
          />
          <span className="text-sm text-gray-600">4.5</span>
        </div>
        <div className="text-lg font-bold">
          $150{" "}
          <span className="text-sm font-normal text-gray-600">/ night</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
