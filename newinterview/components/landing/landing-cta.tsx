"use client";

import Link from 'next/link';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export function LandingCTA() {

  const pricingPlans = [
    {
      name: "Starter",
      price: "$49",
      period: "per month",
      description: "Perfect for small teams and startups",
      features: [
        "AI-powered interviews",
        "Basic analytics",
        "5 active job positions",
        "Email support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "$99",
      period: "per month",
      description: "For growing teams with advanced needs",
      features: [
        "Everything in Starter",
        "Gemini AI integration",
        "Advanced analytics",
        "15 active job positions",
        "Priority support",
        "Custom interview templates"
      ],
      cta: "Try Free for 14 Days",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations with custom requirements",
      features: [
        "Everything in Professional",
        "Unlimited job positions",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "SSO & advanced security"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section id="pricing" className="py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]" />
        <div className="absolute bottom-0 left-0 right-0 h-[30rem] bg-gradient-to-t from-purple-50/50 to-transparent dark:from-purple-950/20 dark:to-transparent -z-10" />

      <div className="px-4 sm:px-6 md:px-8 lg:px-16 max-w-screen-2xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200 border-purple-200 dark:border-purple-800 rounded-full inline-block mb-4">
            Pricing Plans
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose the Perfect Plan for Your Team</h2>
          <p className="text-muted-foreground text-lg">
            All plans include core interview features with different levels of AI capabilities and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl lg:max-w-5xl xl:max-w-6xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className={`h-full rounded-xl p-6 border ${
                plan.popular
                  ? 'border-purple-200 dark:border-purple-800 shadow-lg bg-white dark:bg-gray-800'
                  : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50'
              }`}>
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 className={`h-5 w-5 flex-shrink-0 ${
                        plan.popular
                          ? 'text-purple-600 dark:text-purple-400'
                          : 'text-green-600 dark:text-green-400'
                      }`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/auth/register" className="block mt-auto">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                    {plan.popular && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-24 text-center max-w-3xl lg:max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-xl p-8 md:p-12 shadow-lg border border-purple-100 dark:border-purple-900/50">
            <Sparkles className="h-10 w-10 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Hiring Process?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of companies using InterviewAI to find the best talent with the power of Gemini AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all group">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard/ai-assistant">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Sparkles className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
                  Try Gemini AI Demo
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    </LazyMotion>
  );
}