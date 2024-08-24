import React from 'react'

const CreatingPlans = () => {
  return (
    <div class="container">
        <h1>Create Pricing Plan</h1>
        <p>To create a new pricing plan, start by selecting one of the following:</p>
        <div class="plans">
            <div class="plan">
                <h2>Free Trial</h2>
                <p class="price">Free <span>3 months</span></p>
                <button>Create Plan</button>
                <ul>
                    <li>3 projects</li>
                    <li>10 employees</li>
                    <li>Flexible billing frequency</li>
                </ul>
            </div>
            <div class="plan best-value">
                <h2>Annual Plan</h2>
                <p class="price">$99/year <span>12 months</span></p>
                <span class="badge">Best Value</span>
                <button>Create Plan</button>
                <ul>
                    <li>Unlimited projects</li>
                    <li>10 employees</li>
                    <li>Fixed Rate</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default CreatingPlans