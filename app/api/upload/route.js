
export async function POST(request) {
    try {
        const formData = await request.formData();
        const image = formData.get("image");

        if (!image || typeof image === "string") {
            return Response.json(
                { error: "Image is required" },
                { status: 400 }
            );
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(image.type)) {
            return Response.json(
                { error: "Invalid image format" },
                { status: 400 }
            );
        }

        if (image.size > 5 * 1024 * 1024) {
            return Response.json(
                { error: "Image must be less than 5MB" },
                { status: 400 }
            );
        }

        const imgbbFormData = new FormData();
        imgbbFormData.append("image", image);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
            {
                method: "POST",
                body: imgbbFormData,
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            console.error("ImgBB upload failed:", result);

            return Response.json(
                { error: "ImgBB upload failed" },
                { status: 500 }
            );
        }

        return Response.json({
            success: true,
            imageUrl: result.data.url,
        });

    } catch (error) {
        console.error("Upload error:", error);

        return Response.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
