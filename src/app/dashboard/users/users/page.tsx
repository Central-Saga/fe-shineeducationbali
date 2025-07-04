"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash, Eye, AlertCircle } from "lucide-react";
import { mockUsers } from "@/data/data-admin/users-data";

export default function AdminAndTeacherUsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [userRole, setUserRole] = useState<string[]>([]);
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get user data from localStorage
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("pengguna");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          const roles = Array.isArray(user.role) ? user.role : [user.role];
          setUserRole(roles);
          
          // If not Super Admin, then it's view-only mode
          setIsViewOnly(!roles.includes("Super Admin"));
          setLoading(false);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
  }, []);
  
  // Filter to only show Admin and Teacher users
  const filteredUsers = users.filter(user => {
    return (user.role === "Admin" || user.role === "Guru") && 
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       user.email.toLowerCase().includes(searchQuery.toLowerCase()));
  });
  
  const adminCount = users.filter(user => user.role === "Admin").length;
  const teacherCount = users.filter(user => user.role === "Guru").length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-[#C40503] rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manajemen Admin & Guru
          </h1>
          <p className="text-gray-500 mt-1">Kelola akun pengelola sistem</p>
        </div>
        
        {isViewOnly ? (
          <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-2 rounded-md border border-amber-200">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Mode Hanya Lihat</span>
          </div>
        ) : (
          <Button 
            className="bg-[#C40503] hover:bg-[#a50402] text-white flex items-center gap-2 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Tambah Pengguna
          </Button>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-none shadow-md bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-sm font-medium">Admin</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-6">
            <div className="text-2xl font-bold">{adminCount}</div>
            <p className="text-sm opacity-80 mt-1">Pengelola dengan akses penuh</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-sm font-medium">Guru</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-6">
            <div className="text-2xl font-bold">{teacherCount}</div>
            <p className="text-sm opacity-80 mt-1">Pengajar aktif</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Admin and Teacher management */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="guru">Guru</TabsTrigger>
        </TabsList>
        
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Cari pengguna..."
              className="pl-8 bg-white w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4 mt-0">
          <Card className="border-none shadow-md">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="text-gray-500">Tidak ada data pengguna</div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            user.role === "Admin" 
                              ? "bg-purple-100 text-purple-800 border-purple-200" 
                              : "bg-blue-100 text-blue-800 border-blue-200"
                          }>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge className={
                            user.status === "Aktif"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-[#C40503]/10 text-[#C40503] border-[#C40503]/20"
                          }>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {isViewOnly ? (
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                            ) : (
                              <>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4 text-[#DAA625]" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Trash className="h-4 w-4 text-[#C40503]" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="admin" className="space-y-4 mt-0">
          {/* Content for Admin tab */}
          <Card className="border-none shadow-md">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers
                    .filter(user => user.role === "Admin")
                    .map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge className={
                            user.status === "Aktif"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-[#C40503]/10 text-[#C40503] border-[#C40503]/20"
                          }>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {isViewOnly ? (
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                            ) : (
                              <>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4 text-[#DAA625]" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Trash className="h-4 w-4 text-[#C40503]" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guru" className="space-y-4 mt-0">
          {/* Content for Guru tab */}
          <Card className="border-none shadow-md">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers
                    .filter(user => user.role === "Guru")
                    .map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge className={
                            user.status === "Aktif"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-[#C40503]/10 text-[#C40503] border-[#C40503]/20"
                          }>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {isViewOnly ? (
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                            ) : (
                              <>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4 text-[#DAA625]" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Trash className="h-4 w-4 text-[#C40503]" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
