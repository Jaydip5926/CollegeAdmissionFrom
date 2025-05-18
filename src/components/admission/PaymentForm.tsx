import React, { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { PaymentDetails } from '../../types';
import { CreditCard, CheckCircle, Printer } from 'lucide-react';

interface PaymentFormProps {
  onSubmit: (data: PaymentDetails) => void;
  applicationFee: number;
  onBack: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, applicationFee, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'DebitCard' | 'CreditCard' | 'NetBanking'>('DebitCard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      // Generate a dummy transaction ID
      const dummyTransactionId = 'TXN' + Math.floor(Math.random() * 1000000).toString().padStart(7, '0');
      setTransactionId(dummyTransactionId);
      
      // Call onSubmit with payment details
      onSubmit({
        mode: paymentMethod,
        amount: applicationFee,
        transactionId: dummyTransactionId,
        status: 'completed',
        date: new Date().toISOString()
      });
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePrintReceipt = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payment Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
            .receipt { max-width: 600px; margin: 0 auto; border: 1px solid #ccc; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; color: #1e40af; }
            .details { margin-bottom: 20px; }
            .row { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .label { color: #666; }
            .value { font-weight: bold; }
            .total { border-top: 2px solid #ccc; padding-top: 10px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; font-size: 0.9em; color: #666; }
            @media print {
              body { padding: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <div class="logo">College Portal</div>
              <p>Payment Receipt</p>
              <p>Date: ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="details">
              <div class="row">
                <span class="label">Transaction ID:</span>
                <span class="value">${transactionId}</span>
              </div>
              <div class="row">
                <span class="label">Payment Method:</span>
                <span class="value">${paymentMethod}</span>
              </div>
              <div class="row">
                <span class="label">Description:</span>
                <span class="value">Application Fee</span>
              </div>
            </div>
            
            <div class="total">
              <div class="row">
                <span class="label">Amount Paid:</span>
                <span class="value">${formatCurrency(applicationFee)}</span>
              </div>
            </div>
            
            <div class="footer">
              <p>Thank you for your payment</p>
              <p>This is a computer-generated receipt and does not require a signature</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <button onclick="window.print()">Print Receipt</button>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();
  };

  if (isComplete) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your application fee payment has been successfully processed.
        </p>
        <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto mb-8">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Amount Paid:</span>
              <span className="font-medium">{formatCurrency(applicationFee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID:</span>
              <span className="font-medium">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method:</span>
              <span className="font-medium">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Completed
              </span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 mb-3">
          Your application has been submitted successfully.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          You can check your application status anytime from the Application Status page.
        </p>
        <div className="mt-6 space-x-4">
          <Button onClick={handlePrintReceipt}>
            <Printer size={16} className="mr-2" />
            Print Receipt
          </Button>
          <Button as="a" href="/status">
            Check Application Status
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card padding="lg">
        <div className="mb-6 pb-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Payment Details</h2>
          <p className="text-gray-600 text-sm mt-1">
            Please complete the payment to finalize your application submission.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <input
                      type="radio"
                      id="debit-card"
                      name="payment-method"
                      className="sr-only"
                      checked={paymentMethod === 'DebitCard'}
                      onChange={() => setPaymentMethod('DebitCard')}
                    />
                    <label
                      htmlFor="debit-card"
                      className={`block border rounded-md p-3 text-center cursor-pointer transition-colors ${
                        paymentMethod === 'DebitCard'
                          ? 'border-blue-500 bg-blue-50 text-blue-800'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <CreditCard size={24} className="mx-auto mb-1" />
                      <span className="text-sm font-medium">Debit Card</span>
                    </label>
                  </div>
                  
                  <div>
                    <input
                      type="radio"
                      id="credit-card"
                      name="payment-method"
                      className="sr-only"
                      checked={paymentMethod === 'CreditCard'}
                      onChange={() => setPaymentMethod('CreditCard')}
                    />
                    <label
                      htmlFor="credit-card"
                      className={`block border rounded-md p-3 text-center cursor-pointer transition-colors ${
                        paymentMethod === 'CreditCard'
                          ? 'border-blue-500 bg-blue-50 text-blue-800'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <CreditCard size={24} className="mx-auto mb-1" />
                      <span className="text-sm font-medium">Credit Card</span>
                    </label>
                  </div>
                  
                  <div>
                    <input
                      type="radio"
                      id="upi"
                      name="payment-method"
                      className="sr-only"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                    />
                    <label
                      htmlFor="upi"
                      className={`block border rounded-md p-3 text-center cursor-pointer transition-colors ${
                        paymentMethod === 'UPI'
                          ? 'border-blue-500 bg-blue-50 text-blue-800'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <svg className="mx-auto h-6 w-6 mb-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.41 11.58L12.41 2.58C12.04 2.22 11.53 2 11 2H4C2.9 2 2 2.9 2 4V11C2 11.53 2.22 12.04 2.59 12.41L11.59 21.41C11.95 21.77 12.45 22 13 22C13.55 22 14.05 21.77 14.41 21.41L21.41 14.41C21.78 14.05 22 13.55 22 13C22 12.45 21.77 11.95 21.41 11.58ZM5.5 7C4.67 7 4 6.33 4 5.5C4 4.67 4.67 4 5.5 4C6.33 4 7 4.67 7 5.5C7 6.33 6.33 7 5.5 7Z" />
                      </svg>
                      <span className="text-sm font-medium">UPI</span>
                    </label>
                  </div>
                  
                  <div>
                    <input
                      type="radio"
                      id="net-banking"
                      name="payment-method"
                      className="sr-only"
                      checked={paymentMethod === 'NetBanking'}
                      onChange={() => setPaymentMethod('NetBanking')}
                    />
                    <label
                      htmlFor="net-banking"
                      className={`block border rounded-md p-3 text-center cursor-pointer transition-colors ${
                        paymentMethod === 'NetBanking'
                          ? 'border-blue-500 bg-blue-50 text-blue-800'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <svg className="mx-auto h-6 w-6 mb-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 10V17H7V10H4ZM10 10V17H13V10H10ZM2 22H21V19H2V22ZM16 10V17H19V10H16ZM11.5 1L2 6V8H21V6L11.5 1Z" />
                      </svg>
                      <span className="text-sm font-medium">Net Banking</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Payment form fields based on selected method */}
              {paymentMethod === 'DebitCard' || paymentMethod === 'CreditCard' ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="card-number"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiry-date"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="card-holder" className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      id="card-holder"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="John Smith"
                      required
                    />
                  </div>
                </div>
              ) : paymentMethod === 'UPI' ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700 mb-1">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      id="upi-id"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="yourname@upi"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="bank" className="block text-sm font-medium text-gray-700 mb-1">
                      Select Bank
                    </label>
                    <select
                      id="bank"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select your bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="pnb">Punjab National Bank</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button type="button" variant="outline" onClick={onBack}>
                  Back
                </Button>
                <Button type="submit" isLoading={isProcessing}>
                  {isProcessing ? 'Processing...' : `Pay ${formatCurrency(applicationFee)}`}
                </Button>
              </div>
            </form>
          </div>

          <div className="md:w-1/3">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Application Fee</span>
                  <span className="font-medium">{formatCurrency(applicationFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-medium">₹0</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span>{formatCurrency(applicationFee)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle size={16} className="text-green-600 mt-0.5" />
                  </div>
                  <p className="ml-2 text-sm text-gray-600">
                    Your payment information is secure and encrypted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentForm;