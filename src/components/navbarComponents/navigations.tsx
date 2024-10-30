import Link from 'next/link'; 

const Navigations: React.FC = () => {
  return (
    <div>
    <ul className="flex flex-col md:flex-row gap-4 md:gap-12">
      <li>
        <Link href="/createHotel" className="text-xl text-white hover:text-blue-600 cursor-pointer">
          Add Hotel
        </Link>
      </li>
      <li>
        <Link href="/hotels" className="text-xl  text-white hover:text-blue-600 cursor-pointer">
          Hotels
        </Link>
      </li>
      <li>
        <Link href="/categories" className="text-xl  text-white hover:text-blue-600 cursor-pointer">
          Categories
        </Link>
      </li>
      <li>
        <Link href="/rate" className="text-xl text-white hover:text-blue-600 cursor-pointer">
          Rate
        </Link>
      </li>
    </ul>
  </div>
  );
};
export default Navigations;
