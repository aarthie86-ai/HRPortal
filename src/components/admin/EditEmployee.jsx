import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEmployeeDetailsById, updateEmployeeDetails } from "../../api/employeeDetails.js"; // Assume this API module exists

export default function EditProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [employeeData, setEmployeeData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const employeeId = params.id || location.state?.employeeId;

    useEffect(() => {
        // Fetch and set employeeDetails data here to prepopoulate the fields
        const fetchProfileData = async () => {
            if (employeeId) {
                try {
                    const employeeData = await getEmployeeDetailsById(employeeId);
                    setEmployeeData(employeeData[0]);
                    setIsLoading(false);

                } catch (error) {
                    console.error("Error fetching profile data:", error);
                    setIsLoading(false);
                }
            }
        };
        fetchProfileData();
    }, []);

    const validateField = (fieldName, value) => {
        let newErrors = { ...errors };
        
        switch (fieldName) {
            case "firstName":
            case "lastName":
                if (!value || value.trim().length === 0) {
                    newErrors[fieldName] = "This field is required";
                } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                    newErrors[fieldName] = "Only letters, spaces, hyphens and apostrophes allowed";
                } else {
                    delete newErrors[fieldName];
                }
                break;
            case "mobileNumber":
                if (!value || value.trim().length === 0) {
                    newErrors[fieldName] = "Phone number is required";
                } else if (!/^[\+\d\s\-()]+$/.test(value) || value.replace(/\D/g, '').length < 10) {
                    newErrors[fieldName] = "Invalid phone number format";
                } else {
                    delete newErrors[fieldName];
                }
                break;
            case "personalEmail":
                if (!value || value.trim().length === 0) {
                    newErrors[fieldName] = "Email is required";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    newErrors[fieldName] = "Invalid email format";
                } else {
                    delete newErrors[fieldName];
                }
                break;
            case "gender":
            case "maritalStatus":
            case "employeeType":
            case "employmentStatus":
            case "workMode":
                if (!value) {
                    newErrors[fieldName] = "Please select an option";
                } else {
                    delete newErrors[fieldName];
                }
                break;
            case "dateOfBirth":
                if (!value) {
                    newErrors[fieldName] = "Date of birth is required";
                } else if (new Date(value) > new Date()) {
                    newErrors[fieldName] = "Date of birth cannot be in the future";
                } else {
                    delete newErrors[fieldName];
                }
                break;
            case "joiningDate":
                if (!value) {
                    newErrors[fieldName] = "Joining date is required";
                } else {
                    const joiningDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    joiningDate.setHours(0, 0, 0, 0);
                    if (joiningDate < today) {
                        newErrors[fieldName] = "Joining date cannot be in the past";
                    } else {
                        delete newErrors[fieldName];
                    }
                }
                break;
            case "nationality":
            case "office":
            case "country":
                if (!value || value.trim().length === 0) {
                    newErrors[fieldName] = "This field is required";
                } else {
                    delete newErrors[fieldName];
                }
                break;
            case "department":
            case "designation":
                if (!value) {
                    newErrors[fieldName] = "Please select an option";
                } else {
                    delete newErrors[fieldName];
                }
                break;
            case "emergencyContactName":
                if (!value || value.trim().length === 0) {
                    newErrors[fieldName] = "Emergency contact name is required";
                } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                    newErrors[fieldName] = "Only letters allowed";
                } else {
                    delete newErrors[fieldName];
                }
                break;
            case "emergencyContactPhone":
                if (!value || value.trim().length === 0) {
                    newErrors[fieldName] = "Emergency contact phone is required";
                } else if (!/^[\+\d\s\-()]+$/.test(value) || value.replace(/\D/g, '').length < 10) {
                    newErrors[fieldName] = "Invalid phone number format";
                } else {
                    delete newErrors[fieldName];
                }
                break;
            case "emergencyContactRelationship":
                if (!value) {
                    newErrors[fieldName] = "Please select a relationship";
                } else {
                    delete newErrors[fieldName];
                }
                break;
            case "managerId":
                if (!value || value.trim().length === 0) {
                    newErrors[fieldName] = "Manager ID is required";
                } else {
                    delete newErrors[fieldName];
                }
                break;
            case "managerName":
                if (!value || value.trim().length === 0) {
                    newErrors[fieldName] = "Manager name is required";
                } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                    newErrors[fieldName] = "Only letters allowed";
                } else {
                    delete newErrors[fieldName];
                }
                break;
            case "managerEmail":
                if (!value || value.trim().length === 0) {
                    newErrors[fieldName] = "Manager email is required";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    newErrors[fieldName] = "Invalid email format";
                } else {
                    delete newErrors[fieldName];
                }
                break;
            default:
                break;
        }
        
        setErrors(newErrors);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployeeData(prevData => ({
            ...prevData,
            [name]: value
        }));
        validateField(name, value);
    }

    const handleContactDetailsChange = (event) => {
        const { name, value } = event.target;
        setEmployeeData(prevData => ({
            ...prevData,
            contactDetails: {
                ...prevData.contactDetails,
                [name]: value
            }
        }));
        validateField(name, value);
    }

    const handleEmergencyContactChange = (event) => {
        const { name, value } = event.target;
        
        // Map form field names to db field names
        let fieldName = name;
        if (name === "emergencyContactName") {
            fieldName = "name";
        } else if (name === "emergencyContactRelationship") {
            fieldName = "relationship";
        } else if (name === "emergencyContactPhone") {
            fieldName = "phone";
        }
        
        setEmployeeData(prevData => ({
            ...prevData,
            contactDetails: {
                ...prevData.contactDetails,
                emergencyContact: {
                    ...prevData.contactDetails?.emergencyContact,
                    [fieldName]: value
                }
            }
        }));
        validateField(name, value);
    }

    const handleWorkLocationChange = (event) => {
        const { name, value } = event.target;
        setEmployeeData(prevData => ({
            ...prevData,
            workLocation: {
                ...prevData.workLocation,
                [name]: value
            }
        }));
        validateField(name, value);
    }

    const handleManagerChange = (event) => {
        const { name, value } = event.target;
        
        // Map form field names to db field names
        let fieldName = name;
        if (name === "managerId") {
            fieldName = "managerId";
        } else if (name === "managerName") {
            fieldName = "name";
        } else if (name === "managerEmail") {
            fieldName = "email";
        }
        
        setEmployeeData(prevData => ({
            ...prevData,
            reportingManager: {
                ...prevData.reportingManager,
                [fieldName]: value
            }
        }));
        validateField(name, value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate all fields before submission
        let hasErrors = false;
        const fieldsToValidate = [
            "firstName", "lastName", "gender", "dateOfBirth", "maritalStatus", 
            "nationality", "mobileNumber", "personalEmail", "joiningDate", 
            "department", "designation", "employeeType", "employmentStatus",
            "office", "country", "workMode", "emergencyContactName", 
            "emergencyContactPhone", "emergencyContactRelationship", "managerId",
            "managerName", "managerEmail"
        ];
        
        fieldsToValidate.forEach(field => {
            let value = employeeData[field];
            if (field.includes("emergency")) {
                // Map form field names to db field names
                let dbFieldName = field;
                if (field === "emergencyContactName") {
                    dbFieldName = "name";
                } else if (field === "emergencyContactRelationship") {
                    dbFieldName = "relationship";
                } else if (field === "emergencyContactPhone") {
                    dbFieldName = "phone";
                }
                value = employeeData.contactDetails?.emergencyContact?.[dbFieldName];
            } else if (field === "mobileNumber" || field === "personalEmail") {
                value = employeeData.contactDetails?.[field];
            } else if (field === "office" || field === "country" || field === "workMode") {
                value = employeeData.workLocation?.[field];
            } else if (field.includes("manager")) {
                // Map form field names to db field names
                let dbFieldName = field;
                if (field === "managerId") {
                    dbFieldName = "managerId";
                } else if (field === "managerName") {
                    dbFieldName = "name";
                } else if (field === "managerEmail") {
                    dbFieldName = "email";
                }
                value = employeeData.reportingManager?.[dbFieldName];
            }
            validateField(field, value);
            if (errors[field]) hasErrors = true;
        });
        
        if (hasErrors) {
            return;
        }
        
        // Show confirmation modal instead of submitting directly
        setShowConfirmModal(true);
    }

    const handleConfirmSubmit = async () => {
        setIsSubmitting(true);
        try {
            console.log('Submitting employee data:', JSON.stringify(employeeData, null, 2));
            const response = await updateEmployeeDetails(employeeId, employeeData);
            console.log('Profile has been updated:', response);
            setShowConfirmModal(false);
            navigate(`/admin/employees/${employeeId}`);
        } catch (error) {
            console.error('Error updating profile edit request:', error);
            setIsSubmitting(false);
        }
    }

    const handleCancelConfirm = () => {
        setShowConfirmModal(false);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!employeeData) {
        return <div>No data found.</div>;
    }

    return (
        <main className="h-[calc(100vh-6rem)] mt-8  overflow-auto bg-[#eaebf3] w-[calc(100vw-16rem)] flex flex-col">
            <h1 className="text-2xl text-center mt-4 font-bold mb-4"> Edit Employee Profile</h1>
            <div className="mx-auto mb-8 p-8 bg-white rounded-lg shadow-md w-4/5 self-center">
                <h2 className="text-lg font-semibold ml-4 mt-1 mb-6 border-b pb-2 border-gray-400">Employee Details</h2>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    {/* Personal Information Section */}
                    <div className="mb-6">
                        <h3 className="text-md font-semibold mb-4 text-gray-700">Personal Information</h3>
                        
                        {/* First Name and Last Name */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                    First Name *
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                    value={employeeData.firstName || ''} 
                                />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                    Last Name *
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                    value={employeeData.lastName || ''} 
                                />
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                            </div>
                        </div>

                        {/* Gender and Marital Status */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                                    Gender *
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    required
                                    onChange={handleChange}
                                    value={employeeData.gender || ''}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.gender ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maritalStatus">
                                    Marital Status *
                                </label>
                                <select
                                    id="maritalStatus"
                                    name="maritalStatus"
                                    required
                                    onChange={handleChange}
                                    value={employeeData.maritalStatus || ''}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.maritalStatus ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                >
                                    <option value="">Select Marital Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                </select>
                                {errors.maritalStatus && <p className="text-red-500 text-xs mt-1">{errors.maritalStatus}</p>}
                            </div>
                        </div>

                        {/* Date of Birth and Nationality */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfBirth">
                                    Date of Birth *
                                </label>
                                <input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    required
                                    value={employeeData.dateOfBirth || ''}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.dateOfBirth ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`
                            }
                                />
                                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nationality">
                                    Nationality *
                                </label>
                                <input
                                    id="nationality"
                                    name="nationality"
                                    type="text"
                                    required
                                    value={employeeData.nationality || ''}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.nationality ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                />
                                {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="mb-6 border-t pt-6">
                        <h3 className="text-md font-semibold mb-4 text-gray-700">Contact Information</h3>
                        
                        {/* Personal Email and Phone */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="personalEmail">
                                    Personal Email *
                                </label>
                                <input
                                    id="personalEmail"
                                    name="personalEmail"
                                    type="email"
                                    required
                                    onChange={handleContactDetailsChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.personalEmail ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                    value={employeeData.contactDetails?.personalEmail || ''} 
                                />
                                {errors.personalEmail && <p className="text-red-500 text-xs mt-1">{errors.personalEmail}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
                                    Phone Number *
                                </label>
                                <input
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    type="tel"
                                    required
                                    onChange={handleContactDetailsChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.mobileNumber ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                    value={employeeData.contactDetails?.mobileNumber || ''} 
                                />
                                {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
                            </div>
                        </div>

                        {/* Emergency Contact Name and Relationship */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emergencyContactName">
                                    Emergency Contact Name *
                                </label>
                                <input
                                    id="emergencyContactName"
                                    name="emergencyContactName"
                                    type="text"
                                    required
                                    onChange={handleEmergencyContactChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.emergencyContactName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                    value={employeeData?.contactDetails?.emergencyContact?.name || ''} 
                                />
                                {errors.emergencyContactName && <p className="text-red-500 text-xs mt-1">{errors.emergencyContactName}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emergencyContactRelationship">
                                    Relationship *
                                </label>
                                <select
                                    id="emergencyContactRelationship"
                                    name="emergencyContactRelationship"
                                    required
                                    onChange={handleEmergencyContactChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.emergencyContactRelationship ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                    value={employeeData?.contactDetails?.emergencyContact?.relationship || ''}
                                >
                                    <option value="">Select Relationship</option>
                                    <option value="Spouse">Spouse</option>
                                    <option value="Parent">Parent</option>
                                    <option value="Child">Child</option>
                                    <option value="Sibling">Sibling</option>
                                    <option value="Grandparent">Grandparent</option>
                                    <option value="Friend">Friend</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.emergencyContactRelationship && <p className="text-red-500 text-xs mt-1">{errors.emergencyContactRelationship}</p>}
                            </div>
                        </div>

                        {/* Emergency Contact Phone */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emergencyContactPhone">
                                Emergency Contact Phone *
                            </label>
                            <input
                                id="emergencyContactPhone"
                                name="emergencyContactPhone"
                                type="tel"
                                    required
                                    onChange={handleEmergencyContactChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.emergencyContactPhone ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                value={employeeData?.contactDetails?.emergencyContact?.phone || ''} 
                            />
                            {errors.emergencyContactPhone && <p className="text-red-500 text-xs mt-1">{errors.emergencyContactPhone}</p>}
                        </div>
                    </div>

                    {/* Work Information Section */}
                    <div className="mb-6 border-t pt-6">
                        <h3 className="text-md font-semibold mb-4 text-gray-700">Work Information</h3>
                        
                        {/* Joining Date and Employee Type */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="joiningDate">
                                    Joining Date *
                                </label>
                                <input
                                    id="joiningDate"
                                    name="joiningDate"
                                    type="date"
                                    required
                                    value={employeeData.joiningDate || ''}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.joiningDate ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                />
                                {errors.joiningDate && <p className="text-red-500 text-xs mt-1">{errors.joiningDate}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeType">
                                    Employee Type *
                                </label>
                                <select
                                    id="employeeType"
                                    name="employeeType"
                                    required
                                    onChange={handleChange}
                                    value={employeeData.employeeType || ''}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.employeeType ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                >
                                    <option value="">Select Employee Type</option>
                                    <option value="FULL_TIME">Full Time</option>
                                    <option value="PART_TIME">Part Time</option>
                                    <option value="CONTRACT">Contract</option>
                                </select>
                                {errors.employeeType && <p className="text-red-500 text-xs mt-1">{errors.employeeType}</p>}
                            </div>
                        </div>

                        {/* Employment Status and Department */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employmentStatus">
                                    Employment Status *
                                </label>
                                <select
                                    id="employmentStatus"
                                    name="employmentStatus"
                                    required
                                    onChange={handleChange}
                                    value={employeeData.employmentStatus || ''}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.employmentStatus ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                >
                                    <option value="">Select Employment Status</option>
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                    <option value="ON_LEAVE">On Leave</option>
                                </select>
                                {errors.employmentStatus && <p className="text-red-500 text-xs mt-1">{errors.employmentStatus}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                                    Department *
                                </label>
                                <select
                                    id="department"
                                    name="department"
                                    value={employeeData.department || ''}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.department ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                >
                                    <option value="">Select Department</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Human Resources">Human Resources</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Operations">Operations</option>
                                    <option value="IT">IT</option>
                                    <option value="Legal">Legal</option>
                                </select>
                                {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                            </div>
                        </div>

                        {/* Designation */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
                                Designation *
                            </label>
                            <select
                                id="designation"
                                name="designation"
                                value={employeeData.designation || ''}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.designation ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            >
                                <option value="">Select Designation</option>
                                <option value="Junior Software Engineer">Junior Software Engineer</option>
                                <option value="Software Engineer">Software Engineer</option>
                                <option value="Senior Software Engineer">Senior Software Engineer</option>
                                <option value="Lead Engineer">Lead Engineer</option>
                                <option value="Architect">Architect</option>
                                <option value="Product Manager">Product Manager</option>
                                <option value="Manager">Manager</option>
                                <option value="Senior Manager">Senior Manager</option>
                                <option value="Director">Director</option>
                            </select>
                            {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
                        </div>
                    </div>

                    {/* Work Location Section */}
                    <div className="mb-6 border-t pt-6">
                        <h3 className="text-md font-semibold mb-4 text-gray-700">Work Location</h3>
                        
                        {/* Office and Country */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="office">
                                    Office *
                                </label>
                                <input
                                    id="office"
                                    name="office"
                                    type="text"
                                    required
                                    value={employeeData.workLocation?.office || ''}
                                    onChange={handleWorkLocationChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.office ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                />
                                {errors.office && <p className="text-red-500 text-xs mt-1">{errors.office}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                                    Country *
                                </label>
                                <input
                                    id="country"
                                    name="country"
                                    type="text"
                                    required
                                    value={employeeData.workLocation?.country || ''}
                                    onChange={handleWorkLocationChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.country ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                />
                                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                            </div>
                        </div>

                        {/* Work Mode */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workMode">
                                Work Mode *
                            </label>
                            <select
                                id="workMode"
                                name="workMode"
                                    required
                                onChange={handleWorkLocationChange}
                                value={employeeData.workLocation?.workMode || ''}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.workMode ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            >
                                <option value="">Select Work Mode</option>
                                <option value="IN_OFFICE">In Office</option>
                                <option value="REMOTE">Remote</option>
                                <option value="HYBRID">Hybrid</option>
                            </select>
                            {errors.workMode && <p className="text-red-500 text-xs mt-1">{errors.workMode}</p>}
                        </div>
                    </div>

                    {/* Manager Information Section */}
                    <div className="mb-6 border-t pt-6">
                        <h3 className="text-md font-semibold mb-4 text-gray-700">Manager Information</h3>
                        
                        {/* Manager ID and Manager Name */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="managerId">
                                    Manager ID *
                                </label>
                                <input
                                    id="managerId"
                                    name="managerId"
                                    type="text"
                                    required
                                    onChange={handleManagerChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.managerId ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                    value={employeeData.reportingManager?.managerId || ''}
                                />
                                {errors.managerId && <p className="text-red-500 text-xs mt-1">{errors.managerId}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="managerName">
                                    Manager Name *
                                </label>
                                <input
                                    id="managerName"
                                    name="managerName"
                                    type="text"
                                    required
                                    onChange={handleManagerChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.managerName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                    value={employeeData.reportingManager?.name || ''}
                                />
                                {errors.managerName && <p className="text-red-500 text-xs mt-1">{errors.managerName}</p>}
                            </div>
                        </div>

                        {/* Manager Email */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="managerEmail">
                                Manager Email *
                            </label>
                            <input
                                id="managerEmail"
                                name="managerEmail"
                                type="email"
                                    required
                                    onChange={handleManagerChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.managerEmail ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                value={employeeData.reportingManager?.email || ''}
                            />
                            {errors.managerEmail && <p className="text-red-500 text-xs mt-1">{errors.managerEmail}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 mt-6 border-t pt-6">
                        <button
                            type="submit"
                            className="bg-[#315a94] hover:bg-[#1f406d] text-white font-bold py-2 px-6 rounded"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 overflow-hidden">
                        <h2 className="text-xl bg-[#315a94] text-white text-center font-bold py-4 px-6">Confirm Changes</h2>
                        <div className="p-6">
                            <p className="text-center text-gray-600 mb-6">
                                Are you sure you want to save the changes to this employee's profile?
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleConfirmSubmit}
                                    disabled={isSubmitting}
                                    className="flex-1 bg-[#315a94] hover:bg-[#1f406d] disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition"
                                >
                                    {isSubmitting ? "Saving..." : "Yes, Save"}
                                </button>
                                <button
                                    onClick={handleCancelConfirm}
                                    disabled={isSubmitting}
                                    className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}