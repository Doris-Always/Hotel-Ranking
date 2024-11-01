import { useState } from "react";
interface Hotel {
    country: string;
    address: string;
    description:string
}
interface EditHotelFormProps {
    hotel: Hotel;
    onUpdateHotel: (updatedHotel: Hotel) => void;
    onClose: () => void;
}


const EditHotelForm: React.FC<EditHotelFormProps> = ({ hotel, onUpdateHotel, onClose }: EditHotelFormProps) => {
    const [formData, setFormData] = useState(hotel);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateHotel(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
        
            <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
            />
            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
            />
        
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="description"
            />
            <button type="submit">Update Hotel</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};
export default EditHotelForm;
