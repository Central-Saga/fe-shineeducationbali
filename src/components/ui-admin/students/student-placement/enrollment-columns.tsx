import { createColumnHelper } from "@tanstack/react-table";
import { Student } from "@/types/student";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const columnHelper = createColumnHelper<Student>();

export const enrollmentColumns = [
  columnHelper.accessor("name", {
    header: "Nama Siswa",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("packages", {
    header: "Paket Kursus",
    cell: (info) => {
      const packages = info.getValue();
      return (
        <div className="space-y-1">
          {packages.map((pkg) => (
            <Badge
              key={pkg.id}
              variant={pkg.type === "regular" ? "default" : "secondary"}
            >
              {pkg.name}
            </Badge>
          ))}
          {packages.length === 0 && "-"}
        </div>
      );
    },
  }),
  columnHelper.accessor("educationLevel", {
    header: "Jenjang",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <Badge variant={info.getValue() === "active" ? "success" : "destructive"}>
        {info.getValue() === "active" ? "Aktif" : "Nonaktif"}
      </Badge>
    ),
  }),
  columnHelper.accessor("enrollmentDate", {
    header: "Terdaftar",
    cell: (info) => {
      const date = info.getValue();
      return format(new Date(date), "dd MMMM yyyy", { locale: id });
    },
  }),
];
