import { NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export async function GET() {
  await requireRole(["super_admin"]);

  try {
    let gitSha = "unknown";
    try {
      gitSha = execSync("git rev-parse --short HEAD").toString().trim();
    } catch(e) {}
    
    let version = "unknown";
    try {
      const pkgPath = path.resolve(process.cwd(), "package.json");
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      version = pkg.version;
    } catch (e) {}
    
    return NextResponse.json({
      projectName: "ODC Web",
      version,
      gitSha,
      buildTimestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
