
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface PhoneInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+1', country: 'CA', flag: '🇨🇦' },
  { code: '+44', country: 'GB', flag: '🇬🇧' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+39', country: 'IT', flag: '🇮🇹' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
  { code: '+31', country: 'NL', flag: '🇳🇱' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+82', country: 'KR', flag: '🇰🇷' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+55', country: 'BR', flag: '🇧🇷' },
  { code: '+52', country: 'MX', flag: '🇲🇽' },
  { code: '+7', country: 'RU', flag: '🇷🇺' },
  { code: '+27', country: 'ZA', flag: '🇿🇦' },
  { code: '+971', country: 'AE', flag: '🇦🇪' },
  { code: '+966', country: 'SA', flag: '🇸🇦' },
  { code: '+65', country: 'SG', flag: '🇸🇬' }
];

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  className = ""
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');
  
  // Extract phone number without country code from current value
  const getPhoneNumber = (fullValue: string) => {
    if (!fullValue) return '';
    
    // Find if the value starts with any country code
    const matchingCode = countryCodes.find(cc => fullValue.startsWith(cc.code));
    if (matchingCode) {
      return fullValue.substring(matchingCode.code.length).trim();
    }
    
    return fullValue;
  };

  // Extract country code from current value
  const getCountryCode = (fullValue: string) => {
    if (!fullValue) return '+1';
    
    const matchingCode = countryCodes.find(cc => fullValue.startsWith(cc.code));
    return matchingCode ? matchingCode.code : '+1';
  };

  const phoneNumber = getPhoneNumber(value);
  const currentCountryCode = getCountryCode(value);

  // Update selected country code if it differs from current
  React.useEffect(() => {
    if (currentCountryCode !== selectedCountryCode) {
      setSelectedCountryCode(currentCountryCode);
    }
  }, [currentCountryCode]);

  const handleCountryCodeChange = (newCode: string) => {
    setSelectedCountryCode(newCode);
    const newValue = phoneNumber ? `${newCode} ${phoneNumber}` : newCode;
    onChange(newValue);
  };

  const handlePhoneNumberChange = (newPhoneNumber: string) => {
    const newValue = newPhoneNumber ? `${selectedCountryCode} ${newPhoneNumber}` : selectedCountryCode;
    onChange(newValue);
  };

  return (
    <div className={`box-border flex flex-col m-0 p-0 ${className}`}>
      <label className="box-border text-text-primary text-[14px] font-medium mb-2 m-0 p-0">
        {label}
      </label>
      <div className="flex gap-2">
        <Select value={selectedCountryCode} onValueChange={handleCountryCodeChange}>
          <SelectTrigger className="w-24 h-[40px] border bg-input-bg text-text-primary border-input-border focus:outline-none focus:border-blue-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-input-bg border-input-border">
            {countryCodes.map((country) => (
              <SelectItem 
                key={`${country.code}-${country.country}`} 
                value={country.code}
                className="text-text-primary hover:bg-[rgba(255,255,255,0.1)]"
              >
                <span className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  <span>{country.code}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 box-border h-[40px] border bg-input-bg text-text-primary placeholder:text-text-secondary text-[14px] font-normal m-0 px-3 py-0 rounded-md border-solid border-input-border focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};
