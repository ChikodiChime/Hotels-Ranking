
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ value, onChange, disableHover }) => {
    const [hover, setHover] = useState(null);
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

return (
    <div className='flex'>
        {stars.map((star) => (
            <label key={star} htmlFor={`star-${star}`} className="cursor-pointer">
            <input
                type="radio"
                id={`star-${star}`}
                name="rating"
                value={star}
                checked={value === star}
                onChange={() => onChange(star)}
                style={{ display: 'none' }}
                required
            />
            <FaStar
                color={(hover || value) >= star ? '#ffc107' : '#e4e5e9'}
                size={20}
                onMouseEnter={() => (disableHover ? null : setHover(star))}
                onMouseLeave={() => (disableHover ? null : setHover(null))}
            />
            </label>
        ))}
        </div>
    );
};

export default StarRating;
