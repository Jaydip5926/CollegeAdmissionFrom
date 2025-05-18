import React from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { courses } from '../../data/courses';
import { AdmissionForm } from '../../types';
import { CheckCircle, Edit, Printer } from 'lucide-react';

interface ReviewFormProps {
  formData: Partial<AdmissionForm>;
  onSubmit: () => void;
  onBack: () => void;
  onEdit: (step: number) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ formData, onSubmit, onBack, onEdit }) => {
  const { personalDetails, educationalDetails, courseSelection, documentUploads } = formData;

  const selectedCourse = courses.find(course => course.id === courseSelection?.courseId);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Admission Application - ${personalDetails?.fullName}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
            h1 { color: #1e40af; text-align: center; }
            .section { margin-bottom: 20px; }
            .section-title { color: #1e40af; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
            .field { margin-bottom: 10px; }
            .label { color: #666; font-size: 0.9em; }
            .value { font-weight: bold; }
            @media print {
              body { padding: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>Admission Application Form</h1>
          
          <div class="section">
            <h2 class="section-title">Personal Details</h2>
            <div class="grid">
              <div class="field">
                <div class="label">Full Name</div>
                <div class="value">${personalDetails?.fullName}</div>
              </div>
              <div class="field">
                <div class="label">Date of Birth</div>
                <div class="value">${formatDate(personalDetails?.dateOfBirth)}</div>
              </div>
              <div class="field">
                <div class="label">Gender</div>
                <div class="value">${personalDetails?.gender}</div>
              </div>
              <div class="field">
                <div class="label">Category</div>
                <div class="value">${personalDetails?.caste} ${personalDetails?.subCaste ? `(${personalDetails.subCaste})` : ''}</div>
              </div>
              <div class="field">
                <div class="label">Religion</div>
                <div class="value">${personalDetails?.religion}</div>
              </div>
              <div class="field">
                <div class="label">Aadhaar Number</div>
                <div class="value">${personalDetails?.aadhaarNumber}</div>
              </div>
              <div class="field">
                <div class="label">Mobile Number</div>
                <div class="value">${personalDetails?.mobileNumber}</div>
              </div>
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value">${personalDetails?.email}</div>
              </div>
            </div>
            <div class="field">
              <div class="label">Permanent Address</div>
              <div class="value">${personalDetails?.permanentAddress}</div>
            </div>
            <div class="field">
              <div class="label">Correspondence Address</div>
              <div class="value">${personalDetails?.correspondenceAddress}</div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Educational Details</h2>
            <div class="grid">
              <div class="field">
                <div class="label">Board/University</div>
                <div class="value">${educationalDetails?.boardName}</div>
              </div>
              <div class="field">
                <div class="label">Year of Passing</div>
                <div class="value">${educationalDetails?.yearOfPassing}</div>
              </div>
              <div class="field">
                <div class="label">Percentage/CGPA</div>
                <div class="value">${educationalDetails?.percentage}%</div>
              </div>
              <div class="field">
                <div class="label">Seat/Roll Number</div>
                <div class="value">${educationalDetails?.seatNumber}</div>
              </div>
              ${educationalDetails?.previousCollege ? `
                <div class="field">
                  <div class="label">Previous Institution</div>
                  <div class="value">${educationalDetails.previousCollege}</div>
                </div>
              ` : ''}
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Course Details</h2>
            <div class="grid">
              <div class="field">
                <div class="label">Selected Course</div>
                <div class="value">${selectedCourse?.name}</div>
              </div>
              <div class="field">
                <div class="label">Degree</div>
                <div class="value">${selectedCourse?.degree}</div>
              </div>
              ${courseSelection?.specialization ? `
                <div class="field">
                  <div class="label">Specialization</div>
                  <div class="value">${courseSelection.specialization}</div>
                </div>
              ` : ''}
              <div class="field">
                <div class="label">Duration</div>
                <div class="value">${selectedCourse?.duration}</div>
              </div>
              <div class="field">
                <div class="label">Annual Fees</div>
                <div class="value">${new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(selectedCourse?.fees || 0)}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Declaration</h2>
            <p>I hereby declare that all the information provided in this application is true and correct to the best of my knowledge. I understand that any false or misleading information may result in the cancellation of my admission.</p>
            <div style="margin-top: 30px;">
              <div style="float: right;">
                <div style="text-align: center;">
                  <div style="border-top: 1px solid #000; padding-top: 5px;">Applicant's Signature</div>
                </div>
              </div>
              <div style="clear: both;"></div>
            </div>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <button onclick="window.print()">Print Application</button>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();
  };

  const renderSectionHeader = (title: string, step: number) => (
    <div className="flex justify-between items-center mb-3 pb-2 border-b">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onEdit(step)}
        className="text-blue-800 hover:bg-blue-50"
      >
        <Edit size={14} className="mr-1" />
        Edit
      </Button>
    </div>
  );

  return (
    <div className="space-y-8">
      <Card padding="lg">
        <div className="mb-4 pb-3 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Application Summary</h2>
            <p className="text-gray-600 text-sm mt-1">
              Please review your application details before final submission.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="flex items-center"
          >
            <Printer size={16} className="mr-2" />
            Print Application
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            {renderSectionHeader('Personal Details', 1)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{personalDetails?.fullName || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{formatDate(personalDetails?.dateOfBirth)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{personalDetails?.gender || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">
                  {personalDetails?.caste || '-'} 
                  {personalDetails?.subCaste ? ` (${personalDetails.subCaste})` : ''}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Religion</p>
                <p className="font-medium">{personalDetails?.religion || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Aadhaar Number</p>
                <p className="font-medium">{personalDetails?.aadhaarNumber || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mobile Number</p>
                <p className="font-medium">{personalDetails?.mobileNumber || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{personalDetails?.email || '-'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Permanent Address</p>
                <p className="font-medium">{personalDetails?.permanentAddress || '-'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Correspondence Address</p>
                <p className="font-medium">{personalDetails?.correspondenceAddress || '-'}</p>
              </div>
            </div>
          </div>

          <div>
            {renderSectionHeader('Educational Details', 2)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Board/University</p>
                <p className="font-medium">{educationalDetails?.boardName || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Year of Passing</p>
                <p className="font-medium">{educationalDetails?.yearOfPassing || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Percentage/CGPA</p>
                <p className="font-medium">{educationalDetails?.percentage || '-'}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Seat/Roll Number</p>
                <p className="font-medium">{educationalDetails?.seatNumber || '-'}</p>
              </div>
              {educationalDetails?.previousCollege && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Previous Institution</p>
                  <p className="font-medium">{educationalDetails.previousCollege}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            {renderSectionHeader('Course Selection', 3)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Selected Course</p>
                <p className="font-medium">{selectedCourse?.name || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Degree</p>
                <p className="font-medium">{selectedCourse?.degree || '-'}</p>
              </div>
              {courseSelection?.specialization && (
                <div>
                  <p className="text-sm text-gray-500">Specialization</p>
                  <p className="font-medium">{courseSelection.specialization}</p>
                </div>
              )}
              {selectedCourse && (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{selectedCourse.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Annual Fees</p>
                    <p className="font-medium">
                      {new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        maximumFractionDigits: 0,
                      }).format(selectedCourse.fees)}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div>
            {renderSectionHeader('Document Uploads', 4)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Passport Size Photo</p>
                <p className="font-medium flex items-center">
                  {documentUploads?.photo ? (
                    <>
                      <CheckCircle size={16} className="text-green-600 mr-1" />
                      Uploaded
                    </>
                  ) : (
                    'Not uploaded'
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">10th/12th Marksheet</p>
                <p className="font-medium flex items-center">
                  {documentUploads?.marksheet ? (
                    <>
                      <CheckCircle size={16} className="text-green-600 mr-1" />
                      Uploaded
                    </>
                  ) : (
                    'Not uploaded'
                  )}
                </p>
              </div>
              {personalDetails?.caste && personalDetails.caste !== 'General' && (
                <div>
                  <p className="text-sm text-gray-500">Caste Certificate</p>
                  <p className="font-medium flex items-center">
                    {documentUploads?.casteCertificate ? (
                      <>
                        <CheckCircle size={16} className="text-green-600 mr-1" />
                        Uploaded
                      </>
                    ) : (
                      'Not uploaded'
                    )}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Domicile Certificate</p>
                <p className="font-medium flex items-center">
                  {documentUploads?.domicileCertificate ? (
                    <>
                      <CheckCircle size={16} className="text-green-600 mr-1" />
                      Uploaded
                    </>
                  ) : (
                    'Not uploaded'
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Aadhaar Card</p>
                <p className="font-medium flex items-center">
                  {documentUploads?.aadhaarCard ? (
                    <>
                      <CheckCircle size={16} className="text-green-600 mr-1" />
                      Uploaded
                    </>
                  ) : (
                    'Not uploaded'
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Other Certificates</p>
                <p className="font-medium flex items-center">
                  {documentUploads?.otherCertificates ? (
                    <>
                      <CheckCircle size={16} className="text-green-600 mr-1" />
                      Uploaded
                    </>
                  ) : (
                    'Not uploaded (Optional)'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-800 mb-2">Declaration</h3>
        <p className="text-sm text-blue-700 mb-3">
          By submitting this application, I hereby declare that:
        </p>
        <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
          <li>All information provided in this application is true and correct to the best of my knowledge.</li>
          <li>I understand that any false or misleading information may result in the cancellation of my admission.</li>
          <li>I agree to abide by all rules and regulations of the institution.</li>
          <li>I understand that submission of this application does not guarantee admission.</li>
        </ul>
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="declaration"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="declaration" className="ml-2 block text-sm text-blue-800">
            I agree to the above declaration and terms
          </label>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit}>
          Submit Application
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;