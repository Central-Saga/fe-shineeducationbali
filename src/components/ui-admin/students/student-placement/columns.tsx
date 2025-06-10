import { createColumnHelper } from "@tanstack/react-table";
import { Student } from "@/types/student";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const columnHelper = createColumnHelper<Student>();

export const studentPlacementColumns = [
  columnHelper.accessor("name", {
    header: "Nama Siswa",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("packages", {
    header: "Paket Aktif",
    cell: (info) => {
      const activePackages = info
        .getValue()
        .filter((pkg) => pkg.status === "active");
      return (
        <div className="space-y-1">
          {activePackages.map((pkg) => (
            <Badge
              key={pkg.id}
              variant={pkg.type === "offline" ? "default" : "outline"}
            >
              {pkg.name}
            </Badge>
          ))}
          {activePackages.length === 0 && "-"}
        </div>
      );
    },
  }),
  columnHelper.accessor("placements", {
    header: "Kelas Saat Ini",
    cell: (info) => {
      const activePlacements = info
        .getValue()
        .filter((p) => p.status === "active");
      return (
        <div className="space-y-1">
          {activePlacements.map((p) => (
            <div key={p.id}>{p.className}</div>
          ))}
          {activePlacements.length === 0 && "Belum ditempatkan"}
        </div>
      );
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <Badge variant={info.getValue() === "active" ? "success" : "destructive"}>
        {info.getValue() === "active" ? "Aktif" : "Nonaktif"}
      </Badge>
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: "Terdaftar",
    cell: (info) =>
      format(new Date(info.getValue()), "dd MMMM yyyy", { locale: id }),
  }),
];
