'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Shield, 
  Users, 
  Zap, 
  BarChart3, 
  Lock, 
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'

export default function LandingPage() {
  const { loading } = useAuthRedirect()

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }
  const features = [
    {
      icon: Shield,
      title: 'Role-Based Access Control',
      description: 'Secure multi-role authentication with granular permissions',
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Efficient user administration and role assignment',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with Next.js 15 for optimal performance',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights and reporting tools',
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Supabase-powered authentication with RLS',
    },
    {
      icon: Globe,
      title: 'Modern UI/UX',
      description: 'Beautiful interfaces with Framer Motion animations',
    },
  ]

  const roles = [
    {
      name: 'Super Admin',
      description: 'Full system access and control',
      features: ['User Management', 'System Settings', 'Security Controls', 'Database Access'],
    },
    {
      name: 'Admin',
      description: 'Administrative privileges',
      features: ['User Management', 'System Settings', 'Reports Access'],
    },
    {
      name: 'User 1',
      description: 'Standard user access',
      features: ['Dashboard Access', 'Basic Reports', 'Personal Settings'],
    },
    {
      name: 'User 2',
      description: 'Limited user access',
      features: ['Dashboard Access', 'View Reports'],
    },
    {
      name: 'User 3',
      description: 'Read-only access',
      features: ['Dashboard Access', 'View Data'],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-24">
        {/* Background animated blobs in green tones */}
        <motion.div
          className="pointer-events-none absolute -top-24 -left-28 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-300/40 to-teal-200/40 blur-3xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: [0.96, 1.05, 0.98, 1] }}
          transition={{ duration: 16, repeat: Infinity, repeatType: 'mirror' }}
        />
        <motion.div
          className="pointer-events-none absolute top-10 -right-20 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-green-300/40 to-emerald-200/40 blur-3xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: [1, 1.08, 0.97, 1] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', delay: 0.8 }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-gradient-to-br from-lime-200/40 to-emerald-200/40 blur-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [8, -8, 8] }}
          transition={{ duration: 14, repeat: Infinity, repeatType: 'mirror', delay: 0.4 }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-display tracking-tight text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent mb-6">
              MultiUser SaaS Template
            </h1>
            <p className="text-xl text-muted-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              A production-ready, beautifully organized multi-role authentication template 
              built with Next.js 15, Supabase, and shadcn/ui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8 py-6 bg-emerald-700 hover:bg-emerald-800 text-white">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/signin">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-emerald-700 text-emerald-800 hover:bg-emerald-50">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
          {/* Foreground floating accents in green */}
          <motion.div
            className="pointer-events-none absolute left-10 top-10 hidden md:block"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 0.9, y: [0, -6, 0] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror' }}
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-300 to-teal-300 shadow-lg shadow-emerald-200/50" />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute right-12 top-24 hidden md:block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.9, y: [0, -8, 0] }}
            transition={{ duration: 9, repeat: Infinity, repeatType: 'mirror', delay: 0.6 }}
          >
            <div className="h-12 w-12 rotate-6 rounded-full bg-gradient-to-br from-lime-300 to-emerald-300 shadow-lg shadow-emerald-200/50" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-extrabold tracking-tight mb-4 text-emerald-800">Powerful Features</h2>
            <p className="text-lg text-muted-foreground/90 max-w-2xl mx-auto">
              Everything you need to build a modern, scalable SaaS application
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-100/60 to-teal-100/40 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-emerald-700" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-extrabold tracking-tight mb-4 text-emerald-800">Role-Based Access</h2>
            <p className="text-lg text-muted-foreground/90 max-w-2xl mx-auto">
              Flexible role system with granular permissions and access control
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <motion.div
                key={role.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">{role.name}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {role.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-700 via-teal-700 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-extrabold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of developers building amazing SaaS applications with our template
            </p>
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Start Building Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
