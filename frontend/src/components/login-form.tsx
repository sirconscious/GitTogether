import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGithub, FaGoogle } from "react-icons/fa"
import DarkModeToggle from "./DarkModeToggle"
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return ( 
    <div className="dark">

    <div className={cn("flex flex-col items-center justify-center min-h-screen p-4", className)} {...props}>
<Card className="w-full max-w-3xl overflow-hidden shadow-lg bg-[rgba(255,255,255,0.1)] backdrop-blur-md">
        <CardContent className="">
          {/* Left Form Section */}
          <form className="p-8 flex flex-col gap-6">
            <div className="flex flex-col items-center text-center gap-2">
              <h1 className="text-3xl font-bold text-primary">Welcome back</h1>
              <p className="text-muted-foreground text-sm">
                Login to your GitTogether account
              </p>
            </div>

            {/* Social Login Buttons */}
             <a href={`${import.meta.env.VITE_BACKEND_URL}/auth/google/redirect`}>

              <Button variant="outline" type="button" className="w-full flex items-center justify-center gap-2">
                <FaGoogle className="text-xl"/>
                Login with Google
              </Button>
             </a>
            

            {/* Divider */}
            <div className="relative text-center my-4">
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="bg-card px-2 text-muted-foreground text-sm">Or continue with</span>
              </span>
              <div className="border-t border-border mt-2"></div>
            </div> 
            <a href={`${import.meta.env.VITE_BACKEND_URL}/auth/github/redirect`}>

  <Button variant="outline" type="button" className="w-full flex items-center justify-center gap-2">
                <FaGithub className="text-xl"/>
                Login with Github
              </Button>
            </a>
    
          </form>

       
        </CardContent>
      </Card>

      {/* Footer Text */}
      <p className="mt-4 text-center text-xs text-muted-foreground">
        By continuing, you agree to our <a href="#" className="text-primary underline">Terms of Service</a> and <a href="#" className="text-primary underline">Privacy Policy</a>.
      </p> 
        {/* <DarkModeToggle/> */}
    </div> 
        </div>

  )
}
