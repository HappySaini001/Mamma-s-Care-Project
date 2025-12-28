import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Utensils, Camera, FileText, Calendar, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef } from "react";

export default function DietPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch all plans (History)
  const { data: plans } = useQuery({ queryKey: ["/api/diet-plans"] });
  
  // Sort by newest first
  const sortedPlans = plans ? [...plans].reverse() : [];
  const latestPlan = sortedPlans[0]; 

  const form = useForm({
    defaultValues: {
      doctorName: "",
      diagnosis: "",
      notes: ""
    }
  });

  // Handle Image Upload (Convert to Base64 to save easily)
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      // Send data + the image string
      const payload = { ...data, imageUrl: previewImage };
      const res = await apiRequest("POST", "/api/diet-plans", payload);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/diet-plans"] });
      toast({ title: "Success", description: "Prescription saved & Diet generated!" });
      form.reset();
      setPreviewImage(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save prescription.", variant: "destructive" });
    }
  });

  return (
    <div className="container max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-pink-100 p-3 rounded-full">
          <Utensils className="h-8 w-8 text-pink-500" />
        </div>
        <div>
           <h1 className="text-3xl font-bold">Diet Plan</h1>
           <p className="text-gray-500">Upload prescriptions to generate healthy meal plans.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* LEFT: Add Prescription Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-pink-600 flex items-center gap-2">
              <FileText className="h-5 w-5"/> Add Prescription
            </CardTitle>
            <CardDescription>Enter details or upload a photo.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
              
              <div className="space-y-2">
                <Label>Doctor's Name</Label>
                <Input placeholder="Dr. Smith" {...form.register("doctorName")} required />
              </div>
              
              <div className="space-y-2">
                <Label>Diagnosis / Purpose</Label>
                <Input placeholder="General Checkup, Anemia, etc." {...form.register("diagnosis")} required />
              </div>

              {/* CAMERA / IMAGE UPLOAD SECTION */}
              <div className="space-y-2">
                <Label>Upload Prescription Photo</Label>
                
                {/* Hidden File Input */}
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  className="hidden" 
                />

                <div className="flex gap-4 items-center">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex gap-2 border-pink-200 text-pink-600 hover:bg-pink-50"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4" /> 
                    {previewImage ? "Change Photo" : "Open Camera / Upload"}
                  </Button>
                  {previewImage && <span className="text-xs text-green-600 font-medium">Photo Selected ✓</span>}
                </div>

                {/* Image Preview */}
                {previewImage && (
                  <div className="mt-2 relative h-32 w-32 rounded-lg overflow-hidden border border-gray-200">
                    <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Notes (Optional)</Label>
                <Textarea placeholder="Any specific medicines..." {...form.register("notes")} />
              </div>

              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600" disabled={mutation.isPending}>
                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save & Generate Diet
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* RIGHT: Active Diet Plan */}
        <Card className="bg-green-50 border-green-100 h-fit">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Utensils className="h-5 w-5" /> Current Diet Plan
            </CardTitle>
            <CardDescription className="text-green-600">Based on your latest update.</CardDescription>
          </CardHeader>
          <CardContent>
            {latestPlan ? (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="font-semibold text-lg text-green-900">Dr. {latestPlan.doctorName}</h3>
                     <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                       {new Date(latestPlan.createdAt).toLocaleDateString()}
                     </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 italic">{latestPlan.diagnosis}</p>
                  <div className="whitespace-pre-wrap text-gray-700 bg-green-50/50 p-3 rounded-md">
                    {latestPlan.generatedPlan}
                  </div>
                  {latestPlan.imageUrl && (
                    <div className="mt-4">
                      <p className="text-xs text-gray-400 mb-1">Prescription Image:</p>
                      <img src={latestPlan.imageUrl} alt="Prescription" className="h-20 rounded border hover:h-48 transition-all duration-300" />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center text-green-700 opacity-60">
                <Utensils size={48} className="mb-4" />
                <p>No active diet plan.</p>
                <p className="text-sm">Upload a prescription to start.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* NEW SECTION: Prescription History */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-gray-500" /> Prescription History
        </h2>
        
        {sortedPlans.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPlans.map((plan: any) => (
              <Card key={plan.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Dr. {plan.doctorName}</CardTitle>
                    <span className="text-xs text-gray-400">
                      {new Date(plan.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <CardDescription>{plan.diagnosis}</CardDescription>
                </CardHeader>
                <CardContent>
                   {plan.imageUrl ? (
                     <div className="h-32 w-full bg-gray-100 rounded-md mb-3 overflow-hidden">
                       <img src={plan.imageUrl} alt="Prescription" className="w-full h-full object-cover" />
                     </div>
                   ) : (
                     <div className="h-32 w-full bg-gray-50 rounded-md mb-3 flex items-center justify-center text-gray-300">
                       <FileText size={32} />
                     </div>
                   )}
                   <p className="text-sm text-gray-600 line-clamp-3">{plan.generatedPlan}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-400">No prescriptions recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}