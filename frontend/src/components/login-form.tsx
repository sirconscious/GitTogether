import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { motion } from "framer-motion"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className="dark">
      <div
        className={cn(
          "flex flex-col items-center justify-center min-h-screen p-4",
          className
        )}
        {...props}
      >
        {/* Animate Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className="w-full max-w-3xl overflow-hidden shadow-lg bg-[rgba(255,255,255,0.1)] backdrop-blur-md">
            <CardContent>
              {/* Left Form Section */}
              <form className="p-8 flex flex-col gap-6">
                {/* Heading */}
                <motion.div
                  className="flex flex-col items-center text-center gap-2"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-3xl font-bold text-primary">Welcome back</h1>
                  <p className="text-muted-foreground text-sm">
                    Login to your GitTogether account
                  </p>
                </motion.div>

                {/* Social Login Buttons */}
                <motion.div
                  className="flex flex-col gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.2 },
                    },
                  }}
                >
                  <motion.a
                    href={`${import.meta.env.VITE_BACKEND_URL}/auth/google/redirect`}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <FaGoogle className="text-xl" />
                      Login with Google
                    </Button>
                  </motion.a>
                          <motion.div
                  className="relative text-center my-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-card px-2 text-muted-foreground text-sm">
                      Or continue with
                    </span>
                  </span>
                  <div className="border-t border-border mt-2"></div>
                </motion.div>
                  <motion.a
                    href={`${import.meta.env.VITE_BACKEND_URL}/auth/github/redirect`}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <FaGithub className="text-xl" />
                      Login with Github
                    </Button>
                  </motion.a>
                </motion.div>

                {/* Divider */}
            
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          className="mt-4 text-center text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          By continuing, you agree to our{" "}
          <a href="#" className="text-primary underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary underline">
            Privacy Policy
          </a>
          .
        </motion.p>
      </div>
    </div>
  )
}
