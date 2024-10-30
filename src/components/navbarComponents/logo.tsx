import Link from 'next/link'; 
const Logo: React.FC = () =>{
    return(
        <div className="text-2xl font-bold ">
             <Link href="/" className="hover:text-blue-600 cursor-pointer">
             <h2 className=""><span className='text-white'>  Hotel </span><span className="text-red-800">Ranking</span></h2>
        </Link>
     
    </div>
    )
   
}
export default Logo;