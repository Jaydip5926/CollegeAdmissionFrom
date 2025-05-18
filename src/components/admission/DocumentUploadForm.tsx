import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import { DocumentUploads } from '../../types';
import { Upload, CheckCircle, AlertTriangle, X, FileText, Printer } from 'lucide-react';

interface DocumentUploadFormProps {
  defaultValues?: DocumentUploads;
  onSubmit: (data: DocumentUploads) => void;
  onBack: () => void;
  requiredDocuments: {
    casteCertificate: boolean;
  };
}

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({ 
  defaultValues, 
  onSubmit,
  onBack,
  requiredDocuments
}) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<DocumentUploads>({
    defaultValues: defaultValues || {
      photo: null,
      marksheet: null,
      casteCertificate: null,
      domicileCertificate: null,
      aadhaarCard: null,
      signature: null,
      lcCertificate: null,
      otherCertificates: null,
    }
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const watchPhoto = watch('photo');
  const watchMarksheet = watch('marksheet');
  const watchCasteCertificate = watch('casteCertificate');
  const watchDomicileCertificate = watch('domicileCertificate');
  const watchAadhaarCard = watch('aadhaarCard');
  const watchSignature = watch('signature');
  const watchLCCertificate = watch('lcCertificate');
  const watchOtherCertificates = watch('otherCertificates');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof DocumentUploads) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setValue(fieldName, files[0] as any);
      
      // Set previews for photo and signature
      if (fieldName === 'photo' || fieldName === 'signature') {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (fieldName === 'photo') {
            setPhotoPreview(reader.result as string);
          } else {
            setSignaturePreview(reader.result as string);
          }
        };
        reader.readAsDataURL(files[0]);
      }
    }
  };

  const removeFile = (fieldName: keyof DocumentUploads) => {
    setValue(fieldName, null);
    if (fieldName === 'photo') {
      setPhotoPreview(null);
    } else if (fieldName === 'signature') {
      setSignaturePreview(null);
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return size + ' bytes';
    else if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
    else return (size / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const renderFileInput = (
    label: string, 
    name: keyof DocumentUploads, 
    fileType: string,
    required: boolean,
    description?: string
  ) => {
    const file = watch(name) as File | null;
    
    return (
      <div className="border rounded-lg p-4">
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          
          {description && (
            <p className="text-xs text-gray-500 mb-3">{description}</p>
          )}

          {!file ? (
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition-colors cursor-pointer">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor={name} className="relative cursor-pointer rounded-md font-medium text-blue-800 hover:text-blue-700 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input
                      id={name}
                      type="file"
                      className="sr-only"
                      accept={fileType}
                      onChange={(e) => handleFileChange(e, name)}
                      required={required}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, JPG, PNG up to 5MB
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-1 flex items-center justify-between p-3 border rounded-md bg-blue-50">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-700 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate" style={{ maxWidth: '200px' }}>
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              
              <button
                type="button"
                className="ml-2 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-red-500 focus:outline-none"
                onClick={() => removeFile(name)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passport Size Photo <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Upload a recent passport-sized photograph with a white background.
            </p>

            {!photoPreview ? (
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition-colors cursor-pointer">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="photo" className="relative cursor-pointer rounded-md font-medium text-blue-800 hover:text-blue-700 focus-within:outline-none">
                      <span>Upload a photo</span>
                      <input
                        id="photo"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'photo')}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    JPG or PNG, 3:4 ratio (max 1MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-1 flex flex-col items-center">
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="h-40 w-32 object-cover border"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 p-1 rounded-full bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-70 focus:outline-none"
                    onClick={() => removeFile('photo')}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {watchPhoto?.name} ({formatFileSize(watchPhoto?.size)})
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Signature <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Upload a clear image of your signature on white paper.
            </p>

            {!signaturePreview ? (
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition-colors cursor-pointer">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="signature" className="relative cursor-pointer rounded-md font-medium text-blue-800 hover:text-blue-700 focus-within:outline-none">
                      <span>Upload signature</span>
                      <input
                        id="signature"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'signature')}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    JPG or PNG (max 500KB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-1 flex flex-col items-center">
                <div className="relative">
                  <img
                    src={signaturePreview}
                    alt="Signature Preview"
                    className="h-20 w-48 object-contain border"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 p-1 rounded-full bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-70 focus:outline-none"
                    onClick={() => removeFile('signature')}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {watchSignature?.name} ({formatFileSize(watchSignature?.size)})
                </p>
              </div>
            )}
          </div>
        </div>

        {renderFileInput(
          '10th/12th Marksheet', 
          'marksheet', 
          '.pdf,.jpg,.jpeg,.png', 
          true, 
          'Upload your final year marksheet showing all subjects and grades.'
        )}

        {renderFileInput(
          'Caste Certificate', 
          'casteCertificate', 
          '.pdf,.jpg,.jpeg,.png', 
          requiredDocuments.casteCertificate, 
          'Upload your valid caste certificate issued by the appropriate authority.'
        )}

        {renderFileInput(
          'Leaving Certificate (LC)', 
          'lcCertificate', 
          '.pdf,.jpg,.jpeg,.png', 
          false,
          'Upload your school/college leaving certificate.'
        )}

        {renderFileInput(
          'Domicile/Residence Certificate', 
          'domicileCertificate', 
          '.pdf,.jpg,.jpeg,.png', 
          true,
          'Upload proof of residence/domicile issued by appropriate authority.'
        )}

        {renderFileInput(
          'Aadhaar Card', 
          'aadhaarCard', 
          '.pdf,.jpg,.jpeg,.png', 
          true,
          'Upload a clear copy of your Aadhaar card (front and back).'
        )}

        {renderFileInput(
          'Other Certificates (Optional)', 
          'otherCertificates', 
          '.pdf,.jpg,.jpeg,.png', 
          false,
          'Upload any additional certificates (e.g., sports, NCC, extracurricular).'
        )}
      </div>

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-amber-800">Important Information</h3>
            <div className="mt-2 text-sm text-amber-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>All documents must be clearly visible and legible.</li>
                <li>Maximum file size for each document is 5MB.</li>
                <li>Accepted formats are PDF, JPG, and PNG.</li>
                <li>Original documents will be verified during the document verification process.</li>
                <li>Submission of false documents will lead to cancellation of admission.</li>
              </ul>
            </div>
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

export default DocumentUploadForm;