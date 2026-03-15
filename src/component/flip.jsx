import CardFlip from "@/component/ui/cardflip";
import { useAuth } from "@/context/AuthContext";

export default function Flip() {
  const { user } = useAuth();
  const userName = user?.display_name || user?.name || "User";
  
  return (
    <div className="p-4 rounded-2xl text-white">


      <CardFlip
        title={`${userName} `}
        subtitle="Launch your idea in record time"
        description="Got the job from Outmail"
        features={[
          "Job",
          "Developer-First", 
          " Optimized",
          "Zero "
        ]}
      />
    </div>
  );
}
