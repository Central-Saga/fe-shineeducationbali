"use client";

import { useState } from "react";
import { FiEdit2, FiTrash2, FiUserPlus, FiUsers, FiUserCheck, FiUserX } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

export default function UsersPage() {
  const [users] = useState([
    {
      id: 1,
      name: "Budi Santoso",
      role: "Murid",
      email: "budi@example.com",
      status: "Aktif",
    },
    {
      id: 2,
      name: "Ani Wijaya",
      role: "Staff",
      email: "ani@example.com",
      status: "Aktif",
    },
    {
      id: 3,
      name: "Dewi Putri",
      role: "Murid",
      email: "dewi@example.com",
      status: "Nonaktif",
    },
    {
      id: 4,
      name: "Rina Sari",
      role: "Guru",
      email: "rina@example.com",
      status: "Aktif",
    },
    {
      id: 5,
      name: "Joko Widodo",
      role: "Admin",
      email: "joko@example.com",
      status: "Aktif",
    },
  ]);

  // Count statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === "Aktif").length;
  const inactiveUsers = users.filter(user => user.status === "Nonaktif").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manajemen Pengguna
          </h1>
          <p className="text-gray-500 mt-1">Kelola semua akun pengguna di sistem</p>
        </div>
        <Button className="bg-[#C40503] hover:bg-[#a50402] text-white flex items-center gap-2">
          <FiUserPlus className="h-4 w-4" />
          Tambah Pengguna
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-md bg-gradient-to-br from-[#C40503] to-[#ef4444] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <FiUsers className="h-5 w-5" />
              Total Pengguna
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalUsers}</div>
            <p className="text-sm opacity-80">Semua tipe pengguna</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md bg-gradient-to-br from-[#DAA625] to-[#fbbf24] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <FiUserCheck className="h-5 w-5" />
              Pengguna Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeUsers}</div>
            <p className="text-sm opacity-80">Memiliki akses sistem</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md bg-gradient-to-br from-gray-600 to-gray-700 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <FiUserX className="h-5 w-5" />
              Pengguna Nonaktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inactiveUsers}</div>
            <p className="text-sm opacity-80">Dinonaktifkan sementara</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Cari pengguna..."
            className="pl-8 bg-white"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-white">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Tabel Pengguna */}
      <Card className="bg-white shadow-md rounded-lg overflow-hidden border-none">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="outline" className={`
                      ${user.role === "Admin" ? "bg-purple-100 text-purple-800 border-purple-200" : ""}
                      ${user.role === "Guru" ? "bg-blue-100 text-blue-800 border-blue-200" : ""}
                      ${user.role === "Murid" ? "bg-[#DAA625]/10 text-[#DAA625] border-[#DAA625]/20" : ""}
                      ${user.role === "Staff" ? "bg-gray-100 text-gray-800 border-gray-200" : ""}
                    `}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      className={`
                        ${user.status === "Aktif" ? "bg-green-100 text-green-800 border-green-200" : ""}
                        ${user.status === "Nonaktif" ? "bg-[#C40503]/10 text-[#C40503] border-[#C40503]/20" : ""}
                      `}
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-[#DAA625]">
                        <FiEdit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-[#C40503]">
                        <FiTrash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
