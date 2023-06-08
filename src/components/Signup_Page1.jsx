import { DatePicker } from 'antd';

const Signup_Page1 = ({ formData, setFormData }) => {


    return (
        <div className='flex flex-col space-y-3'>
            <input
                className='shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px]  border border-1 border-gray-300 text-sm rounded-md px-4 w-60 tab:w-72 lap:w-80 m-auto h-8 hover:bg-gray-100 focus:bg-gray-100 focus:outline-blue-700'
                type="text"
                required
                name='name'
                placeholder='Name ...'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input
                className='shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px]  border border-1 border-gray-300 text-sm rounded-md px-4 w-60 tab:w-72 lap:w-80 m-auto h-8 hover:bg-gray-100 focus:bg-gray-100 focus:outline-blue-700'
                type="tel"
                required
                name='phone'
                placeholder='Phone ...'
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <select
                id="type-signup"
                name="gender"
                required
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className='shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px]  border border-1 border-gray-300 text-sm rounded-md px-2.5 w-60 tab:w-72 lap:w-80 m-auto h-8 hover:bg-gray-100 focus:bg-gray-100 focus:outline-blue-700'
            >
                <option value={formData.gender}>
                    {formData.gender ? formData.gender : <>Gender</>}
                </option>
                <option value="male">
                    Male
                </option>
                <option value="female">
                    Female
                </option>
            </select>

            <input
                className='shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px]  border border-1 border-gray-300 text-sm rounded-md px-4 w-60 tab:w-72 lap:w-80 m-auto h-8 hover:bg-gray-100 focus:bg-gray-100 focus:outline-blue-700'
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                required
                name='dob'
                value={formData.dob}
                placeholder='Date of Birth...'
                //value={formData.cPhone}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />

            {/* <DatePicker className='shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px]  border border-1 border-gray-300 text-sm rounded-md px-2.5 w-60 tab:w-72 lap:w-80 m-auto h-8 hover:bg-gray-100 focus:bg-gray-100 focus:outline-blue-700' /> */}

        </div>
    );
};
export default Signup_Page1;