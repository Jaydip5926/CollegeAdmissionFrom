import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { EducationalDetails } from '../../types';

interface EducationalDetailsFormProps {
  defaultValues?: EducationalDetails;
  onSubmit: (data: EducationalDetails) => void;
  onBack: () => void;
}

const EducationalDetailsForm: React.FC<EducationalDetailsFormProps> = ({ 
  defaultValues, 
  onSubmit,
  onBack
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<EducationalDetails>({
    defaultValues: defaultValues || {
      boardName: '',
      yearOfPassing: '',
      percentage: '',
      seatNumber: '',
      previousCollege: '',
    }
  });

  const boardOptions = [
    { value: 'CBSE', label: 'Central Board of Secondary Education (CBSE)' },
    { value: 'ICSE', label: 'Indian Certificate of Secondary Education (ICSE)' },
    { value: 'State Board', label: 'State Board' },
    { value: 'Other', label: 'Other' },
  ];

  const yearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 10; year--) {
      years.push({ value: year.toString(), label: year.toString() });
    }
    return years;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Board/University Name"
          options={boardOptions}
          error={errors.boardName?.message}
          {...register('boardName', { required: 'Board name is required' })}
        />

        <Select
          label="Year of Passing"
          options={yearOptions()}
          error={errors.yearOfPassing?.message}
          {...register('yearOfPassing', { required: 'Year of passing is required' })}
        />

        <Input
          label="Percentage/CGPA Obtained"
          type="text"
          error={errors.percentage?.message}
          {...register('percentage', { 
            required: 'Percentage is required',
            pattern: {
              value: /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/,
              message: 'Please enter a valid percentage (0-100)'
            }
          })}
          placeholder="e.g. 85.50"
        />

        <Input
          label="Seat/Roll Number"
          error={errors.seatNumber?.message}
          {...register('seatNumber', { required: 'Seat number is required' })}
        />

        <div className="md:col-span-2">
          <Input
            label="Previous College/Institution (if applicable)"
            error={errors.previousCollege?.message}
            {...register('previousCollege')}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Academic Information
          </label>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Your academic information will be verified with the original documents during 
              document verification. Please ensure the information provided is accurate and matches your certificates.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Save & Continue
        </Button>
      </div>
    </form>
  );
};

export default EducationalDetailsForm;