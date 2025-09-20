import CardFlip from "@/component/ui/cardflip";

export default function Flip() {
  return (
    <div className="p-4 rounded-2xl text-white">


      <CardFlip
        title="Yash Sharma "
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
