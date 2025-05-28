import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LoginForm } from './login-form'
import { SignupForm } from './signup-form'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const formVariants = {
  enter: {
    x: 100,
    opacity: 0,
    transition: { duration: 0.3 }
  },
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: { duration: 0.3 }
  }
}

interface AuthContainerProps {
  className?: string
  defaultForm?: 'login' | 'signup'
  onLoginSuccess?: () => void
}

export function AuthContainer({ 
  className, 
  defaultForm = 'login',
  onLoginSuccess 
}: AuthContainerProps) {
  const [isLogin, setIsLogin] = useState(defaultForm === 'login')

  return (
    <div className={cn("fixed inset-0 flex items-center justify-center pl-[280px] pr-4", className)}>
      <Card className="overflow-hidden mx-auto my-auto w-full max-w-4xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex justify-center gap-4">
              </div>
              <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.div
                    key="login"
                    variants={formVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full"
                  >
                    <LoginForm 
                      setIsLogin={setIsLogin}
                      onLoginSuccess={onLoginSuccess}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    variants={formVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full"
                  >
                    <SignupForm setIsLogin={setIsLogin} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://i.imgur.com/mxQWSuD.jpeg"
              alt="Music studio with microphone and instruments"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
