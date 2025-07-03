"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function TeacherDebugLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a sample teacher user
    const teacherUser = {
      id: "T123",
      nama: username || "Teacher Demo",
      email: `${username.toLowerCase()}@shineeducation.com`,
      peran: ["Teacher"], // Set as array to match expected format
      kelas: ["X-A", "X-B"],
      mapel: ["Matematika", "Coding"]
    };
    
    // Store in localStorage
    localStorage.setItem("pengguna", JSON.stringify(teacherUser));
    console.log("Debug login successful:", teacherUser);
    
    // Redirect to dashboard
    router.push("/dashboard-teacher");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Teacher Debug Login
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter any username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter any password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Debug Login as Teacher
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
