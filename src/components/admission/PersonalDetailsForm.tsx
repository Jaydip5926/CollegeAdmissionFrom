import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { PersonalDetails } from '../../types';

interface PersonalDetailsFormProps {
  defaultValues?: PersonalDetails;
  onSubmit: (data: PersonalDetails) => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ defaultValues, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalDetails>({
    defaultValues: defaultValues || {
      fullName: '',
      dateOfBirth: '',
      gender: '',
      caste: '',
      subCaste: '',
      religion: '',
      aadhaarNumber: '',
      mobileNumber: '',
      email: '',
      permanentAddress: '',
      correspondenceAddress: '',
    }
  });

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  const casteOptions = [
    { value: 'General', label: 'General' },
    { value: 'OBC', label: 'OBC' },
    { value: 'SC', label: 'SC' },
    { value: 'ST', label: 'ST' },
  ];

  const religionOptions = [
    { value: 'Hinduism', label: 'Hinduism' },
    { value: 'Islam', label: 'Islam' },
    { value: 'Christianity', label: 'Christianity' },
    { value: 'Sikhism', label: 'Sikhism' },
    { value: 'Buddhism', label: 'Buddhism' },
    { value: 'Jainism', label: 'Jainism' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          error={errors.fullName?.message}
          {...register('fullName', { required: 'Full name is required' })}
        />

        <Input
          label="Date of Birth"
          type="date"
          error={errors.dateOfBirth?.message}
          {...register('dateOfBirth', { required: 'Date of birth is required' })}
        />

        <Select
          label="Gender"
          options={genderOptions}
          error={errors.gender?.message}
          {...register('gender', { required: 'Gender is required' })}
        />

        <Select
          label="Caste"
          options={casteOptions}
          error={errors.caste?.message}
          {...register('caste', { required: 'Caste is required' })}
        />

        <Input
          label="Sub-Caste (if applicable)"
          error={errors.subCaste?.message}
          {...register('subCaste')}
        />

        <Select
          label="Religion"
          options={religionOptions}
          error={errors.religion?.message}
          {...register('religion', { required: 'Religion is required' })}
        />

        <Input
          label="Aadhaar Number"
          error={errors.aadhaarNumber?.message}
          {...register('aadhaarNumber', { 
            required: 'Aadhaar number is required',
            pattern: {
              value: /^\d{4}-\d{4}-\d{4}$|^\d{12}$/,
              message: 'Please enter a valid Aadhaar number format (XXXX-XXXX-XXXX or 12 digits)'
            }
          })}
          placeholder="XXXX-XXXX-XXXX"
        />

        <Input
          label="Mobile Number"
          type="tel"
          error={errors.mobileNumber?.message}
          {...register('mobileNumber', { 
            required: 'Mobile number is required',
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: 'Please enter a valid 10-digit mobile number'
            }
          })}
        />

        <Input
          label="Email Address"
          type="email"
          error={errors.email?.message}
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }
          })}
          className="md:col-span-2"
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Permanent Address
          </label>
          <textarea
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            rows={3}
            {...register('permanentAddress', { required: 'Permanent address is required' })}
          ></textarea>
          {errors.permanentAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.permanentAddress.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Correspondence Address
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sameAsAbove"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                onChange={(e) => {
                  if (e.target.checked) {
                    document.getElementById('correspondenceAddress')?.setAttribute('value', 
                      (document.getElementById('permanentAddress') as HTMLTextAreaElement)?.value || ''
                    );
                  }
                }}
              />
              <label htmlFor="sameAsAbove" className="ml-2 block text-sm text-gray-700">
                Same as permanent address
              </label>
            </div>
          </div>
          <textarea
            id="correspondenceAddress"
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            rows={3}
            {...register('correspondenceAddress', { required: 'Correspondence address is required' })}
          ></textarea>
          {errors.correspondenceAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.correspondenceAddress.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          Save & Continue
        </Button>
      </div>
    </form>
  );
};

export default PersonalDetailsForm;