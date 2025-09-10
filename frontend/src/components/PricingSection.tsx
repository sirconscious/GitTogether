import React, { useState } from 'react';
import { Check, Zap, Crown, Gift, Star, ArrowRight, Sparkles } from 'lucide-react';

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for getting started',
      monthlyPrice: 0,
      yearlyPrice: 0,
      icon: Gift,
      features: [
        'Up to 3 projects',
        '5GB storage',
        'Basic support',
        'Standard templates',
        'Mobile app access'
      ],
      buttonText: 'Get Started',
      buttonVariant: 'secondary',
      popular: false,
      gradient: 'from-primary/10 via-primary/5 to-secondary/10'
    },
    {
      name: 'Pro',
      description: 'Best for growing businesses',
      monthlyPrice: 29,
      yearlyPrice: 290,
      icon: Zap,
      features: [
        'Unlimited projects',
        '100GB storage',
        'Priority support',
        'Advanced analytics',
        'Custom integrations',
        'Team collaboration',
        'API access',
        'Advanced reporting'
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'primary',
      popular: true,
      gradient: 'from-primary/10 via-primary/5 to-secondary/10'
    },
    {
      name: 'Enterprise',
      description: 'For large-scale operations',
      monthlyPrice: 99,
      yearlyPrice: 990,
      icon: Crown,
      features: [
        'Everything in Pro',
        '1TB storage',
        'Dedicated support',
        'Custom branding',
        'Advanced security',
        'SSO integration',
        'Custom contracts',
        'Priority features',
        'On-premise deployment'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary',
      popular: false,
      gradient: 'from-secondary/10 to-accent/5'
    }
  ];

  const savings = (plan: any) => {
    if (plan.monthlyPrice === 0) return 0;
    return Math.round(((plan.monthlyPrice * 12 - plan.yearlyPrice) / (plan.monthlyPrice * 12)) * 100);
  };

  return (
    <div className="py-32 bg-background relative overflow-hidden">
      {/* Enhanced background with animated elements */}
     
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          {/* <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm rounded-full text-primary text-sm font-medium mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Simple, transparent pricing
            <Star className="w-4 h-4 text-secondary" />
          </div> */}
          
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Choose your plan
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Start free and scale as you grow. No hidden fees, no surprises.
            <br />
            <span className="text-primary font-medium">Join 50,000+ teams already growing with us</span>
          </p>
          
          {/* Enhanced Toggle */}
          <div className="flex items-center justify-center gap-6 mt-10 p-2 bg-muted/50 backdrop-blur-sm rounded-2xl border border-border/50 inline-flex">
            <span className={`text-base px-4 py-2 rounded-lg transition-all ${!isYearly ? 'text-foreground font-semibold bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              Monthly
            </span>
            
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 hover:shadow-lg"
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                isYearly ? 'left-9' : 'left-1'
              }`} />
            </button>
            
            <span className={`text-base px-4 py-2 rounded-lg transition-all ${isYearly ? 'text-foreground font-semibold bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              Yearly
            </span>
            
            {isYearly && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                Save up to 20%
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const originalMonthlyPrice = isYearly ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice;
            const isHovered = hoveredPlan === plan.name;
            
            return (
              <div
                key={plan.name}
                onMouseEnter={() => setHoveredPlan(plan.name)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative bg-card/80 backdrop-blur-sm border rounded-3xl p-8 transition-all duration-500 cursor-pointer group ${
                  plan.popular 
                    ? 'border-primary/50 shadow-2xl shadow-primary/10 scale-105 lg:scale-110 bg-gradient-to-b from-card to-primary/5' 
                    : 'border-border/50 hover:border-primary/30 hover:shadow-xl hover:-translate-y-2'
                } ${isHovered && !plan.popular ? 'scale-105' : ''}`}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Enhanced Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current" />
                      Most Popular
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                )}

                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Enhanced Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg' 
                      : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110'
                  }`}>
                    <IconComponent className="w-8 h-8" />
                  </div>

                  {/* Plan info */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-3">{plan.name}</h3>
                    <p className="text-muted-foreground text-lg">{plan.description}</p>
                  </div>

                  {/* Enhanced Price */}
                  <div className="mb-10">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-5xl font-bold text-foreground">
                        ${originalMonthlyPrice}
                      </span>
                      <span className="text-muted-foreground text-lg">
                        {plan.monthlyPrice === 0 ? 'forever' : '/month'}
                      </span>
                    </div>
                    
                    {isYearly && plan.monthlyPrice > 0 && (
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-base text-muted-foreground line-through">
                          ${plan.monthlyPrice}/month
                        </span>
                        <span className="text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full font-bold">
                          Save {savings(plan)}%
                        </span>
                      </div>
                    )}
                    
                    {isYearly && plan.monthlyPrice > 0 && (
                      <p className="text-muted-foreground mt-2">
                        Billed annually (${price})
                      </p>
                    )}
                  </div>

                  {/* Enhanced Features */}
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex} 
                        className="flex items-start gap-4 group/item"
                        style={{ animationDelay: `${(index * 100) + (featureIndex * 50)}ms` }}
                      >
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-green-500 transition-colors">
                          <Check className="w-4 h-4 text-green-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Enhanced Button */}
                  <button
                    className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                      plan.buttonVariant === 'primary'
                        ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-105 border-0'
                        : 'bg-muted/80 text-foreground hover:bg-muted border border-border hover:border-primary/50 hover:shadow-lg group-hover:bg-primary group-hover:text-white'
                    }`}
                  >
                    {plan.buttonText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            );
          })}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Need a custom plan? We've got you covered.
            </p>
            
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-primary hover:text-primary/80 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg border border-primary/20 hover:border-primary/30 group">
              Contact our sales team
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex items-center justify-center gap-8 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                No setup fees
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Cancel anytime
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                24/7 support
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;