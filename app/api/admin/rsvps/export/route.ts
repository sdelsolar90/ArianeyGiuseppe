import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { isAuthenticated } from "@/lib/admin-auth";
import { getSql, type RsvpRow } from "@/lib/db";

export const runtime = "nodejs";

const COLUMNS: { header: string; key: keyof RsvpRow | "n"; width: number }[] = [
  { header: "#", key: "n", width: 6 },
  { header: "Fecha envío", key: "created_at", width: 22 },
  { header: "Nombre", key: "name", width: 26 },
  { header: "Email", key: "email", width: 28 },
  { header: "Asistirá", key: "attending", width: 10 },
  { header: "Bus", key: "bus", width: 8 },
  { header: "Dieta", key: "diet_pref", width: 14 },
  { header: "Dieta detalle", key: "diet_other", width: 22 },
  { header: "Alergias", key: "allergies", width: 26 },
  { header: "Alergia detalle", key: "allergy_other", width: 22 },
  { header: "Acompañante", key: "plus_one", width: 14 },
  { header: "Nombre acomp.", key: "plus_one_name", width: 26 },
  { header: "Bus acomp.", key: "plus_one_bus", width: 12 },
  { header: "Dieta acomp.", key: "plus_one_diet_pref", width: 14 },
  { header: "Dieta acomp. detalle", key: "plus_one_diet_other", width: 22 },
  { header: "Alergias acomp.", key: "plus_one_allergies", width: 26 },
  { header: "Alergia acomp. detalle", key: "plus_one_allergy_other", width: 22 },
  { header: "Idioma", key: "locale", width: 8 },
];

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const sql = getSql();
  const rows = sql
    ? ((await sql`SELECT * FROM rsvps ORDER BY created_at DESC`) as unknown as RsvpRow[])
    : [];

  const wb = new ExcelJS.Workbook();
  wb.creator = "Ariane & Giuseppe RSVP";
  wb.created = new Date();

  const ws = wb.addWorksheet("RSVPs", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  ws.columns = COLUMNS.map((c) => ({
    header: c.header,
    key: c.key,
    width: c.width,
  }));

  // Header styling
  const headerRow = ws.getRow(1);
  headerRow.font = { bold: true, color: { argb: "FFFFF8F0" } };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFA0522D" },
  };
  headerRow.height = 22;
  headerRow.alignment = { vertical: "middle", horizontal: "left" };

  rows.forEach((r, i) => {
    ws.addRow({
      n: i + 1,
      created_at: r.created_at ? new Date(r.created_at) : null,
      name: r.name,
      email: r.email,
      attending: r.attending === "yes" ? "Sí" : "No",
      bus: r.bus === "yes" ? "Sí" : r.bus === "no" ? "No" : "",
      diet_pref: r.diet_pref,
      diet_other: r.diet_other,
      allergies: Array.isArray(r.allergies) ? r.allergies.join(", ") : "",
      allergy_other: r.allergy_other,
      plus_one: r.plus_one ? "Sí" : "No",
      plus_one_name: r.plus_one_name,
      plus_one_bus:
        r.plus_one_bus === "yes" ? "Sí" : r.plus_one_bus === "no" ? "No" : "",
      plus_one_diet_pref: r.plus_one_diet_pref,
      plus_one_diet_other: r.plus_one_diet_other,
      plus_one_allergies: Array.isArray(r.plus_one_allergies)
        ? r.plus_one_allergies.join(", ")
        : "",
      plus_one_allergy_other: r.plus_one_allergy_other,
      locale: r.locale,
    });
  });

  // Format date column
  const dateCol = ws.getColumn("created_at");
  dateCol.numFmt = "dd/mm/yyyy hh:mm";

  // Autofilter on header
  ws.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: COLUMNS.length },
  };

  const buffer = await wb.xlsx.writeBuffer();
  const filename = `rsvps-${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
