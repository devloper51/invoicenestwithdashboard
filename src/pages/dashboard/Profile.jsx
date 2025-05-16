import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { 
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  MapPinIcon,
  KeyIcon,
  ArrowPathIcon,
  CameraIcon,
  IdentificationIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline'

// Mock data - in a real app, this would be fetched
const mockUserProfile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  jobTitle: 'Lead Developer',
  bio: 'Experienced software engineer passionate about creating scalable and user-friendly web applications.',
  avatarUrl: '',
  companyName: 'Acme Innovations Ltd.',
  companyWebsite: 'https://www.acmeinnovations.com',
  companyAddress: '456 Tech Park Avenue, Suite 200, Silicon Valley, CA 94043',
  companyTaxId: 'AB123456789CD',
  taxRate: 18,
  currency: 'INR',
  defaultPaymentTerms: 'NET 30'
};

const Profile = () => {
  // Profile state
  const [profile, setProfile] = useState(mockUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Create refs for all input fields
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const jobTitleRef = useRef(null);
  const bioRef = useRef(null);
  const companyNameRef = useRef(null);
  const companyWebsiteRef = useRef(null);
  const companyAddressRef = useRef(null);
  const companyTaxIdRef = useRef(null);
  const taxRateRef = useRef(null);
  const currencyRef = useRef(null);
  const paymentTermsRef = useRef(null);

  // Password state
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setProfile(mockUserProfile);
        setAvatarPreview(mockUserProfile.avatarUrl);
      } catch (error) {
        toast.error('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  // Handle profile save
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Collect all values from refs
      const updatedProfile = {
        ...profile,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        phone: phoneRef.current.value,
        jobTitle: jobTitleRef.current.value,
        bio: bioRef.current.value,
        companyName: companyNameRef.current.value,
        companyWebsite: companyWebsiteRef.current.value,
        companyAddress: companyAddressRef.current.value,
        companyTaxId: companyTaxIdRef.current.value,
        taxRate: Number(taxRateRef.current.value),
        currency: currencyRef.current.value,
        defaultPaymentTerms: paymentTermsRef.current.value
      };

      // Save to localStorage for invoice generation
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProfile(updatedProfile);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setProfile(prev => ({
          ...prev,
          avatarUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle password changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Validate password form
  const validatePasswordForm = () => {
    const errors = {};
    if (!passwords.current) errors.current = 'Current password is required';
    if (!passwords.new) errors.new = 'New password is required';
    else if (passwords.new.length < 8) errors.new = 'Password must be at least 8 characters';
    if (passwords.new !== passwords.confirm) errors.confirm = 'Passwords do not match';
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle password save
  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    setIsSavingPassword(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Password updated successfully');
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setIsSavingPassword(false);
    }
  };

  // Input component with ref
  const Input = ({ label, name, type = 'text', defaultValue, error, disabled, rows, inputRef }) => {
    const commonClasses = `
      w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm
      focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C]
      sm:text-sm transition-all duration-150 ease-in-out
      ${error ? 'border-red-500' : ''}
      ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white hover:border-gray-400'}
    `;

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        {rows ? (
          <textarea
            ref={inputRef}
            name={name}
            defaultValue={defaultValue}
            disabled={disabled}
            rows={rows}
            className={`${commonClasses} resize-none`}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        ) : (
          <input
            ref={inputRef}
            type={type}
            name={name}
            defaultValue={defaultValue}
            disabled={disabled}
            className={commonClasses}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        )}
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  };

  // Button component
  const Button = ({ type = 'button', onClick, disabled, loading, children, variant = 'primary' }) => {
    const baseClasses = `
      inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md
      shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `;

    const variantClasses = {
      primary: 'text-white bg-[#1ABC9C] hover:bg-[#16A085] border-transparent focus:ring-[#1ABC9C]',
      secondary: 'text-gray-700 bg-white hover:bg-gray-50 border-gray-300 focus:ring-[#1ABC9C]',
      danger: 'text-white bg-red-600 hover:bg-red-700 border-transparent focus:ring-red-500'
    };

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses[variant]}`}
      >
        {loading && <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />}
        {children}
      </button>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-10"></div>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-10 bg-gray-300 rounded w-24"></div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="h-24 w-24 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-[#2C3E50] flex items-center">
            <UserCircleIcon className="h-8 w-8 mr-3 text-[#1ABC9C]"/> User Profile
          </h1>
          <p className="mt-1.5 text-gray-500">
            Manage your personal and company information, and account security.
          </p>
        </header>

        {/* Profile Form */}
        <form onSubmit={handleProfileSave} className="mb-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-[#2C3E50]">Personal & Company Details</h3>
                <p className="mt-1 text-sm text-gray-500">Update your personal and company-related information.</p>
              </div>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </div>

            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-8">
                {/* Avatar Section */}
                <div className="flex-shrink-0 w-full sm:w-auto flex flex-col items-center space-y-2">
                  <span className="inline-block h-32 w-32 rounded-full overflow-hidden bg-gray-100 shadow">
                    {avatarPreview ? (
                      <img className="h-full w-full object-cover" src={avatarPreview} alt="Profile Avatar" />
                  ) : (
                      <UserCircleIcon className="h-full w-full text-gray-300" />
                  )}
                  </span>
                  {isEditing && (
                    <div className="relative">
                        <input
                          type="file"
                        id="avatarUpload"
                        accept="image/png, image/jpeg"
                          onChange={handleAvatarChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isSaving}
                        />
                      <Button variant="secondary" disabled={isSaving}>
                        <CameraIcon className="h-4 w-4 mr-1.5"/> Change Avatar
                      </Button>
                    </div>
                  )}
                </div>

                {/* Fields Section */}
                <div className="flex-1 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  {isEditing ? (
                    <>
                      <Input
                        label="First Name"
                            name="firstName"
                        defaultValue={profile.firstName}
                        disabled={isSaving}
                        inputRef={firstNameRef}
                          />
                      <Input
                        label="Last Name"
                            name="lastName"
                        defaultValue={profile.lastName}
                        disabled={isSaving}
                        inputRef={lastNameRef}
                      />
                      <div className="sm:col-span-2">
                        <Input
                          label="Email Address"
                          name="email"
                          type="email"
                          defaultValue={profile.email}
                          disabled={true}
                        />
                        <p className="mt-1 text-xs text-gray-500">Email cannot be changed here. Contact support for assistance.</p>
                      </div>
                      <Input
                        label="Phone Number"
                          name="phone"
                        defaultValue={profile.phone}
                        disabled={isSaving}
                        inputRef={phoneRef}
                      />
                      <Input
                        label="Job Title"
                        name="jobTitle"
                        defaultValue={profile.jobTitle}
                        disabled={isSaving}
                        inputRef={jobTitleRef}
                      />
                      <div className="sm:col-span-2">
                        <Input
                          label="Short Bio"
                          name="bio"
                          defaultValue={profile.bio}
                          disabled={isSaving}
                          rows={4}
                          inputRef={bioRef}
                        />
                      </div>
                      <div className="sm:col-span-2 pt-4 border-t border-gray-200">
                        <h4 className="text-md font-medium text-gray-600 mb-1">Company Information</h4>
                      </div>
                      <Input
                        label="Company Name"
                        name="companyName"
                        defaultValue={profile.companyName}
                        disabled={isSaving}
                        inputRef={companyNameRef}
                      />
                      <Input
                        label="Company Website"
                        name="companyWebsite"
                        type="url"
                        defaultValue={profile.companyWebsite}
                        disabled={isSaving}
                        inputRef={companyWebsiteRef}
                      />
                      <div className="sm:col-span-2">
                        <Input
                          label="Company Address"
                          name="companyAddress"
                          defaultValue={profile.companyAddress}
                          disabled={isSaving}
                          rows={3}
                          inputRef={companyAddressRef}
                        />
                      </div>
                      <Input
                        label="Company Tax ID"
                        name="companyTaxId"
                        defaultValue={profile.companyTaxId}
                        disabled={isSaving}
                        inputRef={companyTaxIdRef}
                      />
                      <Input
                        label="Tax Rate (%)"
                        name="taxRate"
                        type="number"
                        defaultValue={profile.taxRate}
                        disabled={isSaving}
                        inputRef={taxRateRef}
                      />
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Currency
                        </label>
                        <select
                          ref={currencyRef}
                          name="currency"
                          defaultValue={profile.currency}
                          disabled={isSaving}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm transition-all duration-150 ease-in-out"
                        >
                          <option value="INR">INR - Indian Rupee</option>
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                        </select>
                      </div>
                      <Input
                        label="Default Payment Terms"
                        name="defaultPaymentTerms"
                        defaultValue={profile.defaultPaymentTerms}
                        disabled={isSaving}
                        inputRef={paymentTermsRef}
                      />
                    </>
                  ) : (
                    <>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <UserCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
                          Full Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {`${profile.firstName} ${profile.lastName}`}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                          Email Address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">{profile.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                          Phone Number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">{profile.phone}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-2" />
                          Job Title
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">{profile.jobTitle}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <UserCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
                          Short Bio
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">{profile.bio}</dd>
                        </div>
                      <div className="sm:col-span-2 pt-4 border-t border-gray-200">
                        <h4 className="text-md font-medium text-gray-600 mb-1">Company Information</h4>
                        </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
                          Company Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">{profile.companyName}</dd>
                        </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <GlobeAltIcon className="h-5 w-5 text-gray-400 mr-2" />
                          Company Website
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <a href={profile.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-[#1ABC9C] hover:text-[#16A085] underline">
                            {profile.companyWebsite}
                          </a>
                        </dd>
                        </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                          Company Address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">{profile.companyAddress}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <IdentificationIcon className="h-5 w-5 text-gray-400 mr-2" />
                          Company Tax ID
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">{profile.companyTaxId}</dd>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="pt-5 mt-6 border-t border-gray-200 flex justify-end space-x-3">
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(false)}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={isSaving}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Password Form */}
        <form onSubmit={handlePasswordSave}>
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-[#2C3E50]">Change Password</h3>
              <p className="mt-1 text-sm text-gray-500">Update your account password. Choose a strong, unique password.</p>
            </div>
            <div className="px-4 py-5 sm:p-6 space-y-6">
              <Input
                label="Current Password"
                name="current"
                type="password"
                value={passwords.current}
                onChange={handlePasswordChange}
                error={passwordErrors.current}
                disabled={isSavingPassword}
              />
              <Input
                label="New Password"
                name="new"
                type="password"
                value={passwords.new}
                onChange={handlePasswordChange}
                error={passwordErrors.new}
                disabled={isSavingPassword}
              />
              <Input
                label="Confirm New Password"
                name="confirm"
                type="password"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                error={passwordErrors.confirm}
                disabled={isSavingPassword}
              />
              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  loading={isSavingPassword}
                  disabled={isSavingPassword}
                >
                  {isSavingPassword ? 'Updating...' : 'Update Password'}
                </Button>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Profile; 