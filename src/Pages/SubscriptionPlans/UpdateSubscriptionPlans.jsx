import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/Header';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UpdateSubscriptionPlans';
import {getAllPlans, updatePlan} from '../apiServices/apiServices';

const UpdateSubscriptionPlans = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const token = localStorage.getItem('jwtToken');

  const [formData, setFormData] = useState({
    planId: '',
    planName: '',
    planDescription: '',
    planDuration: '',
    planAmount: '',
    numberOfProjects: '0',
    numberOfEmployees: '0',
    numberOfClients: '0',
    isPlanActive: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchPlanData = async () => {
      if (id) {
        try {
          const data = await getAllPlans(token);
          const plan = data.find(val => Number(val.id) === Number(id));
          if (plan) {
            setFormData({
              planId: plan.id,
              planName: plan.name,
              planDescription: plan.description,
              planDuration: plan.subscriptionDuration,
              planAmount: plan.subscriptionPlanAmount,
              numberOfProjects: plan.numberOfProjects.toString() || '0',
              numberOfEmployees: plan.numberOfEmployees.toString() || '0',
              numberOfClients: plan.numberOfClients.toString() || '0',
              isPlanActive: plan.isPlanActive ? 'true' : 'false',
            });
          }
        } catch (error) {
          toast.error('Failed to load plan data. Please try again.');
          console.error('Error:', error);
        }
      }
    };

    fetchPlanData();
  }, [id, token]);

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: name === 'isPlanActive' ? value === 'true' : value,
    });
  };

  const predefinedPlans = {
    Trial: {duration: 7, amount: 0.0},
    Premium: {duration: 30, amount: 999},
    Quarterly: {duration: 90, amount: 2999},
    Annual: {duration: 365, amount: 14999},
  };

  const handlePlanSelect = e => {
    const selectedPlan = e.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      planName: e.target.value,
    }));
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

  const handleSubmit = async e => {
    e.preventDefault();

    const postData = {
      id: parseInt(formData.planId),
      name: formData.planName,
      description: formData.planDescription,
      subscriptionDuration: parseInt(formData.planDuration),
      subscriptionPlanAmount: parseFloat(formData.planAmount),
      numberOfProjects: parseInt(formData.numberOfProjects),
      numberOfEmployees: parseInt(formData.numberOfEmployees),
      numberOfClients: parseInt(formData.numberOfClients),
      isPlanActive: Boolean(formData.isPlanActive),
    };

    setLoading(true);
    setMessage('');

    try {
      await updatePlan(token, postData);
      toast.success('Plan updated successfully!');
      setTimeout(() => {
        navigate('/admin/subscription');
      }, 1000);
    } catch (error) {
      toast.error(
        `Failed to update plan: ${error.message || 'Please try again.'}`,
      );
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
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
            <h1>Update Price Plan</h1>
            <p>
              This rate remains consistent when creating new plans or updating
              existing ones.
            </p>
            <form className="create-plan-form" onSubmit={handleSubmit}>
              {/* <label>
                Plan Name
                <input
                  type="text"
                  name="planName"
                  value={formData.planName}
                  onChange={handleChange}
                />
              </label> */}
              <label>
                Plan Name
                <select
                  name="planName"
                  value={formData.planName}
                  onChange={handlePlanSelect}>
                  <option value="">Select Plan Type</option>
                  <option value="Trial">Trial</option>
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
                  type="number"
                  name="numberOfProjects"
                  value={formData.numberOfProjects}
                  onChange={handleChange}
                />
              </label>
              <label>
                Number of Employees
                <input
                  type="number"
                  name="numberOfEmployees"
                  value={formData.numberOfEmployees}
                  onChange={handleChange}
                />
              </label>
              <label>
                Number of Clients
                <input
                  type="number"
                  name="numberOfClients"
                  value={formData.numberOfClients}
                  onChange={handleChange}
                />
              </label>
              <label>
                Plan Description
                <input
                  type="text"
                  name="planDescription"
                  value={formData.planDescription}
                  onChange={handleChange}
                />
              </label>
              <label>
                Plan Duration (Days)
                <input
                  type="text"
                  name="planDuration"
                  value={formData.planDuration}
                  onChange={handleChange}
                />
              </label>
              <label>
                Plan Amount
                <input
                  type="number"
                  name="planAmount"
                  value={formData.planAmount}
                  onChange={handleChange}
                />
              </label>
              <label>Status</label>
              <select
                name="isPlanActive"
                value={formData.isPlanActive}
                onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="true">TRUE</option>
                <option value="false">FALSE</option>
              </select>
              <div className="form-buttons">
                <button
                  type="submit"
                  className="create-button"
                  disabled={loading}>
                  {loading ? 'Updating...' : 'Update Plan'}
                </button>
              </div>
            </form>
            {message && <p className="form-message">{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSubscriptionPlans;
