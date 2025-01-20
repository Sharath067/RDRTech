import React, {useState} from 'react';
import './CreatingSubscriptionPlans.css';
import Header from '../../components/Header/Header';
import {Link, useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createSubscriptionPlan} from '../apiServices/apiServices';

const CreatingSubscriptionPlans = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    planName: '',
    planDescription: '',
    planDuration: '',
    planAmount: '',
    numberOfProjects: '',
    numberOfEmployees: '',
    numberOfClients: '',
    isPlanActive: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // const formattedAmount = amount.toLocaleString();
  const predefinedPlans = {
    FREE: {duration: 7, amount: 1},
    Premium: {duration: 1, amount: 999},
    Quarterly: {duration: 3, amount: 2999},
    Annual: {duration: 12, amount: 14999},
  };

  console.log(message);

  const handlePlanSelect = e => {
    const selectedPlan = e.target.value;
    setFormData({
      ...formData,
      planName: selectedPlan,
      planDuration: predefinedPlans[selectedPlan]?.duration || '',
      planAmount: predefinedPlans[selectedPlan]?.amount || 0,
    });
    setErrors({
      ...errors,
      planName: '',
      planDuration: '',
      planAmount: '',
    });
  };

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateField = (name, value) => {
    let error = '';
    if (!value) {
      if (name !== 'isPlanActive') {
        error = 'Please enter the Account status';
      }
      error = `Please enter the ${name
        .replace('plan', '')
        .replace('numberOf', '')
        .toLowerCase()}`;
    } else if (
      (name === 'planDuration' ||
        name === 'planAmount' ||
        name.startsWith('numberOf')) &&
      isNaN(value)
    ) {
      error = `${name
        .replace('plan', '')
        .replace('numberOf', '')
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()} must be a number`;
    }
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error,
    }));
    return error;
  };

  const handleBlur = e => {
    const {name, value} = e.target;
    validateField(name, value);
  };

  const submitPlan = async postData => {
    try {
      await createSubscriptionPlan(postData);
      toast.success('Plan created successfully!');
      setFormData({
        planName: '',
        planDescription: '',
        planDuration: '',
        planAmount: '',
        numberOfProjects: '',
        numberOfEmployees: '',
        numberOfClients: '',
        isPlanActive: '',
      });
      setTimeout(() => {
        navigate('/admin/subscription');
      }, 1000);
    } catch (error) {
      toast.error('Failed to create plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    let valid = true;
    const newErrors = {};

    for (const [name, value] of Object.entries(formData)) {
      const error = validateField(name, value);
      if (error) {
        valid = false;
        newErrors[name] = error;
      }
    }

    setErrors(newErrors);

    if (!valid) {
      setMessage('Please correct the errors above');
      return;
    }

    const postData = {
      name: formData.planName,
      description: formData.planDescription,
      subscriptionDuration: parseInt(formData.planDuration),
      subscriptionPlanAmount: parseFloat(formData.planAmount),
      numberOfProjects: parseInt(formData.numberOfProjects),
      numberOfEmployees: parseInt(formData.numberOfEmployees),
      numberOfClients: parseInt(formData.numberOfClients),
      isPlanActive: formData.isPlanActive === 'true',
    };

    setLoading(true);
    setMessage('');
    await submitPlan(postData);
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="create-container">
        <span>
          <Link to="/admin/subscription">
            <i
              className="fa fa-arrow-left fa-1x arrowLeft"
              aria-hidden="true"></i>
          </Link>
        </span>
        <div className="create-sub-container">
          <div className="create-plan-container">
            <h1>Create Price Plan</h1>
            <p>Charge a flat rate per subscription, license, or membership.</p>
            <form className="create-plan-form" onSubmit={handleSubmit}>
              <label>
                Plan Name
                <select
                  name="planName"
                  value={formData.planName}
                  onChange={handlePlanSelect}>
                  <option value="">Select Plan Type</option>
                  <option value="FREE">FREE</option>
                  <option value="Premium">Premium</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Annual">Annual</option>
                </select>
                {errors.planName && (
                  <span className="error">{errors.planName}</span>
                )}
              </label>
              <label>
                Number of Projects
                <input
                  type="text"
                  name="numberOfProjects"
                  placeholder="Enter number of projects"
                  value={formData.numberOfProjects}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.numberOfProjects && (
                  <span className="error">{errors.numberOfProjects}</span>
                )}
              </label>
              <label>
                Number of Employees
                <input
                  type="text"
                  name="numberOfEmployees"
                  placeholder="Enter number of employees"
                  value={formData.numberOfEmployees}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.numberOfEmployees && (
                  <span className="error">{errors.numberOfEmployees}</span>
                )}
              </label>
              <label>
                Number of Clients
                <input
                  type="text"
                  name="numberOfClients"
                  placeholder="Enter number of clients"
                  value={formData.numberOfClients}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.numberOfClients && (
                  <span className="error">{errors.numberOfClients}</span>
                )}
              </label>
              <label>
                Plan Description
                <input
                  type="text"
                  name="planDescription"
                  placeholder="Enter plan description"
                  value={formData.planDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.planDescription && (
                  <span className="error">{errors.planDescription}</span>
                )}
              </label>

              <label>
                Plan Duration
                <select
                  name="planName"
                  value={formData.planName}
                  onChange={handlePlanSelect}>
                  <option value="">Select Plan Type</option>
                  <option value="FREE">7 days</option>
                  <option value="Premium">1 month</option>
                  <option value="Quarterly">3 months</option>
                  <option value="Annual">12 months</option>
                </select>
                {errors.planName && (
                  <span className="error">{errors.planName}</span>
                )}
              </label>

              <label>
                Plan Amount
                <input
                  type="text"
                  name="planAmount"
                  placeholder="Enter plan amount"
                  value={formData.planAmount}
                  onChange={handleChange}
                  readOnly
                />
                {errors.planAmount && (
                  <span className="error">{errors.planAmount}</span>
                )}
              </label>
              <label>Account status</label>
              <select
                name="isPlanActive"
                value={formData.isPlanActive}
                onChange={handleChange}
                onBlur={handleBlur}>
                <option value="">Select Status</option>
                <option value={true}>TRUE</option>
                <option value={false}>FALSE</option>
              </select>
              {errors.isPlanActive && (
                <span className="error left-aligned-error">
                  {errors.isPlanActive}
                </span>
              )}
              <div className="form-buttons">
                <button
                  type="submit"
                  className="create-button"
                  disabled={loading}>
                  {loading ? 'Creating...' : 'Create Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatingSubscriptionPlans;
