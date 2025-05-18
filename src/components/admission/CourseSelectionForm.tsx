import React from 'react';
import { useForm } from 'react-hook-form';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { CourseSelection } from '../../types';
import { courses } from '../../data/courses';

interface CourseSelectionFormProps {
  defaultValues?: CourseSelection;
  onSubmit: (data: CourseSelection) => void;
  onBack: () => void;
}

const CourseSelectionForm: React.FC<CourseSelectionFormProps> = ({ 
  defaultValues, 
  onSubmit,
  onBack
}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CourseSelection>({
    defaultValues: defaultValues || {
      courseId: '',
      specialization: '',
    }
  });

  const selectedCourseId = watch('courseId');
  const selectedCourse = courses.find(course => course.id === selectedCourseId);

  // Course options
  const courseOptions = courses.map(course => ({
    value: course.id,
    label: `${course.name} (${course.degree})`
  }));

  // Specialization options based on selected course
  const specializationOptions = [
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Mechanical', label: 'Mechanical' },
    { value: 'Civil', label: 'Civil Engineering' },
  ];

  // Only B.Tech has specializations in this example
  const showSpecialization = selectedCourseId === '4'; // B.Tech

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-6">
        <Select
          label="Select Course"
          options={courseOptions}
          error={errors.courseId?.message}
          {...register('courseId', { required: 'Please select a course' })}
        />

        {showSpecialization && (
          <Select
            label="Select Specialization"
            options={specializationOptions}
            error={errors.specialization?.message}
            {...register('specialization', { required: 'Please select a specialization' })}
          />
        )}

        {selectedCourse && (
          <div className="bg-gray-50 p-6 rounded-lg mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Course Name</p>
                <p className="font-medium">{selectedCourse.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{selectedCourse.duration}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Eligibility</p>
                <p className="font-medium">{selectedCourse.eligibility}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Fees (per year)</p>
                <p className="font-medium">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0,
                  }).format(selectedCourse.fees)}
                </p>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-sm mt-1">{selectedCourse.description}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your course selection will be finalized after document verification and admission approval.
              </p>
            </div>
          </div>
        )}
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

export default CourseSelectionForm;