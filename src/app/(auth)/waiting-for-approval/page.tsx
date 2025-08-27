'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Clock, 
  CheckCircle, 
  Mail, 
  RefreshCw, 
  LogOut,
  Shield,
  Users,
  ArrowRight
} from 'lucide-react'
import { useSession } from '@/components/providers/session-provider'
import { useRouter } from 'next/navigation'

export default function WaitingForApprovalPage() {
  const { user, signOut } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/back.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background blur effect */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/back.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(2px)',
          transform: 'scale(1.05)',
          opacity: '0.95'
        }}
      ></div>
      
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-600 rounded-full opacity-20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full opacity-20 blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-custom-teal/20 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Clock className="w-10 h-10 text-custom-teal" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-white mb-4 font-playfair">
            Approval Pending
          </h1>
          <p className="text-gray-200 text-lg">
            Your account is being reviewed by our team
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="backdrop-blur-xl bg-white/15 border border-white/30 rounded-2xl shadow-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Status Indicator */}
          <motion.div 
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center space-x-3 bg-custom-teal/20 px-4 py-2 rounded-full">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="w-5 h-5 text-custom-teal" />
              </motion.div>
              <span className="text-custom-teal font-semibold">Under Review</span>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-gray-200 text-lg mb-4">
              Thank you for registering! Your account has been successfully created and is currently being reviewed by our administrative team.
            </p>
            <p className="text-gray-300 text-base">
              You will receive an email notification once your account is approved and you can access your dashboard.
            </p>
          </motion.div>

          {/* User Info */}
          {user && (
            <motion.div 
              className="bg-white/10 rounded-lg p-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-custom-teal rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">{user.email}</p>
                  <p className="text-gray-300 text-sm">Registered Account</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Features */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <Shield className="w-8 h-8 text-custom-teal mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Secure Access</h3>
              <p className="text-gray-300 text-sm">Role-based permissions</p>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <Users className="w-8 h-8 text-custom-teal mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Team Management</h3>
              <p className="text-gray-300 text-sm">Collaborate efficiently</p>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <CheckCircle className="w-8 h-8 text-custom-teal mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Quick Setup</h3>
              <p className="text-gray-300 text-sm">Get started in minutes</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <Button
              onClick={handleRefresh}
              className="bg-custom-teal hover:bg-custom-teal-hover text-white border-0 shadow-lg"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Check Status
            </Button>
            
                         <Button
               onClick={handleSignOut}
               className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg"
             >
               <LogOut className="h-4 w-4 mr-2" />
               Sign Out
             </Button>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <p className="text-gray-300 text-sm">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@example.com" className="text-custom-teal hover:text-custom-teal-hover">
              support@example.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
