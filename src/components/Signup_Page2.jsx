



const Signup_Page2 = ({ formData, setFormData }) => {

    return (
        <div className='flex flex-col space-y-3'>
            <textarea
                className='shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px] border border-1 border-gray-300 text-sm rounded-md px-2.5 py-1.5 w-60 tab:w-72 lap:w-80 m-auto hover:bg-gray-100 focus:bg-gray-100 focus:outline-blue-700'
                cols="" rows="3"
                name="address"
                required
                placeholder="Address ..."
                value={formData.address}
                onChange={(e)=> setFormData({ ...formData, address: e.target.value})}
            />

            <input
                className='shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px]  border border-1 border-gray-300 text-sm rounded-md px-4 w-60 tab:w-72 lap:w-80 m-auto h-8 hover:bg-gray-100 focus:bg-gray-100 focus:outline-blue-700'
                type="text"
                required
                name="zipcode"
                placeholder='Zip Code ...'
                value={formData.zipcode}
                onChange={(e)=> setFormData({ ...formData, zipcode: e.target.value})}
            />

            <input
                className='shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px]  border border-1 border-gray-300 text-sm rounded-md px-4 w-60 tab:w-72 lap:w-80 m-auto h-8 hover:bg-gray-100 focus:bg-gray-100 focus:outline-blue-700'
                type="text"
                required
                name="city"
                placeholder='City ...'
                value={formData.city}
                onChange={(e)=> setFormData({ ...formData, city: e.target.value})}
            />

            <input
                className='shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px]  border border-1 border-gray-300 text-sm rounded-md px-4 w-60 tab:w-72 lap:w-80 m-auto h-8 hover:bg-gray-100 focus:bg-gray-100 focus:outline-blue-700'
                type="text"
                required
                name="state"
                placeholder='State ...'
                value={formData.state}
                onChange={(e)=> setFormData({ ...formData, state: e.target.value})}
            />

            <input
                className='shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px]  border border-1 border-gray-300 text-sm rounded-md px-4 w-60 tab:w-72 lap:w-80 m-auto h-8 hover:bg-gray-100 focus:bg-gray-100 focus:outline-blue-700'
                type="text"
                required
                name="country"
                placeholder='Country ...'
                value={formData.country}
                onChange={(e)=> setFormData({ ...formData, country: e.target.value})}
            />
        </div>
    );
};
export default Signup_Page2;