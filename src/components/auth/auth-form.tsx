'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signIn, signUp, getDashboardPath, UserRole } from '@/lib/supabase/auth-helpers'

// Form validation schemas
const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignInFormData = z.infer<typeof signInSchema>
type SignUpFormData = z.infer<typeof signUpSchema>

interface AuthFormProps {
  mode: 'signin' | 'signup'
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const isSignIn = mode === 'signin'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData | SignUpFormData>({
    resolver: zodResolver(isSignIn ? signInSchema : signUpSchema),
  })

  const onSubmit = async (data: SignInFormData | SignUpFormData) => {
    setLoading(true)
    setError(null)

    try {
      if (isSignIn) {
        const { data: signInData, error } = await signIn(
          (data as SignInFormData).email,
          (data as SignInFormData).password
        )

        if (error) throw error

        if (signInData?.user) {
          // Redirect to default dashboard (user1)
          router.push('/dashboard/user1')
        }
      } else {
        const { data: signUpData, error } = await signUp(
          (data as SignUpFormData).email,
          (data as SignUpFormData).password,
          (data as SignUpFormData).fullName
        )

        if (error) throw error

        if (signUpData?.user) {
          // New users wait for admin approval
          router.push('/waiting-for-approval')
        }
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {isSignIn ? 'Welcome back' : 'Create an account'}
        </h2>
        <p className="text-gray-200 text-sm">
          {isSignIn
            ? 'Enter your credentials to sign in to your account'
            : 'Enter your information to create your account'}
        </p>
      </div>

      

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {!isSignIn && (
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              {...register('fullName' as any)}
              className={`bg-white/20 border-white/30 text-white placeholder-gray-200 focus:bg-white/30 focus:border-white/50 backdrop-blur-sm ${(errors as any).fullName ? 'border-red-400' : ''}`}
            />
            {(errors as any).fullName && (
              <p className="text-sm text-red-300">{(errors as any).fullName.message}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register('email' as any)}
            className={`bg-white/20 border-white/30 text-white placeholder-gray-200 focus:bg-white/30 focus:border-white/50 backdrop-blur-sm ${errors.email ? 'border-red-400' : ''}`}
          />
          {errors.email && (
            <p className="text-sm text-red-300">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register('password' as any)}
            className={`bg-white/20 border-white/30 text-white placeholder-gray-200 focus:bg-white/30 focus:border-white/50 backdrop-blur-sm ${errors.password ? 'border-red-400' : ''}`}
          />
          {errors.password && (
            <p className="text-sm text-red-300">{errors.password.message}</p>
          )}
        </div>

        {!isSignIn && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword' as any)}
              className={`bg-white/20 border-white/30 text-white placeholder-gray-200 focus:bg-white/30 focus:border-white/50 backdrop-blur-sm ${(errors as any).confirmPassword ? 'border-red-400' : ''}`}
            />
            {(errors as any).confirmPassword && (
              <p className="text-sm text-red-300">{(errors as any).confirmPassword.message}</p>
            )}
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-3 text-sm text-red-200 bg-red-500/20 border border-red-400/30 rounded-lg backdrop-blur-sm"
          >
            {error}
          </motion.div>
        )}

        <Button
          type="submit"
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-lg"
          disabled={loading}
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            isSignIn ? 'Sign In' : 'Create Account'
          )}
        </Button>
      </form>
    </motion.div>
  )
}
