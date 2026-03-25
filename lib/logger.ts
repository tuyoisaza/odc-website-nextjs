import { prisma } from "@/lib/prisma";

export async function logDebug(context: string, message: string, payload?: any) {
  try {
    const setting = await prisma.systemSetting.findUnique({ where: { key: "DEBUG_MODE" } });
    
    // Only log verbosely if debug mode is active
    if (setting?.value === "true") {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level: "DEBUG",
        context,
        message,
        payload: payload || null
      };
      
      console.log(JSON.stringify(logEntry, null, 2));
    }
  } catch (error) {
    // Failsafe so logger doesn't break app
    console.error("Logger execution failed", error);
  }
}
