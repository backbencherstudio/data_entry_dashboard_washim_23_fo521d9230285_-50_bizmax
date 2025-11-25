import { useState } from 'react';
import { X, Mail, ArrowLeft, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { UserService } from '@/userservice/user.service';
import toast from 'react-hot-toast';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  initialEmail = ''
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState(initialEmail);
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const res = await UserService?.sendResetOTP({email});
      console.log('OTP sent to:', email, res);
      if(res?.data?.success){
        toast.success('OTP has been sent to your email');
        setIsOtpSent(true);
        setStep(2);
      }else{
        toast.error(res?.data?.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp) {
      setError('OTP is required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const res = await UserService?.resetPassword({email, otp, password});
      console.log('Password reset for:', email);
      if(res?.data?.success){
        toast.success('Your password has been reset successfully');
        setIsSubmitted(true);
      }else{
        toast.error(res?.data?.message || 'Failed to reset password. Please try again.');
        setIsLoading(false);
        return;
      }
    } catch (err) {
      setError('Failed to reset password. Please ensure OTP is correct and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSubmitted(false);
    setIsOtpSent(false);
    setStep(1);
    setOtp('');
    setPassword('');
    setConfirmPassword('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000027] backdrop-blur-xs bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={handleClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md" onClick={(e)=>e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
            {!isSubmitted && (
              <button
                onClick={() => {
                  if (step === 2) {
                    // go back to email step
                    setStep(1);
                    setOtp('');
                    setPassword('');
                    setConfirmPassword('');
                    setError('');
                  } else {
                    handleClose();
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <h2 className="text-xl font-semibold text-gray-900">
              {isSubmitted ? 'Password Reset Successful' : step === 1 ? 'Reset Password' : 'Enter OTP & New Password'}
            </h2>
          </div>
          {!isSubmitted && (
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Enter email -> send OTP */}
          {!isSubmitted && step === 1 && (
            <>
              <p className="text-gray-600 mb-6">
                Enter your email address and we'll send an OTP to your email to reset your password.
              </p>

              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="reset-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg outline-none"
                      placeholder="admin@example.com"
                    />
                  </div>
                  {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 cursor-pointer px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </button>
              </form>
            </>
          )}

          {/* Step 2: Enter OTP and new password */}
          {!isSubmitted && step === 2 && (
            <>
              <p className="text-gray-600 mb-6">
                Enter the OTP you received and choose a new password.
              </p>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                    OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg outline-none"
                    placeholder="Enter OTP"
                    maxLength={10}
                  />
                </div>

                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg outline-none"
                    placeholder="New password"
                  />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-600 hover:text-gray-800"
                    >
                      {!showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg outline-none"
                    placeholder="Confirm password"
                  />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((s) => !s)}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-600 hover:text-gray-800"
                    >
                      {!showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setOtp('');
                      setError('');
                    }}
                    className="flex-1 py-3 cursor-pointer px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 cursor-pointer px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
                  >
                    {isLoading ? 'Resetting...' : 'Reset password'}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Success */}
          {isSubmitted && (
            <div className="text-center py-4">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Password Reset Successful
              </h3>
              <p className="text-gray-600 mb-6">
                Your password has been reset for <strong>{email}</strong>. 
                You can now log in with your new password.
              </p>
              <button
                onClick={handleClose}
                className="w-full cursor-pointer py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Return to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}