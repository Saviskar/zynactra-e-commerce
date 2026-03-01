import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Ensure unique filename
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

        try {
            await writeFile(
                path.join(process.cwd(), "public/uploads", filename),
                buffer
            );
            return NextResponse.json({ url: `/uploads/${filename}` });
        } catch (error) {
            console.error("Error writing file:", error);
            return NextResponse.json(
                { error: "Error saving file" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Error handling upload:", error);
        return NextResponse.json(
            { error: "Error processing the request" },
            { status: 500 }
        );
    }
}
