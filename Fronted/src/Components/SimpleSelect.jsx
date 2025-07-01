import React from 'react';

const SimpleSelect = ({ name, value, onChange, options, placeholder = "Selecione" }) => {
    return (
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-3 pr-10 rounded-xl bg-gray-800 text-white border-2 border-white/30 focus:border-blue-500 focus:outline-none appearance-none"
            >
                <option value="" className="bg-gray-800 text-white">
                    {placeholder}
                </option>
                {options.map((option, index) => (
                    <option 
                        key={index} 
                        value={option} 
                        className="bg-gray-800 text-white"
                    >
                        {option}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
};

export default SimpleSelect;