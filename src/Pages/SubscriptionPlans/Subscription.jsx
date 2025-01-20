import React, {useState, useEffect} from 'react';
import './Subscription.css';
import Header from '../../components/Header/Header';
import {NavLink, useNavigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {fetchPlans} from '../apiServices/apiServices';

const Subscription = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const fetchPlansData = async () => {
      if (token) {
        try {
          const data = await fetchPlans(token);
          console.log('Updated response of subscription: ', data);
          setPlans(data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchPlansData();
  }, []);

  const handleCreatePlanClick = () =>
    navigate('/admin/subscription/creating-plans');

  const handleEditPlanClick = plan =>
    navigate(`/admin/subscription/updating-plans/${plan.id}`);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{height: '100vh'}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Error loading plans: {error.message}</p>;
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="header-component-back-button">
        <span className="back-arrow-2"></span>
        <NavLink
          to="/admin/subscription/creating-plans"
          className="create-plan-button1"
          onClick={handleCreatePlanClick}>
          <span className="create-plan-span">+</span> add new
        </NavLink>
      </div>
      <div className="main-container contain">
        <div className="contains">
          <div>
            <h1>Our Pricing Plans</h1>
            <p>
              To create a new pricing plan, start by selecting one of the
              following:
            </p>
          </div>
          <div className="plans">
            {plans.map(plan => (
              <div className="plan" key={plan.id}>
                <div className="plan-name-container">
                  <h2 className="planName">{plan.name}</h2>
                </div>
                {/* <p className="price">
                  &#8377;{plan.subscriptionPlanAmount}{' '}
                  <span>
                    {'/'}
                    {plan.name.toLowerCase() === 'free'
                      ? `${plan.subscriptionDuration} days`
                      : `${Math.ceil(plan.subscriptionDuration / 31)} months`}
                  </span>
                </p> */}
                <p className="price">
                  &#8377;{plan.subscriptionPlanAmount}{' '}
                  <span>
                    {'/'}
                    {plan.name.toLowerCase() === 'free'
                      ? `${plan.subscriptionDuration} days`
                      : plan.name.toLowerCase() === 'premium'
                      ? '1 month'
                      : plan.name.toLowerCase() === 'quarterly'
                      ? '3 months'
                      : plan.name.toLowerCase() === 'annual'
                      ? '12 months'
                      : `${Math.ceil(plan.subscriptionDuration / 31)} months`}
                  </span>
                </p>
                <div className="detailed-plans">
                  <div className="plan-detail">
                    <p>
                      <i className="fa fa-check" aria-hidden="true"></i>
                      {plan.description}
                    </p>
                  </div>
                  <div className="plan-detail">
                    <p>
                      <i className="fa fa-check" aria-hidden="true"></i>
                      Projects: {plan.numberOfProjects}
                    </p>
                  </div>
                  <div className="plan-detail">
                    <p>
                      <i className="fa fa-check" aria-hidden="true"></i>
                      Employees: {plan.numberOfEmployees}
                    </p>
                  </div>
                  <div className="plan-detail">
                    <p>
                      <i className="fa fa-check" aria-hidden="true"></i>Clients:{' '}
                      {plan.numberOfClients}
                    </p>
                  </div>
                  <div className="plan-detail">
                    <p>
                      <i className="fa fa-check" aria-hidden="true"></i>
                      Account: {plan.isPlanActive ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
                <div className="change-Plans">
                  <NavLink
                    to={`/admin/subscription/updating-plans/${plan.id}`}
                    className="editClick"
                    onClick={() => handleEditPlanClick(plan)}
                    data-tooltip="Edit Plan">
                    <i
                      className="fa fa-pencil"
                      aria-hidden="true"
                      style={{margin: '5px'}}></i>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
