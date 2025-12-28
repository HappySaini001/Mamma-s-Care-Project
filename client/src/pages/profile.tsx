import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, User, Baby, Stethoscope, MapPin, Phone, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();

  // --- 1. SETUP PERSONAL DETAILS FORM ---
  const personalForm = useForm({
    values: {
      displayName: user?.displayName || "",
      age: user?.age || "",
      phone: user?.phone || "",
      address: user?.address || "",
      bloodGroup: user?.bloodGroup || "",
    }
  });

  // Mutation to Save Personal Details (PATCH /api/user)
  const updatePersonalMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("PATCH", "/api/user", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({ title: "Success", description: "Personal details updated!" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  // --- 2. SETUP MEDICAL FORM ---
  // Fetch existing medical profile
  const { data: medicalProfile } = useQuery({
    queryKey: ["/api/profile"],
  });

  const medicalForm = useForm({
    values: medicalProfile || {
      dueDate: "",
      currentWeek: 12,
      doctorName: "",
      hospitalName: "",
      hospitalAddress: "",
      bloodType: "",
    }
  });

  // Mutation to Save Medical Details (POST /api/profile)
  const updateMedicalMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/profile", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({ title: "Success", description: "Pregnancy details saved!" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  if (!user) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="container max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      
      {/* Header Section */}
      <div className="flex items-center gap-6 bg-pink-50 p-6 rounded-3xl border border-pink-100">
        <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center text-4xl border-4 border-white shadow-md overflow-hidden">
          {user.photoUrl ? (
            <img src={user.photoUrl} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            "🤰"
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hi, {user.displayName}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Tabs for Personal vs Medical */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Personal Details
          </TabsTrigger>
          <TabsTrigger value="medical" className="flex items-center gap-2">
            <Baby className="h-4 w-4" /> Pregnancy & Medical
          </TabsTrigger>
        </TabsList>

        {/* --- TAB 1: PERSONAL DETAILS --- */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>About You</CardTitle>
              <CardDescription>Update your contact info and personal details.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={personalForm.handleSubmit((data) => updatePersonalMutation.mutate(data))} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><User className="h-4 w-4"/> Full Name</Label>
                    <Input {...personalForm.register("displayName")} />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Calendar className="h-4 w-4"/> Age</Label>
                    <Input type="number" placeholder="e.g. 26" {...personalForm.register("age")} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Phone className="h-4 w-4"/> Phone Number</Label>
                    <Input placeholder="+91 98765 43210" {...personalForm.register("phone")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email (Cannot change)</Label>
                    <Input value={user.email || ""} disabled className="bg-gray-100" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Address</Label>
                  <Textarea placeholder="123 Main St, City, Country" {...personalForm.register("address")} />
                </div>

                <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600" disabled={updatePersonalMutation.isPending}>
                  {updatePersonalMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Personal Details
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- TAB 2: MEDICAL DETAILS --- */}
        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle>Medical & Pregnancy Info</CardTitle>
              <CardDescription>Track your doctor, hospital, and pregnancy week.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={medicalForm.handleSubmit((data) => updateMedicalMutation.mutate(data))} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Current Week</Label>
                    <Input type="number" placeholder="e.g. 12" {...medicalForm.register("currentWeek", { valueAsNumber: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input type="date" {...medicalForm.register("dueDate")} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Stethoscope className="h-4 w-4"/> Doctor's Name</Label>
                    <Input placeholder="Dr. Smith" {...medicalForm.register("doctorName")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Blood Group</Label>
                    <Input placeholder="e.g. O+" {...medicalForm.register("bloodType")} />
                  </div>
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Hospital Name & Address</Label>
                    <Input placeholder="City General Hospital" {...medicalForm.register("hospitalName")} className="mb-2"/>
                    <Input placeholder="Hospital Address" {...medicalForm.register("hospitalAddress")} />
                </div>

                <Button type="submit" className="w-full" disabled={updateMedicalMutation.isPending}>
                  {updateMedicalMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Medical Info
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}