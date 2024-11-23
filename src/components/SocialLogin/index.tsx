import { Button } from "../ui/button"

type SocialLoginButtonProps = {
  icon: React.ReactNode
  provider: "Google" | "Github"
}

export function SocialLoginButton({ icon, provider }: SocialLoginButtonProps) {
  return (
    <Button className="w-full" variant={"outline"}>
      {icon}
      {provider}
    </Button>
  )
}