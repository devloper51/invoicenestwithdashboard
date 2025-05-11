import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { 
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Inc.',
    website: 'www.acme.com',
    address: '123 Business Street, Suite 100, New York, NY 10001',
    bio: 'Experienced business professional with a focus on client relationships and project management.',
    avatar: null
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState({ ...profileData })

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setProfileData(editedData)
    setIsEditing(false)
    toast.success('Profile updated successfully!')
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditedData(prev => ({
          ...prev,
          avatar: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-[#2C3E50]">Profile Information</h3>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C]"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  {profileData.avatar ? (
                    <img
                      className="h-24 w-24 rounded-full"
                      src={profileData.avatar}
                      alt="Profile"
                    />
                  ) : (
                    <UserCircleIcon className="h-24 w-24 text-[#1ABC9C]" />
                  )}
                  {isEditing && (
                    <div className="mt-2">
                      <label className="block text-sm text-[#7F8C8D]">
                        Change avatar
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="mt-1 block w-full text-sm text-[#7F8C8D] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#1ABC9C] file:text-white hover:file:bg-[#16A085]"
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-[#2C3E50]">
                            First name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={editedData.firstName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C] sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-[#2C3E50]">
                            Last name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={editedData.lastName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C] sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#2C3E50]">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={editedData.email}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C] sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[#2C3E50]">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={editedData.phone}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C] sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-[#2C3E50]">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          id="company"
                          value={editedData.company}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C] sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-[#2C3E50]">
                          Website
                        </label>
                        <input
                          type="url"
                          name="website"
                          id="website"
                          value={editedData.website}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C] sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-[#2C3E50]">
                          Address
                        </label>
                        <textarea
                          name="address"
                          id="address"
                          rows={3}
                          value={editedData.address}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C] sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-[#2C3E50]">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          id="bio"
                          rows={4}
                          value={editedData.bio}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C] sm:text-sm"
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C]"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-center space-x-3">
                          <UserCircleIcon className="h-5 w-5 text-[#1ABC9C]" />
                          <span className="text-[#2C3E50]">
                            {profileData.firstName} {profileData.lastName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <EnvelopeIcon className="h-5 w-5 text-[#1ABC9C]" />
                          <span className="text-[#2C3E50]">{profileData.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <PhoneIcon className="h-5 w-5 text-[#1ABC9C]" />
                          <span className="text-[#2C3E50]">{profileData.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <BuildingOfficeIcon className="h-5 w-5 text-[#1ABC9C]" />
                          <span className="text-[#2C3E50]">{profileData.company}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <GlobeAltIcon className="h-5 w-5 text-[#1ABC9C]" />
                          <span className="text-[#2C3E50]">{profileData.website}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPinIcon className="h-5 w-5 text-[#1ABC9C]" />
                          <span className="text-[#2C3E50]">{profileData.address}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-[#2C3E50]">Bio</h4>
                        <p className="mt-1 text-sm text-[#7F8C8D]">{profileData.bio}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 