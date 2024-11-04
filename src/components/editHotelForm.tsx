import { useState } from "react";
interface Hotel {
    id: number;
    name: string;
    country: string;
    address: string;
    description: string;
    rating: number;
    image: string;
    category: string;
  }
  
interface EditHotelFormProps {
    hotel: Hotel;
    onUpdateHotel: (updatedHotel:  Partial<Hotel>) => void;
    onClose: () => void;
}


const EditHotelForm: React.FC<EditHotelFormProps> = ({ hotel, onUpdateHotel, onClose }: EditHotelFormProps) => {
    // const [formData, setFormData] = useState(hotel);
    const [country, setCountry] = useState(hotel.country);
    const [address, setAddress] = useState(hotel.address);
    const [description, setDescription] = useState(hotel.description);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    //     const { name, value } = e.target;
    //     setFormData(prev => ({ ...prev, [name]: value }));
    // };

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     onUpdateHotel(formData);
    // };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       
        const updatedHotel: Partial<Hotel> = {
          country,
          address,
          description,
        };
    
        onUpdateHotel(updatedHotel);
        onClose(); 
      };

    return (
        <form onSubmit={handleSubmit}>
        
            <input
                type="text"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)} 
              
              
                placeholder="Country"
            />
              {/* onChange={handleChange} */}
              {/* value={formData.country
              } */}
            <input
                type="text"
                name="address"
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
             
                placeholder="Address"
            />
               {/* value={formData.address}
               onChange={handleChange} */}
        
            <textarea
              name="description"
              id="description"
              value={description}
               onChange={(e) => setDescription(e.target.value)} 
             
              required
              rows={3}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="description"
            />
             {/* value={formData.description}
             onChange={handleChange} */}
          <div className="flex justify-between items-center">
          <button  className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600"
           onClick={handleSubmit}>Update</button>
          <button  className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600"
           type="button" onClick={onClose}>Cancel</button>
         </div>   
        
        </form>
    );
};
export default EditHotelForm;
