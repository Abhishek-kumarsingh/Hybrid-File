import React, { useState } from 'react';
import { CheckCircle2, Clock, Zap, Users, Dumbbell } from 'lucide-react';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  popular?: boolean;
  features: PlanFeature[];
}

const MembershipPlans: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: billingPeriod === 'monthly' ? 49 : 490,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'Perfect for beginners looking to start their fitness journey',
      color: 'neon-blue',
      icon: <Clock size={24} className="text-neon-blue" />,
      features: [
        { text: 'Access to main gym area', included: true },
        { text: 'Basic fitness assessment', included: true },
        { text: 'Standard equipment usage', included: true },
        { text: 'Access during off-peak hours', included: true },
        { text: 'Group classes (limited)', included: true },
        { text: 'Personal training sessions', included: false },
        { text: 'Access to premium zones', included: false },
        { text: 'Nutrition consultation', included: false }
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: billingPeriod === 'monthly' ? 89 : 890,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'Our most popular choice for dedicated fitness enthusiasts',
      color: 'neon-green',
      icon: <Zap size={24} className="text-neon-green" />,
      popular: true,
      features: [
        { text: 'Access to main gym area', included: true },
        { text: 'Comprehensive fitness assessment', included: true },
        { text: 'All equipment usage', included: true },
        { text: '24/7 gym access', included: true },
        { text: 'Unlimited group classes', included: true },
        { text: 'Personal training sessions (2/month)', included: true },
        { text: 'Access to premium zones', included: true },
        { text: 'Nutrition consultation', included: false }
      ]
    },
    {
      id: 'elite',
      name: 'Elite',
      price: billingPeriod === 'monthly' ? 129 : 1290,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'The ultimate fitness package for maximum results',
      color: 'neon-red',
      icon: <Dumbbell size={24} className="text-neon-red" />,
      features: [
        { text: 'Access to main gym area', included: true },
        { text: 'Advanced fitness assessment', included: true },
        { text: 'All equipment usage', included: true },
        { text: '24/7 gym access', included: true },
        { text: 'Unlimited group classes', included: true },
        { text: 'Personal training sessions (4/month)', included: true },
        { text: 'Access to all premium zones', included: true },
        { text: 'Monthly nutrition consultation', included: true }
      ]
    }
  ];

  return (
    <section id="memberships" className="section">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-aos="fade-up">
            Membership <span className="text-neon-blue">Plans</span>
          </h2>
          <p className="text-lg text-gray-300" data-aos="fade-up" data-aos-delay="100">
            Choose the membership that fits your goals and lifestyle. All plans include access to our
            state-of-the-art facility and supportive community.
          </p>
          
          <div 
            className="mt-8 inline-flex items-center p-1 bg-dark-gray rounded-full"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <button
              className={`px-6 py-2 rounded-full transition-all ${
                billingPeriod === 'monthly' ? 'bg-neon-blue text-black' : 'text-white'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full transition-all ${
                billingPeriod === 'yearly' ? 'bg-neon-blue text-black' : 'text-white'
              }`}
              onClick={() => setBillingPeriod('yearly')}
            >
              Yearly <span className="text-xs ml-1">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={plan.id}
              className={`card-glass p-6 relative group transition-all duration-300 hover:-translate-y-2 ${
                plan.popular ? `border-2 border-${plan.color}` : ''
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {plan.popular && (
                <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 bg-${plan.color} text-black text-sm font-bold py-1 px-4 rounded-full`}>
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-full bg-background`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
              </div>
              
              <div className="mb-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-300">{plan.period}</span>
              </div>
              
              <p className="text-gray-300 mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 
                      size={20} 
                      className={feature.included ? `text-${plan.color}` : 'text-gray-600'} 
                      fill={feature.included ? 'currentColor' : 'none'}
                      fillOpacity={feature.included ? 0.2 : 0}
                    />
                    <span className={!feature.included ? 'text-gray-600' : ''}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="#schedule" 
                className={`btn w-full bg-transparent border-2 border-${plan.color} text-${plan.color} hover:bg-${plan.color} hover:bg-opacity-10 text-center`}
              >
                Choose Plan
              </a>
            </div>
          ))}
        </div>

        <div 
          className="mt-16 bg-dark-gray rounded-2xl p-8 flex flex-col md:flex-row items-center"
          data-aos="fade-up"
        >
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-bold mb-2">Team & Corporate Memberships</h3>
            <p className="text-gray-300">
              Looking for group rates? We offer special pricing for teams, families, and corporate memberships.
              Contact us to learn more about our customized group fitness solutions.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <a href="#schedule" className="btn btn-primary text-black">
              <Users className="mr-2 h-5 w-5" />
              Inquire Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;