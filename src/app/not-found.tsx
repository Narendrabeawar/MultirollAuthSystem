'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

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

      {/* Main content */}
      <motion.div 
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* 404 Card */}
        <motion.div
          className="backdrop-blur-xl bg-white/15 border border-white/30 rounded-2xl shadow-2xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* 404 Number */}
          <motion.div
            className="text-8xl font-bold text-white mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            404
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-2xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Page Not Found
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="text-gray-200 text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Sorry, the page you are looking for does not exist or has been moved.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Button
              onClick={() => router.back()}
              className="bg-custom-teal hover:bg-custom-teal-hover text-white border-0 shadow-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </motion.div>

          {/* Additional Help */}
          <motion.div 
            className="mt-8 pt-6 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="text-gray-300 text-sm mb-4">
              Need help? Try these options:
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/signin')}
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                Sign In
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/signup')}
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                Sign Up
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <p className="text-gray-300 text-sm">
            If you believe this is an error, please contact support.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
